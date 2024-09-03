import { randomUUID } from 'node:crypto'
import { formatDate } from '../../../../utils/formatDate_yyyy-mm-dd'
import { IPatient } from '../../types/hl7object.types'
import { IAttendancePatient } from '../../types/selectTableAttendancePatient.types'

const genderMapping = {
  M: 'male',
  F: 'female',
}

/** @description Build the Contained Patient Object for HL7 Object */
export function buildPatient(
  dataToSendAttendance: IAttendancePatient,
): IPatient {
  dataToSendAttendance.IE_SEXO_PAC =
    genderMapping[dataToSendAttendance.IE_SEXO_PAC] || 'unknown'

  const patient: IPatient = {
    resourceType: 'Patient',
    id: `patient-${randomUUID()}`,
    name: [
      {
        use: 'official',
        text: dataToSendAttendance.NM_PACIENTE,
      },
    ],
    gender: dataToSendAttendance.IE_SEXO_PAC,
    birthDate: formatDate(dataToSendAttendance.DT_NASCIMENTO),
  }

  return patient
}
