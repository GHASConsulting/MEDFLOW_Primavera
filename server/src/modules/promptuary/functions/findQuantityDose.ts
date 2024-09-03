export function findQuantityDose(fullResource) {
  if (fullResource.resource.resourceType === 'MedicationRequest') {
    const doseQuantityValue =
      fullResource.resource.dosageInstruction?.[0]?.doseAndRate?.[0]
        ?.doseQuantity?.value
    if (doseQuantityValue !== undefined) {
      return doseQuantityValue
    }
  }
  return 'null'
}
