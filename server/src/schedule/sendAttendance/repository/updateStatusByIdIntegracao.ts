import knex from '../../../config/database'

/** @description Updates the status of the row by idIntegracao */
async function updateStatusByIdIntegracao(
  idIntegracao: number,
  newStatus: string,
): Promise<void> {
  await knex('GHAS_CID_T')
    .where({ ID_INTEGRACAO: idIntegracao })
    .update({ IE_INTEGRADO: newStatus })
}

export { updateStatusByIdIntegracao }
