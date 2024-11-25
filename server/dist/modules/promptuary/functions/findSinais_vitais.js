"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.findSinais_vitais = findSinais_vitais;
exports.findSinais_vitais_triagem = findSinais_vitais_triagem;
function findSinais_vitais(recordType, fullResource) {
    if (recordType === 'Q') {
        let arrParam = [];
        let valores = [];
        let arrParamNew = [];
        if (fullResource.resource.resourceType === "QuestionnaireResponse") {
            arrParam = fullResource.resource.item.filter((item) => item.linkId.substring(0, 'sinais_vitais'.length) === 'sinais_vitais');
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
function findSinais_vitais_triagem(fullResource) {
    const novoObjeto = {
        'fr': '',
        'pas': '',
        'pad': '',
        'temperatura': '',
        'sato2': '',
        'fc': '',
        'descResumoTriagem': ''
    };
    const sinaisVitais = fullResource.result.entry.filter((item) => item.resource.resourceType == 'QuestionnaireResponse');
    const resumoTriagem = fullResource.result.entry.filter((item) => item.resource.resourceType == 'PlanDefinition');
    const sinaisVitaisArray = sinaisVitais[0].resource.item;
    const newSinais = sinaisVitaisArray.filter((item) => item.linkId.substring(0, 'sinais_vitais'.length) === 'sinais_vitais');
    novoObjeto.fr = Object.values(newSinais.find((element) => element.linkId === 'sinais_vitais.FR').answer[0]).toString();
    novoObjeto.pas = Object.values(newSinais.find((element) => element.linkId === 'sinais_vitais.PAS').answer[0]).toString();
    novoObjeto.pad = Object.values(newSinais.find((element) => element.linkId === 'sinais_vitais.PAD').answer[0]).toString();
    novoObjeto.temperatura = Object.values(newSinais.find((element) => element.linkId === 'sinais_vitais.temperatura').answer[0]).toString();
    novoObjeto.sato2 = Object.values(newSinais.find((element) => element.linkId === 'sinais_vitais.SATO2').answer[0]).toString();
    novoObjeto.fc = Object.values(newSinais.find((element) => element.linkId === 'sinais_vitais.FC').answer[0]).toString();
    novoObjeto.descResumoTriagem = resumoTriagem[0]?.resource.action[0]?.description?.toString() ?? null;
    return novoObjeto;
}
