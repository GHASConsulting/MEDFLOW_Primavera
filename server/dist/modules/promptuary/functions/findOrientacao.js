"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.findOrientacao = findOrientacao;
function findOrientacao(fullResource) {
    if (fullResource.resource && fullResource.resource.description) {
        return fullResource.resource.description;
    }
    else {
        return 'null';
    }
}
