"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildClass = buildClass;
const attendanceTypeMapping = {
    1: { code: 'IMP', display: 'inpatient encounter' },
    3: { code: 'EMER', display: 'emergency' },
    7: { code: '', display: '' },
    8: { code: 'AMB', display: 'ambulatory' },
    6: { code: '', display: '' },
    21: { code: 'VR', display: 'virtual' },
    15: { code: '', display: '' },
    25: { code: '', display: '' },
    30: { code: '', display: '' },
    10: { code: '', display: '' },
    11: { code: '', display: '' },
    12: { code: '', display: '' },
    14: { code: '', display: '' },
};
/** @description Build the the class for HL7 Object */
function buildClass(dataToSendAttendance) {
    const typeAttendanceCode = dataToSendAttendance.IE_TIPO_ATENDIMENTO;
    const code = attendanceTypeMapping[typeAttendanceCode].code;
    const display = attendanceTypeMapping[typeAttendanceCode].display;
    const newClass = {
        system: 'http://terminology.hl7.org/CodeSystem/v3-ActCode',
        code,
        display,
    };
    return newClass;
}
