"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildHl7AttendanceObject = buildHl7AttendanceObject;
const buildIdentifiers_1 = require("./buildIdentifiers");
const buildOrganization_1 = require("./buildOrganization");
const buildPractitioner_1 = require("./buildPractitioner");
const buildPatient_1 = require("./buildPatient");
const buildLocation_1 = require("./buildLocation");
const buildClass_1 = require("./buildClass");
const buildObservation_1 = require("./buildObservation");
const buildPractitionerRole_1 = require("./buildPractitionerRole");
/** @description Build attendance object to send to Medflow API. Receiving the row of table "GHAS_ATEND_PACIENTE_T" and return a HL7 Object */
async function buildHl7AttendanceObject(dataToSendAttendance) {
    try {
        const organizationName = dataToSendAttendance.NM_ESTABELECIMENTO;
        const locationName = dataToSendAttendance.DS_SETOR_ATENDIMENTO;
        const patientName = dataToSendAttendance.NM_PACIENTE;
        const vitalSignList = [
            dataToSendAttendance.QT_TEMP,
            dataToSendAttendance.QT_PA_SISTOLICA,
            dataToSendAttendance.QT_PA_DIASISTOLICA,
            dataToSendAttendance.QT_SATURACAO_O2,
            dataToSendAttendance.QT_GLICEMIA_CAPILAR,
            dataToSendAttendance.QT_PESO,
            dataToSendAttendance.QT_ALTURA_CM,
            dataToSendAttendance.QT_CIRCUNF_PANTURRILHA,
            dataToSendAttendance.QT_CIRCUNF_BRACO,
            dataToSendAttendance.QT_CIRCUNF_CINTURA,
            // dataToSendAttendance.QT_IMC,
        ];
        const practitionerName = dataToSendAttendance.NM_MEDICO;
        const practitionerRoleName = dataToSendAttendance.DS_ESPECIALIDADE;
        const objectToReturn = {
            resourceType: 'Encounter',
            identifier: (0, buildIdentifiers_1.buildIdentifiers)(dataToSendAttendance),
            contained: [],
            status: 'in-progress',
            class: (0, buildClass_1.buildClass)(dataToSendAttendance),
        };
        if (organizationName) {
            const organization = (0, buildOrganization_1.buildOrganization)(dataToSendAttendance);
            objectToReturn.contained.push(organization);
            objectToReturn.serviceProvider = {
                reference: `#${organization.id}`,
            };
        }
        if (locationName) {
            const location = (0, buildLocation_1.buildLocation)(dataToSendAttendance);
            objectToReturn.contained.push(location);
            objectToReturn.location = [
                {
                    status: 'active',
                    location: {
                        reference: `#${location.id}`,
                    },
                },
            ];
        }
        if (patientName) {
            const patient = (0, buildPatient_1.buildPatient)(dataToSendAttendance);
            objectToReturn.contained.push(patient);
            objectToReturn.subject = {
                reference: `#${patient.id}`,
            };
            objectToReturn.reasonReference = [];
            for (let i = 0; i <= vitalSignList.length; i++) {
                if (vitalSignList[i]) {
                    const observation = (0, buildObservation_1.buildObservation)(vitalSignList[i], i, patient.id, dataToSendAttendance);
                    objectToReturn.contained?.push(observation);
                    objectToReturn.reasonReference.push({
                        reference: `#${observation.id}`,
                    });
                }
            }
        }
        if (practitionerName) {
            const practitioner = (0, buildPractitioner_1.buildPractitioner)(dataToSendAttendance);
            objectToReturn.contained.push(practitioner);
            objectToReturn.participant = [];
            if (practitionerRoleName) {
                const practitionerRole = (0, buildPractitionerRole_1.buildPractitionerRole)(practitioner.id, practitionerRoleName, `${dataToSendAttendance.CD_ESPECIALIDADE}`);
                objectToReturn.contained?.push(practitionerRole);
                objectToReturn.participant.push({
                    individual: {
                        reference: `#${practitionerRole.id}`,
                    },
                });
            }
            else {
                objectToReturn.participant.push({
                    individual: {
                        reference: `#${practitioner.id}`,
                    },
                });
            }
        }
        return objectToReturn;
    }
    catch (error) {
        throw new Error(error);
    }
}
