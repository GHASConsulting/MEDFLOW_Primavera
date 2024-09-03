function findAttendance(bundleBody :any): any {  
  return bundleBody.result.entry.filter((item :any) => item.resource.resourceType == 'Encounter')
}

export { findAttendance }
