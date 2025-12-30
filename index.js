const fs = require('fs').promises;
const path = require('path');
const { footerDefault } = require('./default/footer');

const templates = {
    subscription_gold: 'email_subscription_gold',
    subscription_gold_loan: 'email_subscription_gold_loan',
    subscription_young: 'email_subscription_young',
    subscription_young_loan: 'email_subscription_young_loan',
    subscription_basic: 'email_subscription_basic',
    email_verification: 'email_verification',
    mail_to_logistics: 'mail_to_logistics',
    alert_pending: 'alert_pending',
    new_companion_add: 'new_companion_add',
    existing_companion_add: 'existing_companion_add',
    password_recovery: 'password_recovery',
    sw_out_of_date: 'sw_out_of_date',
    request_new_health_system:'request_new_health_system'
};

function replacePlaceholders(template, replacements) {
    return Object.entries(replacements).reduce((html, [key, value]) => {
        if (value !== undefined && value !== null) {
            const regex = new RegExp(`%${key}%`, 'g');
            return html.replace(regex, String(value));
        }
        return html;
    }, template);
}

async function getTemplateHTML(selected, params = {}) {
    const archive = templates[selected];
    if (!archive) {
        throw new Error(`Template "${selected}" no existe en el mapeo.`);
    }

    const filePath = path.resolve(__dirname, 'templates', `${archive}.html`);
    let data;

    try {
        data = await fs.readFile(filePath, 'utf8');
    } catch (err) {
        throw new Error(`Error al leer el archivo ${filePath}: ${err.message}`);
    }

    if (!data) {
        throw new Error(`El archivo ${filePath} está vacío o no se pudo leer correctamente.`);
    }

    const placeholders = {
        EMAIL: params.email,
        PASSWORD: params.password,
        CODE: params.code,
        CUSTOMER_PHONE: params.customer_phone,
        PATIENT_FIRST_NAME: params.patient_first_name,
        PATIENT_LAST_NAME: params.patient_last_name,
        BUYER_NAME: params.customer_name,
        BUYER_EMAIL: params.customer_email,
        BUYER_PHONE: params.customer_phone,
        SHIPPING_ADDRESS: params.shipping_address,
        SHIPPING_CITY: params.shipping_city,
        RED_PLAN_TYPE: params.plan_type,
        RED_PLAN_NAME: params.plan_name,
        ALERT_TYPE: params.type_alert,
        USER_ID: params.user_id,
        SW_ID: params.id_smartwatch,
        SW_NUMBER: params.sw_number,
        PATIENT_PHONE_NUMBER: params.patient_phone_number,
        PATIENT_PHONE_NUMBER_LANDLINE: params.patient_phone_number_landline,
        LOCATION: params.location,
        LOCATION_TIMESTAMP: params.location_timestamp,
        DATE: params.event_date,
        SUCCESS_URL: params.success_url,
        ACP_NAME: params.main_companion_first_name,
        ACP_LASTNAME: params.main_companion_last_name,
        ACP_EMAIL: params.main_companion_email,
        ACP_PASSWORD: params.main_companion_password,
        VENDOR: params.vendor,
        SUPPORT_NETWORK_NAME: params.support_network_name,
        PASSWORD_RECOVERY_URL: params.password_recovery_url,
        BACKEND_DATE: params.backend_date,
        SW_DATE: params.sw_date,
        CC: params.company_client,
        PATIENT_EMAIL: params.email,
        PATIENT_PASSWORD: params.password,
        ACP_CODE: params.code,
        HEALTH_SYSTEM_NAME: params.health_system_name,
        CC_NAME: params.cc_name ?? 'Ellie Care',
        FOOTER: params.footer ?? footerDefault
    };
    
    return replacePlaceholders(data, placeholders);
}

module.exports = {
    getTemplateHTML
};
