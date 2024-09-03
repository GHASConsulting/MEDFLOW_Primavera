export function findDiagnostico (recordType : any, fullResource :any):any {
    if(recordType === 'Q'){
      let arrParam :any = []
      let valores :any = [] 
      //let arrParamNew :any = []

          if(fullResource.resource.resourceType === "QuestionnaireResponse"){
          arrParam = fullResource.resource.item.filter((item :any) => item.linkId.substring(0,11) ===  'diagnostico')
          

          }else{
              return null
          }
        let caracter= ":"
          arrParam.forEach( item => { 
            valores.push(`${item.text} ${caracter} ${Object.values(item.answer[0]) }\n-`)
    }) 
          
          
          return valores.toString().replaceAll('-,','').replaceAll('-','')
        }else{
            return null
        }
        
        
}