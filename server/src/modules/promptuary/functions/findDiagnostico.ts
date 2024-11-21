export function findDiagnostico (recordType : any, fullResource :any):any {
    if(recordType === 'Q'){
      let arrParam :any = []
      let valores :any = [] 
      let arrParamNew :any = []

          if(fullResource.resource.resourceType === "QuestionnaireResponse"){
          arrParam = fullResource.resource.item.filter((item :any) => item.linkId.substring(0,11) ===  'diagnostico')
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