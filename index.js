const fs = require('fs');
const path = require('path');

const templates = {
    subscription_gold:'email_subscription_gold',
    subscription_gold_loan:'email_subscription_gold_loan',
    subscription_basic:'email_subscription_basic',
    email_verification:'email_verification',
    mail_to_logistics:'mail_to_logistics',
    alert_pending:'alert_not_in_connect',
    new_companion_add:'new_companion_add',
    existing_companion_add:'existing_companion_add',
    password_recovery:'password_recovery',
    sw_out_of_date:'sw_out_of_date'
}

async function getTemplateHTML(selected, params, isMailToLogistic = false) {
    return new Promise((resolve, reject) => {
        const archive = templates[selected];
        const {
            plan_type, 
            plan_name, 
            email, 
            password, 
            code, 
            customer_phone, 
            patient_first_name, 
            patient_last_name, 
            customer_name, 
            customer_email, 
            shipping_address, 
            shipping_city, 
            vendor, 
            support_network_name, 
            company_client, 
            type_alert, 
            user_id, 
            id_smartwatch, 
            sw_number,
            patient_phone_number,
            patient_phone_number_landline,
            location,
            location_timestamp, 
            event_date, 
            success_url, 
            main_companion_first_name, 
            main_companion_last_name, 
            main_companion_email, 
            main_companion_password,
            password_recovery_url,
            backend_date,
            sw_date
        } = params;

        const filePath = path.resolve(__dirname, 'templates', `${archive}.html`);
    
        fs.readFile(filePath, 'utf8', (err, data) => {
            if (err) {
                reject({error:`Error al leer el archivo ${filePath}: ${err.message}`});
            }
            if (!data) {
                reject({ error: `El archivo ${filePath} está vacío o no se pudo leer correctamente.` });
                return;
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
            modifiedHTML = patient_phone_number ? modifiedHTML.replace('%PATIENT_PHONE_NUMBER%', patient_phone_number) : modifiedHTML;
            modifiedHTML = patient_phone_number_landline ? modifiedHTML.replace('%PATIENT_PHONE_NUMBER_LANDLINE%', patient_phone_number_landline) : modifiedHTML;
            modifiedHTML = location ? modifiedHTML.replace('%LOCATION%', location) : modifiedHTML;
            modifiedHTML = location_timestamp ? modifiedHTML.replace('%LOCATION_TIMESTAMP%', location_timestamp) : modifiedHTML;
            modifiedHTML = event_date ? modifiedHTML.replace('%DATE%', event_date) : modifiedHTML;
            modifiedHTML = success_url ? modifiedHTML.replace('%SUCCESS_URL%', String(success_url)) : modifiedHTML;

            //Variables para el template mail_to_logistics
            modifiedHTML = customer_name ? modifiedHTML.replace('%BUYER_NAME%', customer_name) : modifiedHTML;
            modifiedHTML = plan_type ? modifiedHTML.replace('%RED_PLAN_TYPE%', plan_type) : modifiedHTML;
            modifiedHTML = plan_name ? modifiedHTML.replace('%RED_PLAN_NAME%', plan_name) : modifiedHTML;
            modifiedHTML = customer_email ? modifiedHTML.replace('%BUYER_EMAIL%', customer_email) : modifiedHTML;
            modifiedHTML = customer_phone ? modifiedHTML.replace('%BUYER_PHONE%', customer_phone) : modifiedHTML;
            modifiedHTML = shipping_address ? modifiedHTML.replace('%SHIPPING_ADDRESS%', shipping_address) : modifiedHTML;
            modifiedHTML = shipping_city ? modifiedHTML.replace('%SHIPPING_CITY%', shipping_city) : modifiedHTML;
            modifiedHTML = email ? modifiedHTML.replace('%PATIENT_EMAIL%', email) : modifiedHTML;
            modifiedHTML = password ? modifiedHTML.replace('%PATIENT_PASSWORD%', password) : modifiedHTML;
            modifiedHTML = code ? modifiedHTML.replace('%ACP_CODE%', code) : modifiedHTML;
            modifiedHTML = main_companion_first_name ? modifiedHTML.replace('%ACP_NAME%', main_companion_first_name) : modifiedHTML;
			modifiedHTML = main_companion_last_name ? modifiedHTML.replace('%ACP_LASTNAME%', main_companion_last_name) : modifiedHTML;
			modifiedHTML = main_companion_email ? modifiedHTML.replace('%ACP_EMAIL%', main_companion_email) : modifiedHTML; 
			modifiedHTML = main_companion_password ? modifiedHTML.replace('%ACP_PASSWORD%', main_companion_password) : modifiedHTML;  
            modifiedHTML = vendor ? modifiedHTML.replace('%VENDOR%', vendor) : modifiedHTML;
            modifiedHTML = support_network_name ? modifiedHTML.replace('%SUPPORT_NETWORK_NAME%', support_network_name) : modifiedHTML;
            modifiedHTML = password_recovery_url ? modifiedHTML.replace('%PASSWORD_RECOVERY_URL%', String(password_recovery_url)) : modifiedHTML;
            modifiedHTML = backend_date ? modifiedHTML.replace('%BACKEND_DATE%', String(backend_date)) : modifiedHTML;
            modifiedHTML = sw_date ? modifiedHTML.replace('%SW_DATE%', String(sw_date)) : modifiedHTML;

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
//         shipping_city: 'Obera, Misiones.',
// 	    patient_first_name: 'Nombre AM',
// 	    patient_last_name: 'Apellido AM',
// 	    email: 'ELLIE-0000023@ellie.care',
// 	    password: 'Ellie-00023',
// 	    main_companion_first_name: 'Nombre ACP',
// 	    main_companion_last_name: 'Apellido ACP',
// 	    main_companion_email: 'Email ACP',
// 	    main_companion_password: 'Password ACP',
// 	    vendor: 'NombreVendor',
// 	    //@TODO aca agrego el plan
// 		plan_type: 'Gold',
// 		plan_name: 'Ellie Gold Comodato',
// 		company_client: 'Ellie Care CC',
//         support_network_name: 'Nombre de RED'
//     };
//     const template = await getTemplateHTML('new_companion_add', test);
//     console.log({template});
// })();

module.exports = {
    getTemplateHTML
};
