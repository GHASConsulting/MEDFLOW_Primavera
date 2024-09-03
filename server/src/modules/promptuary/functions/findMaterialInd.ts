export function findMaterialInd(fullResource) {
  if (fullResource.resource.resourceType === 'MedicationRequest') {
    const dosageInstruction =
      fullResource.resource.dosageInstruction?.[0]?.text ?? null

    return dosageInstruction
  }

  return 'null'
}
