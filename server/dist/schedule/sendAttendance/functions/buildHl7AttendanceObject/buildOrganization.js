"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildOrganization = buildOrganization;
const node_crypto_1 = require("node:crypto");
/** @description Build the Contained Organization Object for HL7 Object */
function buildOrganization(dataToSendAttendance) {
    const organization = {
        resourceType: 'Organization',
        id: `organization-${(0, node_crypto_1.randomUUID)()}`,
        name: dataToSendAttendance.NM_ESTABELECIMENTO,
    };
    return organization;
}
