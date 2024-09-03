"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildIdentifiers = buildIdentifiers;
/** @description Build the list of identifiers for HL7 Object */
function buildIdentifiers(dataToSendAttendance) {
    const identifier = {
        use: 'usual',
        value: `${dataToSendAttendance.NR_ATENDIMENTO}`,
    };
    return [identifier];
}
