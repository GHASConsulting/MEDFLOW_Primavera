export function findConduta_medica(recordType : any, fullResource :any):any {
    if(recordType === 'PD'){
        if(fullResource.resource.resourceType === "PlanDefinition"){
        let headerConduta = fullResource.resource.title
        let descConduta = fullResource.resource.action[0].description
        let title = headerConduta.replace("[",'').replace("]",'')
        let conduta = `${title} - Conduta Medica: ${descConduta}` 
        return conduta.toString()
        
    }else{
        return null
    }
    }else{
        return null
    }
    
    
}
