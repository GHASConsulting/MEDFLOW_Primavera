"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.findIntervalCode = findIntervalCode;
function findIntervalCode(fullResource) {
    if (fullResource.resource.resourceType === 'MedicationRequest') {
        const intervalCode = fullResource.resource.dosageInstruction[0].timing?.code?.coding[0]
            ?.code ?? null;
        return intervalCode;
    }
    else
        return null;
}
