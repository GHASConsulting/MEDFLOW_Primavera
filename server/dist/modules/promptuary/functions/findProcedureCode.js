"use strict";
// export function findProcedureCode(fullResource) {
//   if (
//     fullResource &&
//     fullResource.resource &&
//     fullResource.resource.resourceType === 'ServiceRequest' &&
//     fullResource.resource.category &&
//     fullResource.resource.category.length > 0 &&
//     fullResource.resource.category[0].coding &&
//     fullResource.resource.category[0].coding.length > 0 &&
//     fullResource.resource.category[0].coding[0].code
//   ) {
//     const resourceCod = fullResource.resource.category[0].coding[0].code
//     return resourceCod
//   }
//   return 'null'
// }
Object.defineProperty(exports, "__esModule", { value: true });
exports.findProcedureCode = findProcedureCode;
function findProcedureCode(fullResource, recordType) {
    if (recordType === 'E' && (Object.keys(fullResource.resource).filter(valor => valor === 'category').length > 0)) {
        const resourceCod = fullResource.resource.category[0]?.coding[0]?.code ?? 'null';
        return resourceCod;
    }
    if (recordType === 'P' && (Object.keys(fullResource.resource).filter(valor => valor === 'code').length > 0) && (Object.keys(fullResource.resource.code).filter(valor => valor === 'coding').length > 0)) {
        const resourceCod = fullResource.resource.code?.coding[0]?.code ?? 'null';
        return resourceCod;
    }
    return null;
}
