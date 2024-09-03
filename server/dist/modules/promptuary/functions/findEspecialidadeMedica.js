"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.findEspecialidadeMedica = findEspecialidadeMedica;
function findEspecialidadeMedica(recordType, fullResource) {
    if (recordType === 'E') {
        const especialidadeCode = fullResource.resource.code.coding?.[0]?.code;
        if (especialidadeCode) {
            return especialidadeCode;
        }
    }
    return 'null';
}
