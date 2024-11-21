"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.executeProcedure_MEDFLOW_GHAS_SINAIS_VITAIS_P = executeProcedure_MEDFLOW_GHAS_SINAIS_VITAIS_P;
const database_1 = __importDefault(require("../../../config/database"));
// É necessário verificar a ordem dos elementos que são passados para a procedure.
async function executeProcedure_MEDFLOW_GHAS_SINAIS_VITAIS_P(data) {
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
            '${data.ds_plandefinition_p}',
            '${data.ds_senha_p}'
        );
      END;
    `;
        query = query
            .replaceAll(/'null'|null/g, 'NULL')
            .replaceAll(`'false'`, `'N'`)
            .replaceAll(`'true'`, `'S'`);
        console.log(query);
        await database_1.default.raw(query);
    }
    catch (error) {
        console.error(error);
    }
}
