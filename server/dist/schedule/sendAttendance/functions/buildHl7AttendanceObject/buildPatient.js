"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildPatient = buildPatient;
const node_crypto_1 = require("node:crypto");
const formatDate_yyyy_mm_dd_1 = require("../../../../utils/formatDate_yyyy-mm-dd");
const genderMapping = {
    M: 'male',
    F: 'female',
};
/** @description Build the Contained Patient Object for HL7 Object */
function buildPatient(dataToSendAttendance) {
    dataToSendAttendance.IE_SEXO_PAC =
        genderMapping[dataToSendAttendance.IE_SEXO_PAC] || 'unknown';
    const patient = {
        resourceType: 'Patient',
        id: `patient-${(0, node_crypto_1.randomUUID)()}`,
        name: [
            {
                use: 'official',
                text: dataToSendAttendance.NM_PACIENTE,
            },
        ],
        gender: dataToSendAttendance.IE_SEXO_PAC,
        birthDate: (0, formatDate_yyyy_mm_dd_1.formatDate)(dataToSendAttendance.DT_NASCIMENTO),
    };
    return patient;
}
