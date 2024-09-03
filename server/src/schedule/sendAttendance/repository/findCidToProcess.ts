import knex from '../../../config/database'

async function findCidToProcess(): Promise<any> {
  const [hasCidToProcess] = await knex
    .select('*')
    .from('GHAS_LOG_MEDFLOW_T')
    .where({ IE_TIPO_P: 'CPOE' })
    .orderBy('ID_INTEGRACAO')
    .limit(1)

  return hasCidToProcess
}

export { findCidToProcess }
