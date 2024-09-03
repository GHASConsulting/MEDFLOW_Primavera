"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.findEncaminhamento = findEncaminhamento;
function findEncaminhamento(recordType, fullResource) {
    if (recordType === 'E') {
        const encaminhamentoText = fullResource.resource.reasonCode?.[0]?.text;
        if (encaminhamentoText) {
            return encaminhamentoText;
        }
    }
    return 'null';
}
