import { AxiosRequestConfig } from 'axios'
import { FastifyInstance, FastifyReply } from 'fastify'
import {  GhasPrescrMedflowPParams  } from './model/GhasPrescrMedflowPParams'
import {  GhasSinaisVitaisMedflowParams  } from './model/GhasSinaisVitaisMedflowParams'
import { findAttendance } from './functions/findAttendance'
import { findDoctor } from './functions/findDoctor'
import { executeProcedure_GHAS_PRESCR_MEDFLOW_P } from './repository/executeProcedure_GHAS_PRESCR_MEDFLOW_P'
import {  executeProcedure_MEDFLOW_GHAS_SINAIS_VITAIS_P } from './repository/executeProcedure_MEDFLOW_GHAS_SINAIS_VITAIS_P'
import { identifyRecordType } from './functions/identifyRecordType'
import { findProcedureCode } from './functions/findProcedureCode'
import { findQuantityProcedure } from './functions/findQuantityProcedure'
import { findSide } from './functions/findSide'
import { findIntervalCode } from './functions/findIntervalCode'
import { findIsNecessary } from './functions/findIsNecessary'
import { findMaterialCode } from './functions/findMaterialCode'
import { findApplicationVia } from './functions/findApplicationVia'
import { findQuantityDose } from './functions/findQuantityDose'
import { findMedidaUnityCode } from './functions/findMedidaUnityCode'
import { findEspecialidadeMedica } from './functions/findEspecialidadeMedica'
import { findEncaminhamento } from './functions/findEncaminhamento'
import { findOrientacao } from './functions/findOrientacao'
import { makeRequest } from '../../utils/makeRequest'
import { findMaterialDescription } from './functions/findMaterialDescription'
import { findJustification } from './functions/findJustification'
import { findMaterialInd } from './functions/findMaterialInd'
import { findQueixa } from './functions/findQueixa' 
import { findHda } from './functions/findHda' 
import { findDiagnostico } from './functions/findDiagnostico' 
import { findHpp } from './functions/findHpp' 
import { findAlergias } from './functions/findAlergias' 
import { findMedicacoes_de_uso_comum } from './functions/findMedicacoes_de_uso_comum' 
import { findHabitos } from './functions/findHabitos' 
import { findAntecedentes_pessoais } from './functions/findAntecedentes_pessoais' 
import { findHfam } from './functions/findHfam' 
import { findSinais_vitais , findSinais_vitais_triagem } from './functions/findSinais_vitais' 
import { findConduta_medica } from './functions/findConduta_medica' 
import {  findExameFisico } from './functions/findExameFisico'
import  { findExameImagem } from './functions/findExameImagem'
import {  findExameLab  } from './functions/findExameLab'
import { findAnamnese } from './functions/findAnamnese'

const validResourceTypes = ['MedicationRequest', 'ServiceRequest', 'CarePlan','QuestionnaireResponse','PlanDefinition','Practitioner']
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

export async function promptuary(app: FastifyInstance) {
  app.post(
    '/webhook/endpoint/path/',
    async (request, reply): Promise<FastifyReply> => {
      console.log('Chegou Requisição Medflow')

      const body: any = request.body

      const toGetBundleId = body.data.bundle_id

      const toGetStatus = body.data.status

      const toGetTipoBundle = body.data.codigo 

      const protocolOnMediflowObjectRequest: AxiosRequestConfig = {
        method: 'POST',
        url: 'https://daktus-cdss-gateway-fb3207ecf9d6.herokuapp.com/api/v1/tasy/daktus/bundle_viewer',
        headers: {
          'Content-Type': 'application/json',
        },
        data:{"bundle_id": toGetBundleId, "company":"primavera"}
      }

      const medflowBundle: any = (
        await makeRequest(protocolOnMediflowObjectRequest)
      ).data

    
      const protocolOnMediflowObjectRequestProntuario: AxiosRequestConfig = {
        method: 'POST',
        url: 'https://daktus-cdss-gateway-fb3207ecf9d6.herokuapp.com/api/v2/tasy/daktus/medical_record_viewer',
        headers: {
          'Content-Type': 'application/json',
        },
        data:{"bundle_id": toGetBundleId}
      }


      const medflowBundleProntuario: any = (
        await makeRequest(protocolOnMediflowObjectRequestProntuario)
      ).data
      
      const numeroProntuario = medflowBundleProntuario.medical_record_id

      console.log('Status Bundle')
      console.log(toGetStatus)

      console.log('Tipo de bundle')
      console.log(toGetTipoBundle)

      console.log('Bundle Medflow:')
      console.log(JSON.stringify(medflowBundle,null,2))


      const resourcesToProcess = medflowBundle.result.entry.filter((item) =>
        validResourceTypes.includes(item.resource.resourceType),
      )

      let index = 0
      const doctorData = findDoctor(medflowBundle, resourcesToProcess)
      const attendanceData = findAttendance(medflowBundle)
      

      if(toGetStatus == 'FINALIZADO' && toGetTipoBundle == 'primavera_triagem'){
                 /* sinais vitais proc */
        const sinaisVitaisTriagem = findSinais_vitais_triagem(medflowBundle)
        const prdSinaisVitaisParams = new GhasSinaisVitaisMedflowParams
        prdSinaisVitaisParams.nr_atendimento_p = attendanceData[0].resource.identifier[0].value
        prdSinaisVitaisParams.cd_medico_p = doctorData
        prdSinaisVitaisParams.nr_prescr_medflow_p = medflowBundle.result.id
        prdSinaisVitaisParams.vl_temperatura_p = sinaisVitaisTriagem.temperatura
        prdSinaisVitaisParams.vl_peso_p = null
        prdSinaisVitaisParams.vl_altura_p = null
        prdSinaisVitaisParams.vl_freq_respiratoria_p = sinaisVitaisTriagem.fr
        prdSinaisVitaisParams.vl_freq_cardiaca_p = sinaisVitaisTriagem.fc
        prdSinaisVitaisParams.vl_pressao_sis_p = sinaisVitaisTriagem.pas
        prdSinaisVitaisParams.vl_pressao_dia_p = sinaisVitaisTriagem.pad
        prdSinaisVitaisParams.vl_oximetria_p = sinaisVitaisTriagem.sato2
        prdSinaisVitaisParams.vl_glicemia_p = null
        prdSinaisVitaisParams.vl_circ_cabeca_p = null
        prdSinaisVitaisParams.vl_circ_abdominal_p = null
        prdSinaisVitaisParams.nr_prontuario_p = numeroProntuario
        prdSinaisVitaisParams.ds_plandefinition_p = sinaisVitaisTriagem.descResumoTriagem

        await executeProcedure_MEDFLOW_GHAS_SINAIS_VITAIS_P(prdSinaisVitaisParams) 
        console.log('(INF) Concluiu a execução Triagem!')

      }else if ((toGetStatus == 'FINALIZADO' || toGetStatus == 'PAUSADO') && toGetTipoBundle != 'primavera_triagem') {
        const prdParams = new GhasPrescrMedflowPParams();
        let anamneseRes :any
        
        for (const resource of resourcesToProcess) {
            const recordType = identifyRecordType(resource);
            const queixa = findQueixa(recordType, resource);
            const hda = findHda(recordType, resource);
            const diagnostico = findDiagnostico(recordType, resource);
            const hpp = findHpp(recordType, resource);
            const alergias = findAlergias(recordType, resource);
            const medicacoes_de_uso_comum = findMedicacoes_de_uso_comum(recordType, resource);
            const habitos = findHabitos(recordType, resource);
            const antecedentes_pessoais = findAntecedentes_pessoais(recordType, resource);
            const hfam = findHfam(recordType, resource);
            const sinais_vitais = findSinais_vitais(recordType, resource);
            const exame_fisico = findExameFisico(recordType, resource);
            const exame_imagem = findExameImagem(recordType, resource);
            const exame_lab = findExameLab(recordType, resource);

            anamneseRes += `${queixa} ${hda} ${diagnostico} ${hpp} ${alergias} ${medicacoes_de_uso_comum} ${habitos}  ${antecedentes_pessoais} ${hfam} 
              ${sinais_vitais} 
              ${exame_fisico} 
              ${exame_imagem} 
              ${exame_lab}`

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
            prdParams.ds_orientacao_p = anamneseRes.toString().replaceAll('null','').replaceAll(' ','').replaceAll('undefinednull','').replaceAll('undefined',''); //array.filter((item :any) => item.linkId.substring(0,3) ===  'hpp')
        }
        else {
            null;
        }
        
        await executeProcedure_GHAS_PRESCR_MEDFLOW_P(prdParams) 
        index++;
        
        console.log('(INF) Concluiu a execução Anamnese!')
        if(toGetStatus == 'FINALIZADO' ){
          for (const resource of resourcesToProcess) {
            
            const recordType = identifyRecordType(resource)
            const procedureCode = findProcedureCode(resource, recordType)
            const quantityProcedure = findQuantityProcedure(resource)
            const side = findSide(resource)
            const intervalCode = findIntervalCode(resource)
            const isNecessary = findIsNecessary(resource)
            const justification = findJustification(resource)
            const materialCode = findMaterialCode(resource)
            const materialDescription = findMaterialDescription(resource)
            const materialInd = findMaterialInd(resource)
            const applicationVia = findApplicationVia(resource)
            const quantityDose = findQuantityDose(resource)
            const unityCode = findMedidaUnityCode(resource)
            const especialidadeCode = findEspecialidadeMedica(recordType, resource)
            const encaminhamentoText = findEncaminhamento(recordType, resource)
            const orientacao = findOrientacao(resource)
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
            const conduta_medica = findConduta_medica(recordType, resource)
            //const exame_fisico = findExameFisico(recordType, resource)
            //const exame_imagem = findExameImagem(recordType, resource)
            //const exame_lab = findExameLab(recordType, resource)
            const prdParams = new GhasPrescrMedflowPParams()
            
            prdParams.nr_atendimento_p = attendanceData[0].resource.identifier[0].value
  
            prdParams.cd_medico_p = doctorData
  
            prdParams.nr_prescr_medflow = medflowBundle.result.id
  
            prdParams.ie_tipo_p = recordType
            
            if (index === resourcesToProcess.length - 1) {
              prdParams.ie_liberado_p = 'S'
            }
  
            prdParams.cd_procedimento_p = procedureCode 
            prdParams.qt_procedimento_p = quantityProcedure
            prdParams.ie_lado_p = side
            prdParams.cd_intervalo_p = intervalCode
            prdParams.ie_acm_p = 'N'
            prdParams.ds_horarios_p = ''
            prdParams.ie_se_necessario_p = isNecessary
            prdParams.ie_anestesia_p = null
            prdParams.ds_justificativa_proc_p = justification
            prdParams.cd_material_p = materialCode
            prdParams.ds_material_p = materialDescription
            prdParams.ds_ind_material_p = materialInd
            prdParams.ie_via_aplicacao_p = applicationVia
            prdParams.qt_dose_p = quantityDose
            prdParams.cd_unidade_medida_dose_p = unityCode
            prdParams.cd_especialidade_p = null
            prdParams.cd_especialidade_dest_p = especialidadeCode
            prdParams.ds_encaminhamento_p = encaminhamentoText
            prdParams.ds_orientacao_p = orientacao
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
            prdParams.conduta_medica_p = conduta_medica
            //prdParams.exame_fisico_p = exame_fisico
            //prdParams.exame_imagem_p = exame_imagem
            //prdParams.exame_lab_p = exame_lab
  
            await executeProcedure_GHAS_PRESCR_MEDFLOW_P(prdParams)
  
            console.log('(INF) Concluiu a execução Receituario!')
            index++

          }
        }
          
      }else{
        console.log('Em Atendimento.')
      }
      if(toGetStatus == 'PAUSADO'){
        for (const resource of resourcesToProcess) {
          //const attendanceData = findAttendance(medflowBundle)
          //const doctorData = findDoctor(medflowBundle, resource)
          const recordType = identifyRecordType(resource)
          const procedureCode = findProcedureCode(resource, recordType)
          const quantityProcedure = findQuantityProcedure(resource)
          const side = findSide(resource)
          const intervalCode = findIntervalCode(resource)
          const isNecessary = findIsNecessary(resource)
          const justification = findJustification(resource)
          const materialCode = findMaterialCode(resource)
          const materialDescription = findMaterialDescription(resource)
          const materialInd = findMaterialInd(resource)
          const applicationVia = findApplicationVia(resource)
          const quantityDose = findQuantityDose(resource)
          const unityCode = findMedidaUnityCode(resource)
          const especialidadeCode = findEspecialidadeMedica(recordType, resource)
          const encaminhamentoText = findEncaminhamento(recordType, resource)
          const orientacao = findOrientacao(resource)
          const queixa = findQueixa(recordType, resource)
          const hda = findHda(recordType, resource)
          const diagnostico = findDiagnostico(recordType, resource)
          const hpp = findHpp(recordType, resource)
          const alergias = findAlergias(recordType, resource)
          const medicacoes_de_uso_comum = findMedicacoes_de_uso_comum(recordType, resource)
          const habitos = findHabitos(recordType, resource)
          const antecedentes_pessoais = findAntecedentes_pessoais(recordType, resource)
          const hfam = findHfam(recordType, resource)
          const sinais_vitais = findSinais_vitais(recordType, resource)
          const conduta_medica = findConduta_medica(recordType, resource)
          const exame_fisico = findExameFisico(recordType, resource)
          const exame_imagem = findExameImagem(recordType, resource)
          const exame_lab = findExameLab(recordType, resource)
          const prdParams = new GhasPrescrMedflowPParams()
          

          prdParams.nr_atendimento_p = attendanceData[0].resource.identifier[0].value

          prdParams.cd_medico_p = doctorData

          prdParams.nr_prescr_medflow = medflowBundle.result.id

          
          
          prdParams.ie_tipo_p = 'CPOE'
          


          if (index === resourcesToProcess.length - 1) {
            prdParams.ie_liberado_p = 'S'
          }

          prdParams.cd_procedimento_p = procedureCode 
          prdParams.qt_procedimento_p = quantityProcedure
          prdParams.ie_lado_p = side
          prdParams.cd_intervalo_p = intervalCode
          prdParams.ie_acm_p = 'N'
          prdParams.ds_horarios_p = ''
          prdParams.ie_se_necessario_p = isNecessary
          prdParams.ie_anestesia_p = null
          prdParams.ds_justificativa_proc_p = justification
          prdParams.cd_material_p = materialCode
          prdParams.ds_material_p = materialDescription
          prdParams.ds_ind_material_p = materialInd
          prdParams.ie_via_aplicacao_p = applicationVia
          prdParams.qt_dose_p = quantityDose
          prdParams.cd_unidade_medida_dose_p = unityCode
          prdParams.cd_especialidade_p = null
          prdParams.cd_especialidade_dest_p = especialidadeCode // 6
          prdParams.ds_encaminhamento_p = encaminhamentoText
          prdParams.ds_orientacao_p = orientacao
          prdParams.queixa_p = queixa
          prdParams.hda_p = hda
          prdParams.diagnostico_p = diagnostico
          prdParams.hpp_p = hpp
          prdParams.alergias_p = alergias
          prdParams.medicacoes_de_uso_comum_p = medicacoes_de_uso_comum
          prdParams.habitos_p = habitos
          prdParams.antecedentes_pessoais_p = antecedentes_pessoais
          prdParams.hfam_p = hfam
          prdParams.sinais_vitais_p = sinais_vitais
          prdParams.conduta_medica_p = conduta_medica
          prdParams.exame_fisico_p = exame_fisico
          prdParams.exame_imagem_p = exame_imagem
          prdParams.exame_lab_p = exame_lab

          //console.log(JSON.stringify(prdParams))

          await executeProcedure_GHAS_PRESCR_MEDFLOW_P(prdParams)

          
          console.log('(INF) Concluiu a execução!')
          index++


        }
        console.log('(INF) Concluiu a execução CPOE!')
      }else{
        console.log('Em Atendimento.')
      }

      return reply.status(201).send()
    },
  )
}
