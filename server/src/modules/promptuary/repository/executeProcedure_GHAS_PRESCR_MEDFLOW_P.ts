import knex from '../../../config/database'

// É necessário verificar a ordem dos elementos que são passados para a procedure.
async function executeProcedure_GHAS_PRESCR_MEDFLOW_P(data): Promise<void> {
  try {
    let query = `
      BEGIN
        GHAS_PRESCR_MEDFLOW_P(
            ${data.nr_atendimento_p},
            '${data.cd_medico_p}',
            '${data.nr_prescr_medflow}', 
            '${data.ie_tipo_p}',
            '${data.ie_liberado_p}',
            ${data.cd_procedimento_p},
            ${data.qt_procedimento_p},
            '${data.ie_lado_p}',
            '${data.cd_intervalo_p}',
            '${data.ie_se_necessario_p}',
            '${data.ie_acm_p}',
            '${data.ds_horarios_p}',
            '${data.ie_anestesia_p}',
            '${data.ds_justificativa_proc_p}',
            ${data.cd_material_p},
            '${data.ds_material_p}',
            '${data.ds_ind_material_p}',
            '${data.ie_via_aplicacao_p}',
            ${data.qt_dose_p},
            '${data.cd_unidade_medida_dose_p}',
            '${data.cd_especialidade_p}',
            ${data.cd_especialidade_dest_p},
            '${data.ds_encaminhamento_p}',
            '${data.ds_orientacao_p}',
            '${data.queixa_p}',
            '${data.hda_p}',
            '${data.diagnostico_p}',
            '${data.hpp_p}',
            '${data.alergias_p}',
            '${data.medicacoes_de_uso_comum_p}',
            '${data.habitos_p}',
            '${data.antecedentes_pessoais_p}',
            '${data.hfam_p}',
            '${data.sinais_vitais_p}',
            '${data.conduta_medica_p}',
            '${data.exame_fisico_p}',
            '${data.exame_imagem_p}',
            '${data.exame_lab_p}'
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

export { executeProcedure_GHAS_PRESCR_MEDFLOW_P }
