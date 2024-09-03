export function findApplicationVia(fullResource) {
  if (fullResource.resource.resourceType === 'MedicationRequest') {
    const coding = fullResource.resource.dosageInstruction?.[0]?.route?.coding
    if (coding && Array.isArray(coding) && coding.length > 0) {
      const applicationVia = coding[0].code
      if (applicationVia !== undefined) {
        return applicationVia
      }
    }
  }
  return 'null'
}
