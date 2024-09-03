export function findJustification(fullResource) {
  if (fullResource.resource.resourceType === 'ServiceRequest') {
    const reasonCode = fullResource.resource.reasonCode?.[0]?.text ?? null

    return reasonCode
  }

  return 'null'
}
