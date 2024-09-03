import {
  IEncounter,
  ILocation,
  IOrganization,
  IPatient,
  IPractitioner,
  IPractitionerRole,
} from '../../types/hl7object.types'
import { IAttendancePatient } from '../../types/selectTableAttendancePatient.types'

import { buildIdentifiers } from './buildIdentifiers'
import { buildOrganization } from './buildOrganization'
import { buildPractitioner } from './buildPractitioner'
import { buildPatient } from './buildPatient'
import { buildLocation } from './buildLocation'
import { buildClass } from './buildClass'
import { buildObservation } from './buildObservation'
import { buildPractitionerRole } from './buildPractitionerRole'

/** @description Build attendance object to send to Medflow API. Receiving the row of table "GHAS_ATEND_PACIENTE_T" and return a HL7 Object */
async function buildHl7AttendanceObject(
  dataToSendAttendance: IAttendancePatient,
): Promise<IEncounter> {
  try {
    const organizationName: string = dataToSendAttendance.NM_ESTABELECIMENTO
    const locationName: string = dataToSendAttendance.DS_SETOR_ATENDIMENTO
    const patientName: string = dataToSendAttendance.NM_PACIENTE
    const vitalSignList: number[] = [
      dataToSendAttendance.QT_TEMP,
      dataToSendAttendance.QT_PA_SISTOLICA,
      dataToSendAttendance.QT_PA_DIASISTOLICA,
      dataToSendAttendance.QT_SATURACAO_O2,
      dataToSendAttendance.QT_GLICEMIA_CAPILAR,
      dataToSendAttendance.QT_PESO,
      dataToSendAttendance.QT_ALTURA_CM,
      dataToSendAttendance.QT_CIRCUNF_PANTURRILHA,
      dataToSendAttendance.QT_CIRCUNF_BRACO,
      dataToSendAttendance.QT_CIRCUNF_CINTURA,
      // dataToSendAttendance.QT_IMC,
    ]
    const practitionerName: string = dataToSendAttendance.NM_MEDICO
    const practitionerRoleName: string = dataToSendAttendance.DS_ESPECIALIDADE

    const objectToReturn: IEncounter = {
      resourceType: 'Encounter',
      identifier: buildIdentifiers(dataToSendAttendance),
      contained: [],
      status: 'in-progress',
      class: buildClass(dataToSendAttendance),
    }

    if (organizationName) {
      const organization: IOrganization =
        buildOrganization(dataToSendAttendance)
      objectToReturn.contained.push(organization)
      objectToReturn.serviceProvider = {
        reference: `#${organization.id}`,
      }
    }

    if (locationName) {
      const location: ILocation = buildLocation(dataToSendAttendance)
      objectToReturn.contained.push(location)
      objectToReturn.location = [
        {
          status: 'active',
          location: {
            reference: `#${location.id}`,
          },
        },
      ]
    }

    if (patientName) {
      const patient: IPatient = buildPatient(dataToSendAttendance)
      objectToReturn.contained.push(patient)
      objectToReturn.subject = {
        reference: `#${patient.id}`,
      }

      objectToReturn.reasonReference = []
      for (let i = 0; i <= vitalSignList.length; i++) {
        if (vitalSignList[i]) {
          const observation = buildObservation(
            vitalSignList[i],
            i,
            patient.id,
            dataToSendAttendance,
          )
          objectToReturn.contained?.push(observation)
          objectToReturn.reasonReference.push({
            reference: `#${observation.id}`,
          })
        }
      }
    }

    if (practitionerName) {
      const practitioner: IPractitioner =
        buildPractitioner(dataToSendAttendance)
      objectToReturn.contained.push(practitioner)
      objectToReturn.participant = []

      if (practitionerRoleName) {
        const practitionerRole: IPractitionerRole = buildPractitionerRole(
          practitioner.id,
          practitionerRoleName,
          `${dataToSendAttendance.CD_ESPECIALIDADE}`,
        )
        objectToReturn.contained?.push(practitionerRole)
        objectToReturn.participant.push({
          individual: {
            reference: `#${practitionerRole.id}`,
          },
        })
      } else {
        objectToReturn.participant.push({
          individual: {
            reference: `#${practitioner.id}`,
          },
        })
      }
    }

    return objectToReturn
  } catch (error) {
    throw new Error(error)
  }
}

export { buildHl7AttendanceObject }
