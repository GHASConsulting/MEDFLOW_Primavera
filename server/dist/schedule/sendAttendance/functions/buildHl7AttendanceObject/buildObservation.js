"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildObservation = buildObservation;
const crypto_1 = require("crypto");
/** @description Build the Contained Observation Object for HL7 Object */
function buildObservation(vitalSign, indexOfVitalSign, patientId, dataToSendAttendance) {
    const vitalSignTypeMapping = {
        0: {
            code: '8310-5',
            display: 'Temperatura corporal',
            unit: dataToSendAttendance.QT_TEMP_UNID_MED,
        },
        1: {
            code: '8480-6',
            display: 'Pressão arterial sistólica',
            unit: dataToSendAttendance.QT_PA_SISTOLICA_UNID_MED,
        },
        2: {
            code: '8462-4',
            display: 'Pressão arterial diastólica',
            unit: dataToSendAttendance.QT_PA_DIASISTOLICA_UNID_MED,
        },
        3: {
            code: '2708-6',
            display: 'Saturação de oxigênio',
            unit: dataToSendAttendance.QT_SAT_O2_UNID_MED,
        },
        4: {
            code: '15074-8',
            display: 'Glicemia capilar',
            unit: dataToSendAttendance.QT_GLICEMIA_CAPILAR_UNID_MED,
        },
        5: {
            code: '29463-7',
            display: 'Peso',
            unit: dataToSendAttendance.QT_PESO_UNID_MED,
        },
        6: {
            code: '8302-2',
            display: 'Altura',
            unit: dataToSendAttendance.QT_ALTURA_CM_UNID_MED,
        },
        7: {
            code: '8283-4',
            display: 'Circunferência da panturrilha',
            unit: dataToSendAttendance.QT_CIRCUNF_PANT_UNID_MED,
        },
        8: {
            code: '56072-2',
            display: 'Circunferência do braço',
            unit: dataToSendAttendance.QT_CIRCUNF_BRACO_UNID_MED,
        },
        9: {
            code: '8280-0',
            display: 'Circunferência da cintura',
            unit: dataToSendAttendance.QT_CIRCUNF_CINTURA_UNID_MED,
        },
        // 10: {
        //   code: 'IMC',
        //   display: 'Índice de massa corporal',
        //   unit: dataToSendAttendance.QT_IMC_UNID_MED,
        // },
    };
    const vitalSignData = vitalSignTypeMapping[indexOfVitalSign];
    const observation = {
        resourceType: 'Observation',
        id: `observation-${(0, crypto_1.randomUUID)()}`,
        status: 'final',
        category: [
            {
                coding: [
                    {
                        system: 'http://terminology.hl7.org/CodeSystem/observation-category',
                        code: 'vital-signs',
                        display: 'Vital Signs',
                    },
                ],
            },
        ],
        code: {
            coding: [
                {
                    code: vitalSignData.code,
                    display: vitalSignData.display,
                },
            ],
        },
        valueQuantity: {
            value: vitalSign,
            unit: vitalSignData.unit,
        },
        subject: {
            reference: `#${patientId}`,
        },
    };
    return observation;
}
