const fs = require('fs');
const path = require('path');

const templates = {
    subscription_gold:'email_subscription_gold',
    subscription_gold_loan:'email_subscription_gold_loan',
    subscription_basic:'email_subscription_basic',
    email_verification:'email_verification',
    mail_to_logistics:'mail_to_logistics',
    alert_pending:'alert_not_in_connect',
    new_companion_add:'new_companion_add'
}

async function getTemplateHTML(selected, params, isMailToLogistic = false) {
    return new Promise((resolve, reject) => {
        const archive = templates[selected];
        const {email, password, code, customer_phone, patient_first_name, patient_last_name, customer_name, customer_email, shipping_address, shipping_city, vendor, support_network_name, company_client, type_alert, user_id, id_smartwatch, sw_number, location, event_date} = params;

        const filePath = path.resolve(__dirname, 'templates', `${archive}.html`);
    
        fs.readFile(filePath, 'utf8', (err, data) => {
            if (err) {
                reject({error:`Error al leer el archivo ${filePath}: ${err.message}`});
            }
    
            let modifiedHTML = email ? data.replace('%EMAIL%', email) : data;
            modifiedHTML = password ? modifiedHTML.replace('%PASSWORD%', password) : modifiedHTML;
            modifiedHTML = code ? modifiedHTML.replace('%CODE%', code) : modifiedHTML;
            modifiedHTML = customer_phone ? modifiedHTML.replace('%CUSTOMER_PHONE%', customer_phone) : modifiedHTML;
            modifiedHTML = patient_first_name ? modifiedHTML.replace('%PATIENT_FIRST_NAME%', patient_first_name) : modifiedHTML;
            modifiedHTML = patient_last_name ? modifiedHTML.replace('%PATIENT_LAST_NAME%', patient_last_name) : modifiedHTML;
            modifiedHTML = company_client ? modifiedHTML.replace('%CC%', company_client) : modifiedHTML;
            modifiedHTML = type_alert ? modifiedHTML.replace('%ALERT_TYPE%', type_alert) : modifiedHTML;
            modifiedHTML = user_id ? modifiedHTML.replace('%USER_ID%', user_id) : modifiedHTML;
            modifiedHTML = id_smartwatch ? modifiedHTML.replace('%SW_ID%', id_smartwatch) : modifiedHTML;
            modifiedHTML = sw_number ? modifiedHTML.replace('%SW_NUMBER%', sw_number) : modifiedHTML;
            modifiedHTML = location ? modifiedHTML.replace('%LOCATION%', location) : modifiedHTML;
            modifiedHTML = event_date ? modifiedHTML.replace('%DATE%', event_date) : modifiedHTML;

            //Variables para el template mail_to_logistics
            modifiedHTML = customer_name ? modifiedHTML.replace('%BUYER_NAME%', customer_name) : modifiedHTML;
            modifiedHTML = customer_email ? modifiedHTML.replace('%BUYER_EMAIL%', customer_email) : modifiedHTML;
            modifiedHTML = customer_phone ? modifiedHTML.replace('%BUYER_PHONE%', customer_phone) : modifiedHTML;
            modifiedHTML = shipping_address ? modifiedHTML.replace('%SHIPPING_ADDRESS%', shipping_address) : modifiedHTML;
            modifiedHTML = shipping_city ? modifiedHTML.replace('%SHIPPING_CITY%', shipping_city) : modifiedHTML;
            modifiedHTML = email ? modifiedHTML.replace('%PATIENT_EMAIL%', email) : modifiedHTML;
            modifiedHTML = password ? modifiedHTML.replace('%PATIENT_PASSWORD%', password) : modifiedHTML;
            modifiedHTML = code ? modifiedHTML.replace('%ACP_CODE%', code) : modifiedHTML;    
            modifiedHTML = vendor ? modifiedHTML.replace('%VENDOR%', vendor) : modifiedHTML; 
            modifiedHTML = support_network_name ? modifiedHTML.replace('%SUPPORT_NETWORK_NAME%', support_network_name) : modifiedHTML;   

            resolve(modifiedHTML.toString());
        });
    })
}

//TEST
// (async () => {
//     const test = {
//         email:'sarasa@sarasa.com',
//         password: 1234156,
//         sn_code: 48955,
//         customer_phone: '+5411664928',
//         //Datos para probar mail_to_logistics
//         customer_name: 'Mostro Test',
//         customer_email: 'email@compra.com',
//         shipping_address: 'San Lorenzo 1435',
//         shipping_city: 'Obera, Misiones.'
//     };
//     const template = await getTemplateHTML('subscription_gold', test);
//     console.log({template});
// })();

module.exports = {
    getTemplateHTML
};
