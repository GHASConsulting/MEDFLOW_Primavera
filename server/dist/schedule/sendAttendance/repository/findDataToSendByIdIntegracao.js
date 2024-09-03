"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.findDataToSendByIdIntegracao = findDataToSendByIdIntegracao;
const database_1 = __importDefault(require("../../../config/database"));
async function findDataToSendByIdIntegracao(idIntegracao) {
    const [dataToSend] = await database_1.default
        .select('*')
        .from('GHAS_ATEND_PACIENTE_T')
        .where({ ID_INTEGRACAO: idIntegracao })
        .limit(1);
    return dataToSend;
}
