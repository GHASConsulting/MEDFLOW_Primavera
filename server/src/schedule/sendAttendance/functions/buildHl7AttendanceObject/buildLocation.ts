import { randomUUID } from 'node:crypto'
import { ILocation } from '../../types/hl7object.types'
import { IAttendancePatient } from '../../types/selectTableAttendancePatient.types'

/** @description Build the Contained Location Object for HL7 Object */
export function buildLocation(
  dataToSendAttendance: IAttendancePatient,
): ILocation {
  const location: ILocation = {
    resourceType: 'Location',
    id: `location-${randomUUID()}`,
    name: dataToSendAttendance.DS_SETOR_ATENDIMENTO,
  }

  return location
}
