"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.findQuantityProcedure = findQuantityProcedure;
function findQuantityProcedure(fullResource) {
    if (fullResource &&
        fullResource.resource &&
        fullResource.resource.quantityQuantity &&
        fullResource.resource.quantityQuantity.value) {
        const quantity = fullResource.resource.quantityQuantity.value;
        return quantity;
    }
    return 'null';
}
