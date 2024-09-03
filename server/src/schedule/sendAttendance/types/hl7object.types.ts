export interface IIdentifier {
  use: string
  value: string
}

export interface IName {
  use: string
  text: string
}

export interface ITelecom {
  system: string
  use: string
  value: string
}

export interface IContact {
  telecom: ITelecom[]
}

export interface IPatient {
  id: string
  resourceType: string
  identifier?: IIdentifier[]
  name: IName[]
  birthDate: string
  gender: string
  contact?: IContact[]
}

export interface IPractitioner {
  id: string
  resourceType: string
  identifier?: IIdentifier[]
  name: IName[]
  gender: string
}

export interface ICoding {
  system?: string
  code: string
  display: string
}

export interface ISpecialty {
  coding: ICoding[]
  text?: string
}

export interface IPractitionerRole {
  id: string
  resourceType: string
  identifier?: IIdentifier[]
  specialty: ISpecialty[]
  practitioner: {
    reference: string
  }
}

export interface IOrganization {
  id: string
  resourceType: string
  identifier?: IIdentifier[]
  name: string
}

export interface IPhysicalTypeCoding {
  system: string
  code: string
  display: string
}

export interface IPhysicalType {
  coding: IPhysicalTypeCoding[]
  text: string
}

export interface ILocation {
  id: string
  resourceType: string
  identifier?: IIdentifier[]
  physicalType?: IPhysicalType
  name: string
}

export interface ICategoryCoding {
  coding: ICoding[]
}

export interface ICodeCoding {
  coding: ICoding[]
  text?: string
}

export interface IValueQuantity {
  value: number
  unit: string
  system?: string
  code?: string
}

export interface ISubject {
  reference: string
}

export interface IObservation {
  resourceType: string
  id: string
  status: string
  category: ICategoryCoding[]
  code: ICodeCoding
  valueQuantity: IValueQuantity
  subject: ISubject
}

export interface IIndividual {
  reference: string
}

export interface IParticipant {
  individual: IIndividual
}

export interface IServiceProvider {
  reference: string
}

export interface ILocationReference {
  reference: string
}

export interface ILocationEntry {
  status: string
  location: ILocationReference
}

export interface IReasonReference {
  reference: string
}

export interface IEncounter {
  resourceType: string
  identifier?: IIdentifier[]
  contained: Array<
    | IPatient
    | IPractitioner
    | IPractitionerRole
    | IOrganization
    | ILocation
    | IObservation
  >
  status: string
  class: ICoding
  participant?: IParticipant[]
  subject?: ISubject
  serviceProvider?: IServiceProvider
  location?: ILocationEntry[]
  practitioner?: {
    reference: string
  }
  reasonReference?: IReasonReference[]
}
