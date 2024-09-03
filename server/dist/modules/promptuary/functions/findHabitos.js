"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.findHabitos = findHabitos;
function findHabitos(recordType, fullResource) {
    if (recordType === 'Q') {
        let arrParam = [];
        let valores = [];
        //let arrParamNew :any = []
        if (fullResource.resource.resourceType === "QuestionnaireResponse") {
            arrParam = fullResource.resource.item.filter((item) => item.linkId.substring(0, 7) === 'habitos');
        }
        else {
            return null;
        }
        let caracter = ":";
        arrParam.forEach(item => {
            valores.push(`${item.text} ${caracter} ${Object.values(item.answer[0])}\n-`);
        });
        return valores.toString().replaceAll('-,', '').replaceAll('-', '');
    }
    else {
        return null;
    }
}
