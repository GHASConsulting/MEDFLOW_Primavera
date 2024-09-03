"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildPractitionerRole = buildPractitionerRole;
const crypto_1 = require("crypto");
/** @description Build the Contained Practitioner Role Object for HL7 Object */
function buildPractitionerRole(practitionerReference, practitionerRoleName, cd_especialidade) {
    const practitionerRole = {
        resourceType: 'PractitionerRole',
        id: `practitionerRole-${(0, crypto_1.randomUUID)()}`,
        specialty: [
            {
                coding: [
                    {
                        code: `${cd_especialidade}`,
                        system: 'https://healthit.medflowapp.com/fhir/CodeSystem/ans-tuss-cbos',
                        display: practitionerRoleName,
                    },
                ],
            },
        ],
        practitioner: {
            reference: `#${practitionerReference}`,
        },
    };
    return practitionerRole;
}
