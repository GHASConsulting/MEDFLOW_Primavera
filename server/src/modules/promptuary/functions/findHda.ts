// export function findHda (recordType : any, fullResource :any):any {
// 	if(recordType === 'Q'){
// 	  let arrParam :any = []
// 	  let valores :any = [] 
// 	  //let arrParamNew :any = []

// 		  if(fullResource.resource.resourceType === "QuestionnaireResponse"){
// 		  arrParam = fullResource.resource.item.filter((item :any) => item.linkId.substring(0,3) ===  'hda')
		  

// 		  }else{
// 			  return null
// 		  }
//           arrParam.forEach((item:any) => {
//             let caracter = ":";
//             let valorResp
//             if(Object.values(item.answer[0]).toString() == "true"){valorResp ="Sim"} 
//                         else if(Object.values(item.answer[0]).toString() == "false") {valorResp ="Não"} 
//                         else{valorResp = Object.values(item.answer[0]).toString()}
                        
//             valores.push(`${item.text} ${caracter} ${valorResp}\n-`);
//         });
          
          
//           return valores.toString().replaceAll('-,','').replaceAll('-','')
//         }else{
//             return null
//         }
        
        
// }



export function findHda (recordType : any, fullResource :any):any {
	if(recordType === 'Q'){
	  
	  let valores :any = [] 
	  let arrParamNew :any

		  if(fullResource.resource.resourceType === "QuestionnaireResponse"){
		  const arrParam:any = fullResource.resource.item.filter((item :any) => item.linkId.substring(0,3) ===  'hda')
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