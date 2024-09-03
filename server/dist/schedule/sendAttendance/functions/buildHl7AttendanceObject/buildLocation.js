"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildLocation = buildLocation;
const node_crypto_1 = require("node:crypto");
/** @description Build the Contained Location Object for HL7 Object */
function buildLocation(dataToSendAttendance) {
    const location = {
        resourceType: 'Location',
        id: `location-${(0, node_crypto_1.randomUUID)()}`,
        name: dataToSendAttendance.DS_SETOR_ATENDIMENTO,
    };
    return location;
}
