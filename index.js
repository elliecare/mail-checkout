const fs = require('fs');

const templates = {
    subscription_gold:'templates/email_subscription_gold',
    subscription_gold_loan:'templates/email_subscription_gold_loan',
    subscription_success:'templates/subscription_success',
    email_verification:'templates/email_verification'
}

function getTemplateHTML(selected, params) {
    const archive = templates[selected];
    const {email, password, code, customer_phone} = params;

    const filePath = `${archive}.html`;

    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            console.error(`Error al leer el archivo ${filePath}: ${err.message}`);
            return;
        }

        let modifiedHTML = email ? data.replace('%EMAIL%', email) : data;
        modifiedHTML = password ? modifiedHTML.replace('%PASSWORD%', password) : modifiedHTML;
        modifiedHTML = code ? modifiedHTML.replace('%CODE%', code) : modifiedHTML;
        modifiedHTML = customer_phone ? modifiedHTML.replace('%CUSTOMER_PHONE%', customer_phone) : modifiedHTML;

        console.log(modifiedHTML)
        return modifiedHTML;
    });
}

const test = {
    email:'sarasa@sarasa.com',
    password: 1234156,
    sn_code: 48955,
    customer_phone: '+5411664928'
}
// Ejemplo de uso
getTemplateHTML('subscription_gold_loan', test);

module.exports = {
    getTemplateHTML
};
