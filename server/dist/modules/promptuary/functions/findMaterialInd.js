"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.findMaterialInd = findMaterialInd;
function findMaterialInd(fullResource) {
    if (fullResource.resource.resourceType === 'MedicationRequest') {
        const dosageInstruction = fullResource.resource.dosageInstruction?.[0]?.text ?? null;
        return dosageInstruction;
    }
    return 'null';
}
