export function findQuantityProcedure(fullResource) {
  if (
    fullResource &&
    fullResource.resource &&
    fullResource.resource.quantityQuantity &&
    fullResource.resource.quantityQuantity.value
  ) {
    const quantity = fullResource.resource.quantityQuantity.value
    return quantity
  }
  return 'null'
}
