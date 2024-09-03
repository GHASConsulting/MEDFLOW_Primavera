import { randomUUID } from 'node:crypto'
import { IOrganization } from '../../types/hl7object.types'
import { IAttendancePatient } from '../../types/selectTableAttendancePatient.types'

/** @description Build the Contained Organization Object for HL7 Object */
export function buildOrganization(
  dataToSendAttendance: IAttendancePatient,
): IOrganization {
  const organization: IOrganization = {
    resourceType: 'Organization',
    id: `organization-${randomUUID()}`,
    name: dataToSendAttendance.NM_ESTABELECIMENTO,
  }

  return organization
}
