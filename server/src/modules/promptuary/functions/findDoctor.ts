// export function findDoctor(bundleBody : any, fullResource :any): any {
	
//     if(fullResource.resource.resourceType == "Practitioner"){
//       const resourceDoctorUuid = fullResource.resource
//       return Number(resourceDoctorUuid.identifier[0].value)
//   }
// }
export function findDoctor(bundleBody : any, fullResource :any): any {
	for (const resource  of fullResource){
			if(resource.resource.resourceType == "Practitioner"){
			const resourceDoctorUuid = resource.resource
			return resourceDoctorUuid.name[0].text
		}
	}
    

}