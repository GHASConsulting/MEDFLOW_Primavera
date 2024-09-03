import knex from '../../../config/database'

async function findDataToSendByIdIntegracao(idIntegracao): Promise<any> {
  const [dataToSend] = await knex
    .select('*')
    .from('GHAS_ATEND_PACIENTE_T')
    .where({ ID_INTEGRACAO: idIntegracao })
    .limit(1)

  return dataToSend
}

export { findDataToSendByIdIntegracao }
