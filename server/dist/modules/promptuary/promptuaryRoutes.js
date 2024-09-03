"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.promptuary = promptuary;
const GhasPrescrMedflowPParams_1 = require("./model/GhasPrescrMedflowPParams");
const GhasSinaisVitaisMedflowParams_1 = require("./model/GhasSinaisVitaisMedflowParams");
const findAttendance_1 = require("./functions/findAttendance");
const findDoctor_1 = require("./functions/findDoctor");
const executeProcedure_GHAS_PRESCR_MEDFLOW_P_1 = require("./repository/executeProcedure_GHAS_PRESCR_MEDFLOW_P");
const executeProcedure_MEDFLOW_GHAS_SINAIS_VITAIS_P_1 = require("./repository/executeProcedure_MEDFLOW_GHAS_SINAIS_VITAIS_P");
const identifyRecordType_1 = require("./functions/identifyRecordType");
const findProcedureCode_1 = require("./functions/findProcedureCode");
const findQuantityProcedure_1 = require("./functions/findQuantityProcedure");
const findSide_1 = require("./functions/findSide");
const findIntervalCode_1 = require("./functions/findIntervalCode");
const findIsNecessary_1 = require("./functions/findIsNecessary");
const findMaterialCode_1 = require("./functions/findMaterialCode");
const findApplicationVia_1 = require("./functions/findApplicationVia");
const findQuantityDose_1 = require("./functions/findQuantityDose");
const findMedidaUnityCode_1 = require("./functions/findMedidaUnityCode");
const findEspecialidadeMedica_1 = require("./functions/findEspecialidadeMedica");
const findEncaminhamento_1 = require("./functions/findEncaminhamento");
const findOrientacao_1 = require("./functions/findOrientacao");
const makeRequest_1 = require("../../utils/makeRequest");
const findMaterialDescription_1 = require("./functions/findMaterialDescription");
const findJustification_1 = require("./functions/findJustification");
const findMaterialInd_1 = require("./functions/findMaterialInd");
const findQueixa_1 = require("./functions/findQueixa");
const findHda_1 = require("./functions/findHda");
const findDiagnostico_1 = require("./functions/findDiagnostico");
const findHpp_1 = require("./functions/findHpp");
const findAlergias_1 = require("./functions/findAlergias");
const findMedicacoes_de_uso_comum_1 = require("./functions/findMedicacoes_de_uso_comum");
const findHabitos_1 = require("./functions/findHabitos");
const findAntecedentes_pessoais_1 = require("./functions/findAntecedentes_pessoais");
const findHfam_1 = require("./functions/findHfam");
const findSinais_vitais_1 = require("./functions/findSinais_vitais");
const findConduta_medica_1 = require("./functions/findConduta_medica");
const findExameFisico_1 = require("./functions/findExameFisico");
const findExameImagem_1 = require("./functions/findExameImagem");
const findExameLab_1 = require("./functions/findExameLab");
const validResourceTypes = ['MedicationRequest', 'ServiceRequest', 'CarePlan', 'QuestionnaireResponse', 'PlanDefinition', 'Practitioner'];
/*
function generateToken() {
  const cliente_token:any= process.env.CLIENT_TOKEN
  const payload = {
    iss: process.env.CLIENT_ID,
    sub: 'daktus',
    name: 'Daktus',
    exp: Math.floor(Date.now() / 1000) + 20 * 60,
  }

  return jwt.sign(payload, cliente_token, { algorithm: 'HS256' })
}
*/
async function promptuary(app) {
    app.post('/webhook/endpoint/path/', async (request, reply) => {
        console.log('Chegou Requisição Medflow');
        const body = request.body;
        const toGetBundleId = body.data.bundle_id;
        const toGetStatus = body.data.status;
        const toGetTipoBundle = body.data.codigo;
        const protocolOnMediflowObjectRequest = {
            method: 'POST',
            url: 'https://daktus-cdss-gateway-fb3207ecf9d6.herokuapp.com/api/v1/tasy/daktus/bundle_viewer',
            headers: {
                'Content-Type': 'application/json',
            },
            data: { "bundle_id": toGetBundleId, "company": "primavera" }
        };
        const medflowBundle = (await (0, makeRequest_1.makeRequest)(protocolOnMediflowObjectRequest)).data;
        const protocolOnMediflowObjectRequestProntuario = {
            method: 'POST',
            url: 'https://daktus-cdss-gateway-fb3207ecf9d6.herokuapp.com/api/v2/tasy/daktus/medical_record_viewer',
            headers: {
                'Content-Type': 'application/json',
            },
            data: { "bundle_id": toGetBundleId }
        };
        const medflowBundleProntuario = (await (0, makeRequest_1.makeRequest)(protocolOnMediflowObjectRequestProntuario)).data;
        const numeroProntuario = medflowBundleProntuario.medical_record_id;
        console.log('Status Bundle');
        console.log(toGetStatus);
        console.log('Tipo de bundle');
        console.log(toGetTipoBundle);
        console.log('Bundle Medflow:');
        console.log(JSON.stringify(medflowBundle, null, 2));
        const resourcesToProcess = medflowBundle.result.entry.filter((item) => validResourceTypes.includes(item.resource.resourceType));
        let index = 0;
        const doctorData = (0, findDoctor_1.findDoctor)(medflowBundle, resourcesToProcess);
        const attendanceData = (0, findAttendance_1.findAttendance)(medflowBundle);
        if (toGetStatus == 'FINALIZADO' && toGetTipoBundle == 'primavera_triagem') {
            /* sinais vitais proc */
            const sinaisVitaisTriagem = (0, findSinais_vitais_1.findSinais_vitais_triagem)(medflowBundle);
            const prdSinaisVitaisParams = new GhasSinaisVitaisMedflowParams_1.GhasSinaisVitaisMedflowParams;
            prdSinaisVitaisParams.nr_atendimento_p = attendanceData[0].resource.identifier[0].value;
            prdSinaisVitaisParams.cd_medico_p = doctorData;
            prdSinaisVitaisParams.nr_prescr_medflow_p = medflowBundle.result.id;
            prdSinaisVitaisParams.vl_temperatura_p = sinaisVitaisTriagem.temperatura;
            prdSinaisVitaisParams.vl_peso_p = null;
            prdSinaisVitaisParams.vl_altura_p = null;
            prdSinaisVitaisParams.vl_freq_respiratoria_p = sinaisVitaisTriagem.fr;
            prdSinaisVitaisParams.vl_freq_cardiaca_p = sinaisVitaisTriagem.fc;
            prdSinaisVitaisParams.vl_pressao_sis_p = sinaisVitaisTriagem.pas;
            prdSinaisVitaisParams.vl_pressao_dia_p = sinaisVitaisTriagem.pad;
            prdSinaisVitaisParams.vl_oximetria_p = sinaisVitaisTriagem.sato2;
            prdSinaisVitaisParams.vl_glicemia_p = null;
            prdSinaisVitaisParams.vl_circ_cabeca_p = null;
            prdSinaisVitaisParams.vl_circ_abdominal_p = null;
            prdSinaisVitaisParams.nr_prontuario_p = numeroProntuario;
            prdSinaisVitaisParams.ds_plandefinition_p = sinaisVitaisTriagem.descResumoTriagem;
            await (0, executeProcedure_MEDFLOW_GHAS_SINAIS_VITAIS_P_1.executeProcedure_MEDFLOW_GHAS_SINAIS_VITAIS_P)(prdSinaisVitaisParams);
            console.log('(INF) Concluiu a execução Triagem!');
        }
        else if ((toGetStatus == 'FINALIZADO' || toGetStatus == 'PAUSADO') && toGetTipoBundle != 'primavera_triagem') {
            const prdParams = new GhasPrescrMedflowPParams_1.GhasPrescrMedflowPParams();
            let anamneseRes;
            for (const resource of resourcesToProcess) {
                const recordType = (0, identifyRecordType_1.identifyRecordType)(resource);
                const queixa = (0, findQueixa_1.findQueixa)(recordType, resource);
                const hda = (0, findHda_1.findHda)(recordType, resource);
                const diagnostico = (0, findDiagnostico_1.findDiagnostico)(recordType, resource);
                const hpp = (0, findHpp_1.findHpp)(recordType, resource);
                const alergias = (0, findAlergias_1.findAlergias)(recordType, resource);
                const medicacoes_de_uso_comum = (0, findMedicacoes_de_uso_comum_1.findMedicacoes_de_uso_comum)(recordType, resource);
                const habitos = (0, findHabitos_1.findHabitos)(recordType, resource);
                const antecedentes_pessoais = (0, findAntecedentes_pessoais_1.findAntecedentes_pessoais)(recordType, resource);
                const hfam = (0, findHfam_1.findHfam)(recordType, resource);
                const sinais_vitais = (0, findSinais_vitais_1.findSinais_vitais)(recordType, resource);
                const exame_fisico = (0, findExameFisico_1.findExameFisico)(recordType, resource);
                const exame_imagem = (0, findExameImagem_1.findExameImagem)(recordType, resource);
                const exame_lab = (0, findExameLab_1.findExameLab)(recordType, resource);
                anamneseRes += `${queixa} ${hda} ${diagnostico} ${hpp} ${alergias} ${medicacoes_de_uso_comum} ${habitos}  ${antecedentes_pessoais} ${hfam} 
              ${sinais_vitais} 
              ${exame_fisico} 
              ${exame_imagem} 
              ${exame_lab}`;
                // if (queixa){anamneseResumo.push(queixa)}else{null}
                // if (hda){anamneseResumo.push(hda)}else{null}
                // if (diagnostico){anamneseResumo.push(diagnostico)}else{null}
                // if (hpp){anamneseResumo.push(hpp)}else{null}
                // if (alergias){anamneseResumo.push(alergias)}else{null}
                // if (medicacoes_de_uso_comum){anamneseResumo.push(medicacoes_de_uso_comum)}else{null}
                // if (habitos){anamneseResumo.push(habitos)}else{null}
                // if (antecedentes_pessoais){anamneseResumo.push(antecedentes_pessoais)}else{null}
                // if (hfam){anamneseResumo.push(hfam)}else{null}
                // if (sinais_vitais){anamneseResumo.push(sinais_vitais)}else{null}
                // if (exame_fisico){anamneseResumo.push(exame_fisico)}else{null}
                // if (exame_imagem){anamneseResumo.push(exame_imagem)}else{null}
                // if (exame_lab){anamneseResumo.push(exame_lab)}else{null}
            }
            prdParams.nr_atendimento_p = attendanceData[0].resource.identifier[0].value;
            prdParams.cd_medico_p = doctorData;
            prdParams.nr_prescr_medflow = medflowBundle.result.id;
            prdParams.ie_tipo_p = 'A';
            if (index === resourcesToProcess.length - 1) {
                prdParams.ie_liberado_p = 'S';
            }
            if (anamneseRes.length > 0) {
                prdParams.ds_orientacao_p = anamneseRes.toString().replaceAll('null', '').replaceAll(' ', '').replaceAll('undefinednull', '').replaceAll('undefined', ''); //array.filter((item :any) => item.linkId.substring(0,3) ===  'hpp')
            }
            else {
                null;
            }
            await (0, executeProcedure_GHAS_PRESCR_MEDFLOW_P_1.executeProcedure_GHAS_PRESCR_MEDFLOW_P)(prdParams);
            index++;
            console.log('(INF) Concluiu a execução Anamnese!');
            if (toGetStatus == 'FINALIZADO') {
                for (const resource of resourcesToProcess) {
                    const recordType = (0, identifyRecordType_1.identifyRecordType)(resource);
                    const procedureCode = (0, findProcedureCode_1.findProcedureCode)(resource, recordType);
                    const quantityProcedure = (0, findQuantityProcedure_1.findQuantityProcedure)(resource);
                    const side = (0, findSide_1.findSide)(resource);
                    const intervalCode = (0, findIntervalCode_1.findIntervalCode)(resource);
                    const isNecessary = (0, findIsNecessary_1.findIsNecessary)(resource);
                    const justification = (0, findJustification_1.findJustification)(resource);
                    const materialCode = (0, findMaterialCode_1.findMaterialCode)(resource);
                    const materialDescription = (0, findMaterialDescription_1.findMaterialDescription)(resource);
                    const materialInd = (0, findMaterialInd_1.findMaterialInd)(resource);
                    const applicationVia = (0, findApplicationVia_1.findApplicationVia)(resource);
                    const quantityDose = (0, findQuantityDose_1.findQuantityDose)(resource);
                    const unityCode = (0, findMedidaUnityCode_1.findMedidaUnityCode)(resource);
                    const especialidadeCode = (0, findEspecialidadeMedica_1.findEspecialidadeMedica)(recordType, resource);
                    const encaminhamentoText = (0, findEncaminhamento_1.findEncaminhamento)(recordType, resource);
                    const orientacao = (0, findOrientacao_1.findOrientacao)(resource);
                    //const queixa = findQueixa(recordType, resource)
                    //const hda = findHda(recordType, resource)
                    //const diagnostico = findDiagnostico(recordType, resource)
                    //const hpp = findHpp(recordType, resource)
                    //const alergias = findAlergias(recordType, resource)
                    //const medicacoes_de_uso_comum = findMedicacoes_de_uso_comum(recordType, resource)
                    //const habitos = findHabitos(recordType, resource)
                    //const antecedentes_pessoais = findAntecedentes_pessoais(recordType, resource)
                    //const hfam = findHfam(recordType, resource)
                    //const sinais_vitais = findSinais_vitais(recordType, resource)
                    const conduta_medica = (0, findConduta_medica_1.findConduta_medica)(recordType, resource);
                    //const exame_fisico = findExameFisico(recordType, resource)
                    //const exame_imagem = findExameImagem(recordType, resource)
                    //const exame_lab = findExameLab(recordType, resource)
                    const prdParams = new GhasPrescrMedflowPParams_1.GhasPrescrMedflowPParams();
                    prdParams.nr_atendimento_p = attendanceData[0].resource.identifier[0].value;
                    prdParams.cd_medico_p = doctorData;
                    prdParams.nr_prescr_medflow = medflowBundle.result.id;
                    prdParams.ie_tipo_p = recordType;
                    if (index === resourcesToProcess.length - 1) {
                        prdParams.ie_liberado_p = 'S';
                    }
                    prdParams.cd_procedimento_p = procedureCode;
                    prdParams.qt_procedimento_p = quantityProcedure;
                    prdParams.ie_lado_p = side;
                    prdParams.cd_intervalo_p = intervalCode;
                    prdParams.ie_acm_p = 'N';
                    prdParams.ds_horarios_p = '';
                    prdParams.ie_se_necessario_p = isNecessary;
                    prdParams.ie_anestesia_p = null;
                    prdParams.ds_justificativa_proc_p = justification;
                    prdParams.cd_material_p = materialCode;
                    prdParams.ds_material_p = materialDescription;
                    prdParams.ds_ind_material_p = materialInd;
                    prdParams.ie_via_aplicacao_p = applicationVia;
                    prdParams.qt_dose_p = quantityDose;
                    prdParams.cd_unidade_medida_dose_p = unityCode;
                    prdParams.cd_especialidade_p = null;
                    prdParams.cd_especialidade_dest_p = especialidadeCode;
                    prdParams.ds_encaminhamento_p = encaminhamentoText;
                    prdParams.ds_orientacao_p = orientacao;
                    //prdParams.queixa_p = queixa
                    //prdParams.hda_p = hda
                    //prdParams.diagnostico_p = diagnostico
                    //prdParams.hpp_p = hpp
                    //prdParams.alergias_p = alergias
                    //prdParams.medicacoes_de_uso_comum_p = medicacoes_de_uso_comum
                    //prdParams.habitos_p = habitos
                    //prdParams.antecedentes_pessoais_p = antecedentes_pessoais
                    //prdParams.hfam_p = hfam
                    //prdParams.sinais_vitais_p = sinais_vitais
                    prdParams.conduta_medica_p = conduta_medica;
                    //prdParams.exame_fisico_p = exame_fisico
                    //prdParams.exame_imagem_p = exame_imagem
                    //prdParams.exame_lab_p = exame_lab
                    await (0, executeProcedure_GHAS_PRESCR_MEDFLOW_P_1.executeProcedure_GHAS_PRESCR_MEDFLOW_P)(prdParams);
                    console.log('(INF) Concluiu a execução Receituario!');
                    index++;
                }
            }
        }
        else {
            console.log('Em Atendimento.');
        }
        if (toGetStatus == 'PAUSADO') {
            for (const resource of resourcesToProcess) {
                //const attendanceData = findAttendance(medflowBundle)
                //const doctorData = findDoctor(medflowBundle, resource)
                const recordType = (0, identifyRecordType_1.identifyRecordType)(resource);
                const procedureCode = (0, findProcedureCode_1.findProcedureCode)(resource, recordType);
                const quantityProcedure = (0, findQuantityProcedure_1.findQuantityProcedure)(resource);
                const side = (0, findSide_1.findSide)(resource);
                const intervalCode = (0, findIntervalCode_1.findIntervalCode)(resource);
                const isNecessary = (0, findIsNecessary_1.findIsNecessary)(resource);
                const justification = (0, findJustification_1.findJustification)(resource);
                const materialCode = (0, findMaterialCode_1.findMaterialCode)(resource);
                const materialDescription = (0, findMaterialDescription_1.findMaterialDescription)(resource);
                const materialInd = (0, findMaterialInd_1.findMaterialInd)(resource);
                const applicationVia = (0, findApplicationVia_1.findApplicationVia)(resource);
                const quantityDose = (0, findQuantityDose_1.findQuantityDose)(resource);
                const unityCode = (0, findMedidaUnityCode_1.findMedidaUnityCode)(resource);
                const especialidadeCode = (0, findEspecialidadeMedica_1.findEspecialidadeMedica)(recordType, resource);
                const encaminhamentoText = (0, findEncaminhamento_1.findEncaminhamento)(recordType, resource);
                const orientacao = (0, findOrientacao_1.findOrientacao)(resource);
                const queixa = (0, findQueixa_1.findQueixa)(recordType, resource);
                const hda = (0, findHda_1.findHda)(recordType, resource);
                const diagnostico = (0, findDiagnostico_1.findDiagnostico)(recordType, resource);
                const hpp = (0, findHpp_1.findHpp)(recordType, resource);
                const alergias = (0, findAlergias_1.findAlergias)(recordType, resource);
                const medicacoes_de_uso_comum = (0, findMedicacoes_de_uso_comum_1.findMedicacoes_de_uso_comum)(recordType, resource);
                const habitos = (0, findHabitos_1.findHabitos)(recordType, resource);
                const antecedentes_pessoais = (0, findAntecedentes_pessoais_1.findAntecedentes_pessoais)(recordType, resource);
                const hfam = (0, findHfam_1.findHfam)(recordType, resource);
                const sinais_vitais = (0, findSinais_vitais_1.findSinais_vitais)(recordType, resource);
                const conduta_medica = (0, findConduta_medica_1.findConduta_medica)(recordType, resource);
                const exame_fisico = (0, findExameFisico_1.findExameFisico)(recordType, resource);
                const exame_imagem = (0, findExameImagem_1.findExameImagem)(recordType, resource);
                const exame_lab = (0, findExameLab_1.findExameLab)(recordType, resource);
                const prdParams = new GhasPrescrMedflowPParams_1.GhasPrescrMedflowPParams();
                prdParams.nr_atendimento_p = attendanceData[0].resource.identifier[0].value;
                prdParams.cd_medico_p = doctorData;
                prdParams.nr_prescr_medflow = medflowBundle.result.id;
                prdParams.ie_tipo_p = 'CPOE';
                if (index === resourcesToProcess.length - 1) {
                    prdParams.ie_liberado_p = 'S';
                }
                prdParams.cd_procedimento_p = procedureCode;
                prdParams.qt_procedimento_p = quantityProcedure;
                prdParams.ie_lado_p = side;
                prdParams.cd_intervalo_p = intervalCode;
                prdParams.ie_acm_p = 'N';
                prdParams.ds_horarios_p = '';
                prdParams.ie_se_necessario_p = isNecessary;
                prdParams.ie_anestesia_p = null;
                prdParams.ds_justificativa_proc_p = justification;
                prdParams.cd_material_p = materialCode;
                prdParams.ds_material_p = materialDescription;
                prdParams.ds_ind_material_p = materialInd;
                prdParams.ie_via_aplicacao_p = applicationVia;
                prdParams.qt_dose_p = quantityDose;
                prdParams.cd_unidade_medida_dose_p = unityCode;
                prdParams.cd_especialidade_p = null;
                prdParams.cd_especialidade_dest_p = especialidadeCode; // 6
                prdParams.ds_encaminhamento_p = encaminhamentoText;
                prdParams.ds_orientacao_p = orientacao;
                prdParams.queixa_p = queixa;
                prdParams.hda_p = hda;
                prdParams.diagnostico_p = diagnostico;
                prdParams.hpp_p = hpp;
                prdParams.alergias_p = alergias;
                prdParams.medicacoes_de_uso_comum_p = medicacoes_de_uso_comum;
                prdParams.habitos_p = habitos;
                prdParams.antecedentes_pessoais_p = antecedentes_pessoais;
                prdParams.hfam_p = hfam;
                prdParams.sinais_vitais_p = sinais_vitais;
                prdParams.conduta_medica_p = conduta_medica;
                prdParams.exame_fisico_p = exame_fisico;
                prdParams.exame_imagem_p = exame_imagem;
                prdParams.exame_lab_p = exame_lab;
                //console.log(JSON.stringify(prdParams))
                await (0, executeProcedure_GHAS_PRESCR_MEDFLOW_P_1.executeProcedure_GHAS_PRESCR_MEDFLOW_P)(prdParams);
                console.log('(INF) Concluiu a execução!');
                index++;
            }
            console.log('(INF) Concluiu a execução CPOE!');
        }
        else {
            console.log('Em Atendimento.');
        }
        return reply.status(201).send();
    });
}
