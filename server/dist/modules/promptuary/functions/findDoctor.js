"use strict";
// export function findDoctor(bundleBody : any, fullResource :any): any {
Object.defineProperty(exports, "__esModule", { value: true });
exports.findDoctor = findDoctor;
//     if(fullResource.resource.resourceType == "Practitioner"){
//       const resourceDoctorUuid = fullResource.resource
//       return Number(resourceDoctorUuid.identifier[0].value)
//   }
// }
function findDoctor(bundleBody, fullResource) {
    for (const resource of fullResource) {
        if (resource.resource.resourceType == "Practitioner") {
            const resourceDoctorUuid = resource.resource;
            return resourceDoctorUuid.name[0].text;
        }
    }
}
