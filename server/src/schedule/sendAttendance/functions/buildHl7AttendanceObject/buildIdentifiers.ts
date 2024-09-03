import { IIdentifier } from '../../types/hl7object.types'
import { IAttendancePatient } from '../../types/selectTableAttendancePatient.types'

/** @description Build the list of identifiers for HL7 Object */
export function buildIdentifiers(
  dataToSendAttendance: IAttendancePatient,
): IIdentifier[] {
  const identifier: IIdentifier = {
    use: 'usual',
    value: `${dataToSendAttendance.NR_ATENDIMENTO}`,
  }

  return [identifier]
}
