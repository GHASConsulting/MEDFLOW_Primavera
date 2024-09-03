"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.findMedidaUnityCode = findMedidaUnityCode;
function findMedidaUnityCode(fullResource) {
    if (fullResource.resource.resourceType === 'MedicationRequest') {
        const doseQuantityUnit = fullResource.resource.dosageInstruction?.[0]?.doseAndRate?.[0]
            ?.doseQuantity?.unit;
        if (doseQuantityUnit) {
            return doseQuantityUnit;
        }
    }
    return 'null';
}
