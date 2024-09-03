"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.findMaterialDescription = findMaterialDescription;
function findMaterialDescription(fullResource) {
    if (fullResource.resource.resourceType === 'MedicationRequest') {
        const coding = fullResource.resource.medicationCodeableConcept?.text ??
            fullResource.resource.medicationCodeableConcept?.coding?.[0]?.display ??
            null;
        return coding;
    }
    return 'null';
}
