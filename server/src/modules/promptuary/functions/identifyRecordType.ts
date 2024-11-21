function identifyRecordType(fullResource): string {
  const resourceType = fullResource.resource.resourceType;
    if (resourceType === 'MedicationRequest') {
        return 'M';
    }
    if (resourceType === 'CarePlan') {
        return 'O';
    }
    if (resourceType === 'ServiceRequest') {
        if (fullResource.resource?.code?.coding) {
            return 'P';
               
       }
         
            
        if (fullResource?.resource?.category[0].coding) {
                if(fullResource?.resource?.category[0].coding[0].code == '103696004')
                return 'E';
            }
    }
    

    if (resourceType === 'QuestionnaireResponse') {
        return 'Q';
    }
    if (resourceType === 'PlanDefinition') {
        return 'PD';
    }
    return 'U';
}

export { identifyRecordType }
