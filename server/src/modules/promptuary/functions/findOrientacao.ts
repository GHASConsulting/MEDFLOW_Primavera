export function findOrientacao(fullResource) {
  if (fullResource.resource && fullResource.resource.description) {
    return fullResource.resource.description
  } else {
    return 'null'
  }
}
