"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildPractitioner = buildPractitioner;
const node_crypto_1 = require("node:crypto");
const genderMapping = {
    M: 'male',
    F: 'female',
};
/** @description Build the Contained Practitioner Object for HL7 Object */
function buildPractitioner(dataToSendAttendance) {
    dataToSendAttendance.IE_SEXO_MED =
        genderMapping[dataToSendAttendance.IE_SEXO_MED] || 'unknown';
    const practitioner = {
        resourceType: 'Practitioner',
        id: `practitioner-${(0, node_crypto_1.randomUUID)()}`,
        identifier: [
            {
                use: 'usual',
                value: `${dataToSendAttendance.NR_CRM}`,
            },
        ],
        name: [
            {
                use: 'usual',
                text: dataToSendAttendance.NM_MEDICO,
            },
        ],
        gender: dataToSendAttendance.IE_SEXO_MED,
    };
    return practitioner;
}
