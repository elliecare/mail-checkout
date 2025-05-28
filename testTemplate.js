const { getTemplateHTML } = require('./index'); // Ajusta la ruta

(async () => {
    const testParams = {
    patient_first_name: 'Juan',
    patient_last_name: 'Pérez',
    company_client: 'CC Test',
    type_alert: 'Posible caída',
    user_id: '123456789',
    id_smartwatch: '0000234567',
    sw_number:'0303456',
    patient_phone_number: '0000000',
    patient_phone_number_landline: '1111111',
    location: `https://maps.google.com/maps?&q=0,0`,
    location_timestamp: new Date(),
    event_date: new Date()
    };

    try {
    const html = await getTemplateHTML('alert_pending', testParams);
    console.log(html);
    } catch (err) {
    console.error(err);
    }
})();