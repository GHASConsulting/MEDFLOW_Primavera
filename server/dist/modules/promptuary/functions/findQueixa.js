"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.findQueixa = findQueixa;
function findQueixa(recordType, fullResource) {
    if (recordType === 'Q') {
        let arrParam = [];
        let valores = [];
        let resultado;
        //let arrParamNew :any = []
        if (fullResource.resource.resourceType === "QuestionnaireResponse") {
            arrParam = fullResource.resource.item.filter((item) => item.linkId.substring(0, 6) === 'queixa');
        }
        else {
            return null;
        }
        let caracter = ":";
        arrParam.forEach(item => {
            valores.push(`${item.text} ${caracter} ${Object.values(item.answer[0])}\n-`);
        });
        resultado = valores.toString().replaceAll('-,', '').replaceAll('-', '');
        return resultado;
    }
    else {
        return null;
    }
}
