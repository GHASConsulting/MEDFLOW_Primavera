"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendAttendanceSchedule = sendAttendanceSchedule;
const findCidToProcess_1 = require("./repository/findCidToProcess");
const findDataToSendByIdIntegracao_1 = require("./repository/findDataToSendByIdIntegracao");
const executeProcedure_GHAS_ATEND_PACIENTE_P_1 = require("./repository/executeProcedure_GHAS_ATEND_PACIENTE_P");
const updateStatusByIdIntegracao_1 = require("./repository/updateStatusByIdIntegracao");
const makeRequest_1 = require("../../utils/makeRequest");
const buildHl7AttendanceObject_1 = require("./functions/buildHl7AttendanceObject/buildHl7AttendanceObject");
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
async function sendAttendanceSchedule() {
    try {
        const cidToProcess = await (0, findCidToProcess_1.findCidToProcess)();
        if (!cidToProcess) {
            console.log('\n \n-> Sem registros para processar!');
            return;
        }
        const cidOnMediflowObjectRequest = {
            method: 'GET',
            url: process.env.URL_VERIFY_CID,
            headers: {
                Authorization: `Bearer $`,
            },
            params: {
                cid10: cidToProcess.CD_CID, // 'v954'
            },
        };
        const cidOnMedflow = await (0, makeRequest_1.makeRequest)(cidOnMediflowObjectRequest);
        const protocolsToFindedCid = cidOnMedflow.data.results[0];
        console.log('\n \n-> Resposta da Verificação de Cid -> ', cidOnMedflow.data);
        if (!protocolsToFindedCid) {
            await (0, updateStatusByIdIntegracao_1.updateStatusByIdIntegracao)(cidToProcess.ID_INTEGRACAO, 'E');
            const responseData = { detail: 'Nenhum protocolo encontrado para o Cid.' };
            const responseStatus = 404;
            await (0, executeProcedure_GHAS_ATEND_PACIENTE_P_1.executeProcedure_GHAS_ATEND_PACIENTE_P)(cidToProcess.ID_INTEGRACAO, responseStatus, responseData);
            console.log('\n \n-> Sem protocolo para o Cid informado!');
            return;
        }
        await (0, updateStatusByIdIntegracao_1.updateStatusByIdIntegracao)(cidToProcess.ID_INTEGRACAO, 'T');
        const dataToSendAttendance = await (0, findDataToSendByIdIntegracao_1.findDataToSendByIdIntegracao)(cidToProcess.ID_INTEGRACAO);
        const attendanceToSend = await (0, buildHl7AttendanceObject_1.buildHl7AttendanceObject)(dataToSendAttendance);
        console.log('\n \n-> Atendimento em HL7 -> ', JSON.stringify(attendanceToSend));
        const protocolCode = cidOnMedflow.data.results[0].codigo;
        const sendAttendanceObjectRequest = {
            method: 'POST',
            url: `${process.env.URL_SEND_ATTENDANCE}${protocolCode}/abrir/`,
            headers: {
                Authorization: `Bearer $`,
            },
            data: attendanceToSend,
        };
        const returnedAttendance = await (0, makeRequest_1.makeRequest)(sendAttendanceObjectRequest);
        console.log(`\n \n-> Retorno do atendimento -> ${returnedAttendance.status}`, returnedAttendance.data);
        const responseData = JSON.stringify({
            detail: 'Sucesso',
        });
        const responseStatus = returnedAttendance.status;
        await (0, executeProcedure_GHAS_ATEND_PACIENTE_P_1.executeProcedure_GHAS_ATEND_PACIENTE_P)(cidToProcess.ID_INTEGRACAO, responseStatus, responseData);
        const urlToOpen = returnedAttendance.data.redirect_uri;
        const hostToSend = dataToSendAttendance.IP;
        const sendUrlToOpenObjectRequest = {
            method: 'POST',
            url: `http://${hostToSend}:3434/openScreen`,
            headers: {
                Authorization: `Bearer $`,
            },
            data: {
                urlToOpen,
            },
        };
        await (0, makeRequest_1.makeRequest)(sendUrlToOpenObjectRequest);
        console.log('\n \n## Fim da Operação ##');
        return;
    }
    catch (error) {
        console.log(error);
    }
}
