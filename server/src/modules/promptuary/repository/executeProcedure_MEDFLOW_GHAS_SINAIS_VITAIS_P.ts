import knex from '../../../config/database'

// É necessário verificar a ordem dos elementos que são passados para a procedure.
async function executeProcedure_MEDFLOW_GHAS_SINAIS_VITAIS_P(data): Promise<void> {
  try {
    let query = `
      BEGIN
        GHAS_SINAIS_VITAIS_P(
            ${data.nr_atendimento_p},
            '${data.cd_medico_p}',
            '${data.nr_prescr_medflow_p}', 
            '${data.vl_temperatura_p}',
            '${data.vl_peso_p}',
            ${data.vl_altura_p},
            ${data.vl_freq_respiratoria_p},
            '${data.vl_freq_cardiaca_p}',
            '${data.vl_pressao_sis_p}',
            '${data.vl_pressao_dia_p}',
            '${data.vl_oximetria_p}',
            '${data.vl_glicemia_p}',
            '${data.vl_circ_cabeca_p}',
            '${data.vl_circ_abdominal_p}',
            '${data.nr_prontuario_p}',
            '${data.ds_plandefinition_p}'
        );
      END;
    `
    query = query
      .replaceAll(/'null'|null/g, 'NULL')
      .replaceAll(`'false'`, `'N'`)
      .replaceAll(`'true'`, `'S'`)

    console.log(query)
    await knex.raw(query)
  } catch (error) {
    console.error(error)
  }
}

export { executeProcedure_MEDFLOW_GHAS_SINAIS_VITAIS_P }
