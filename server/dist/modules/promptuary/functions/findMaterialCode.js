"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.findMaterialCode = findMaterialCode;
function findMaterialCode(fullResource) {
    if (fullResource.resource.resourceType === 'MedicationRequest') {
        const coding = fullResource.resource.medicationCodeableConcept?.coding;
        if (coding && Array.isArray(coding) && coding.length > 0) {
            const materialCode = coding[0].code;
            if (materialCode !== undefined) {
                return materialCode;
            }
        }
    }
    return 'null';
}
