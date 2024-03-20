const fs = require('fs');
const path = require('path');

const templates = {
    subscription_gold:'email_subscription_gold',
    subscription_gold_loan:'email_subscription_gold_loan',
    subscription_basic:'email_subscription_basic',
    email_verification:'email_verification'
}

function getTemplateHTML(selected, params) {
    const archive = templates[selected];
    const {email, password, code, customer_phone, patient_first_name, patient_last_name} = params;

    const filePath = path.resolve(__dirname, 'templates', `${archive}.html`);
    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            console.error(`Error al leer el archivo ${filePath}: ${err.message}`);
            return;
        }

        let modifiedHTML = email ? data.replace('%EMAIL%', email) : data;
        modifiedHTML = password ? modifiedHTML.replace('%PASSWORD%', password) : modifiedHTML;
        modifiedHTML = code ? modifiedHTML.replace('%CODE%', code) : modifiedHTML;
        modifiedHTML = customer_phone ? modifiedHTML.replace('%CUSTOMER_PHONE%', customer_phone) : modifiedHTML;
        modifiedHTML = patient_first_name ? modifiedHTML.replace('%PATIENT_FIRST_NAME%', patient_first_name) : modifiedHTML;
        modifiedHTML = patient_last_name ? modifiedHTML.replace('%PATIENT_LAST_NAME%', patient_last_name) : modifiedHTML;

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
//getTemplateHTML('subscription_gold_loan', test);

module.exports = {
    getTemplateHTML
};
