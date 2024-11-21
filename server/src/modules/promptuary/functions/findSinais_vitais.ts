export function findSinais_vitais(recordType : any, fullResource :any):any {
    if(recordType === 'Q'){
  let arrParam :any = []
  let valores :any = [] 
  let arrParamNew :any = []

      if(fullResource.resource.resourceType === "QuestionnaireResponse"){
      arrParam = fullResource.resource.item.filter((item :any) => item.linkId.substring(0,'sinais_vitais'.length) ===  'sinais_vitais')
                        arrParam.forEach((item:any) => {
                            let caracter = ":";
                            let valorResp
                            arrParamNew = item?.answer?.length ?? null
                            if(arrParamNew != null){
                                valores.push(`--> ${item.text} \n`)
                                for(const items of item.answer){
                                if(Object.values(items).toString() == "true"){valorResp ="Sim"} 
                                            else if(Object.values(items).toString() == "false") {valorResp ="Não"} 
                                            else{valorResp = Object.values(items).toString()}
                                        
                                valores.push(`- ${valorResp}\n`);
                                }
                            }
                            }
                        );
                    
                    return valores.toString().replaceAll(',-','-')

                    }else{
                    return null
                    }



                    }
}


export function findSinais_vitais_triagem(fullResource :any) {
    const novoObjeto = {
         'fr' : '',
         'pas':'',
         'pad':'',
         'temperatura':'',
         'sato2':'',
         'fc':'',
         'descResumoTriagem':''
    }
    const sinaisVitais :any = fullResource.result.entry.filter((item :any) => item.resource.resourceType == 'QuestionnaireResponse')
    const resumoTriagem = fullResource.result.entry.filter((item :any) => item.resource.resourceType == 'PlanDefinition')
    const sinaisVitaisArray :any = sinaisVitais[0].resource.item
    const newSinais :any = sinaisVitaisArray.filter((item:any)=> item.linkId.substring(0,'sinais_vitais'.length) ===  'sinais_vitais')
    
    novoObjeto.fr = Object.values(newSinais.find((element :any) => element.linkId ===  'sinais_vitais.FR').answer[0]).toString()
    novoObjeto.pas = Object.values(newSinais.find((element :any) => element.linkId ===  'sinais_vitais.PAS').answer[0]).toString()
    novoObjeto.pad = Object.values(newSinais.find((element :any) => element.linkId ===  'sinais_vitais.PAD').answer[0]).toString()
    novoObjeto.temperatura = Object.values(newSinais.find((element :any) => element.linkId ===  'sinais_vitais.temperatura').answer[0]).toString()
    novoObjeto.sato2 = Object.values(newSinais.find((element :any) => element.linkId ===  'sinais_vitais.SATO2').answer[0]).toString()
    novoObjeto.fc = Object.values(newSinais.find((element :any) => element.linkId ===  'sinais_vitais.FC').answer[0]).toString()
    novoObjeto.descResumoTriagem = resumoTriagem[0]?.resource.action[0]?.description?.toString() ?? null
    return novoObjeto  
} 