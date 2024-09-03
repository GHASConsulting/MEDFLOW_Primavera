import knex from '../../../config/database'

function translateApiStatus(responseStatus): string {
  const sucessStatus = 'T'
  const errorStatus = 'E'

  const httpStatusMapping = {
    200: sucessStatus,
    201: sucessStatus,
    204: sucessStatus,
    400: errorStatus,
    401: errorStatus,
    403: errorStatus,
    404: errorStatus,
    500: errorStatus,
  }

  const ie_integrado: string = httpStatusMapping[responseStatus]

  return ie_integrado
}

async function executeProcedure_GHAS_ATEND_PACIENTE_P(
  id_integracao: number,
  responseStatus: number,
  responseData: any,
): Promise<void> {
  try {
    const ie_integrado = translateApiStatus(responseStatus)
    const ds_log = JSON.stringify(responseData)

    await knex.raw(`
      BEGIN
        GHAS_ATEND_PACIENTE_P(${id_integracao}, '${ie_integrado}', '${ds_log}');
      END;
    `)
  } catch (error) {
    console.error(error)
  }
}

export { executeProcedure_GHAS_ATEND_PACIENTE_P }
