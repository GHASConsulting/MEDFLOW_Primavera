export function findQueixa (recordType : any, fullResource :any):any {
    if(recordType === 'Q'){
      let arrParam :any = []
      let valores :any = [] 
      let resultado :string
      //let arrParamNew :any = []

          if(fullResource.resource.resourceType === "QuestionnaireResponse"){
          arrParam = fullResource.resource.item.filter((item :any) => item.linkId.substring(0,6) ===  'queixa')
          

          }else{
              return null
          }
          let caracter= ":"
          arrParam.forEach( item => { 
            valores.push(`${item.text} ${caracter} ${Object.values(item.answer[0]) }\n-`)
    }) 
          
          resultado = valores.toString().replaceAll('-,','').replaceAll('-','')
          return resultado
        }else{
            return null
        }
        
        
}






