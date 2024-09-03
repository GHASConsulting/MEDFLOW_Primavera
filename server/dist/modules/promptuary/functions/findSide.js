"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.findSide = findSide;
function findSide(fullResource) {
    if (fullResource.resource &&
        fullResource.resource.bodySite &&
        fullResource.resource.bodySite.length > 0 &&
        fullResource.resource.bodySite[0].coding &&
        fullResource.resource.bodySite[0].coding.length > 0 &&
        fullResource.resource.bodySite[0].coding[0].code) {
        const side = fullResource.resource.bodySite[0].coding[0].code;
        return side;
    }
    else {
        return null;
    }
}
