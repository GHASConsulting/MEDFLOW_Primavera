import { randomUUID } from 'node:crypto'
import { IPractitioner } from '../../types/hl7object.types'
import { IAttendancePatient } from '../../types/selectTableAttendancePatient.types'

const genderMapping = {
  M: 'male',
  F: 'female',
}

/** @description Build the Contained Practitioner Object for HL7 Object */
export function buildPractitioner(
  dataToSendAttendance: IAttendancePatient,
): IPractitioner {
  dataToSendAttendance.IE_SEXO_MED =
    genderMapping[dataToSendAttendance.IE_SEXO_MED] || 'unknown'

  const practitioner: IPractitioner = {
    resourceType: 'Practitioner',
    id: `practitioner-${randomUUID()}`,
    identifier: [
      {
        use: 'usual',
        value: `${dataToSendAttendance.NR_CRM}`,
      },
    ],
    name: [
      {
        use: 'usual',
        text: dataToSendAttendance.NM_MEDICO,
      },
    ],
    gender: dataToSendAttendance.IE_SEXO_MED,
  }

  return practitioner
}
