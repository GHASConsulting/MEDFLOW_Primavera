"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.findMedicacoes_de_uso_comum = findMedicacoes_de_uso_comum;
function findMedicacoes_de_uso_comum(recordType, fullResource) {
    if (recordType === 'Q') {
        let arrParam = [];
        let valores = [];
        let arrParamNew = [];
        if (fullResource.resource.resourceType === "QuestionnaireResponse") {
            arrParam = fullResource.resource.item.filter((item) => item.linkId.substring(0, 'medicacoes_de_uso_comum'.length) === 'medicacoes_de_uso_comum');
            arrParam.forEach((item) => {
                let caracter = ":";
                let valorResp;
                arrParamNew = item?.answer?.length ?? null;
                if (arrParamNew != null) {
                    valores.push(`--> ${item.text} \n`);
                    for (const items of item.answer) {
                        if (Object.values(items).toString() == "true") {
                            valorResp = "Sim";
                        }
                        else if (Object.values(items).toString() == "false") {
                            valorResp = "Não";
                        }
                        else {
                            valorResp = Object.values(items).toString();
                        }
                        valores.push(`- ${valorResp}\n`);
                    }
                }
            });
            return valores.toString().replaceAll(',-', '-');
        }
        else {
            return null;
        }
    }
}
