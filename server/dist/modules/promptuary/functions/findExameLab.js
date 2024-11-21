"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.findExameLab = findExameLab;
function findExameLab(recordType, fullResource) {
    if (recordType === 'Q') {
        let arrParam = [];
        let valores = [];
        //let arrParamNew :any = []
        if (fullResource.resource.resourceType === "QuestionnaireResponse") {
            arrParam = fullResource.resource.item.filter((item) => item.linkId.substring(0, 9) === 'exame_lab');
        }
        else {
            return null;
        }
        arrParam.forEach((item) => {
            let caracter = ":";
            let valorResp;
            if (Object.values(item.answer[0]).toString() == "true") {
                valorResp = "Sim";
            }
            else if (Object.values(item.answer[0]).toString() == "false") {
                valorResp = "Não";
            }
            else {
                valorResp = Object.values(item.answer[0]).toString();
            }
            valores.push(`${item.text} ${caracter} ${valorResp}\n-`);
        });
        return valores.toString().replaceAll('-,', '').replaceAll('-', '');
    }
    else {
        return null;
    }
}
