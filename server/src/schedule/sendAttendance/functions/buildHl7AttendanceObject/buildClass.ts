import { ICoding } from '../../types/hl7object.types'
import { IAttendancePatient } from '../../types/selectTableAttendancePatient.types'

interface AttendanceTypeMapping {
  [key: number]: {
    code: string
    display: string
  }
}

const attendanceTypeMapping: AttendanceTypeMapping = {
  1: { code: 'IMP', display: 'inpatient encounter' },
  3: { code: 'EMER', display: 'emergency' },
  7: { code: '', display: '' },
  8: { code: 'AMB', display: 'ambulatory' },
  6: { code: '', display: '' },
  21: { code: 'VR', display: 'virtual' },
  15: { code: '', display: '' },
  25: { code: '', display: '' },
  30: { code: '', display: '' },
  10: { code: '', display: '' },
  11: { code: '', display: '' },
  12: { code: '', display: '' },
  14: { code: '', display: '' },
}

/** @description Build the the class for HL7 Object */
export function buildClass(dataToSendAttendance: IAttendancePatient): ICoding {
  const typeAttendanceCode = dataToSendAttendance.IE_TIPO_ATENDIMENTO

  const code: string = attendanceTypeMapping[typeAttendanceCode].code
  const display: string = attendanceTypeMapping[typeAttendanceCode].display

  const newClass: ICoding = {
    system: 'http://terminology.hl7.org/CodeSystem/v3-ActCode',
    code,
    display,
  }

  return newClass
}
