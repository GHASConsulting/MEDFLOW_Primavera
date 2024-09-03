import { randomUUID } from 'crypto'
import { IPractitionerRole } from '../../types/hl7object.types'

/** @description Build the Contained Practitioner Role Object for HL7 Object */
export function buildPractitionerRole(
  practitionerReference: string,
  practitionerRoleName: string,
  cd_especialidade: string,
): IPractitionerRole {
  const practitionerRole: IPractitionerRole = {
    resourceType: 'PractitionerRole',
    id: `practitionerRole-${randomUUID()}`,
    specialty: [
      {
        coding: [
          {
            code: `${cd_especialidade}`,
            system:
              'https://healthit.medflowapp.com/fhir/CodeSystem/ans-tuss-cbos',
            display: practitionerRoleName,
          },
        ],
      },
    ],
    practitioner: {
      reference: `#${practitionerReference}`,
    },
  }

  return practitionerRole
}
