"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateStatusByIdIntegracao = updateStatusByIdIntegracao;
const database_1 = __importDefault(require("../../../config/database"));
/** @description Updates the status of the row by idIntegracao */
async function updateStatusByIdIntegracao(idIntegracao, newStatus) {
    await (0, database_1.default)('GHAS_CID_T')
        .where({ ID_INTEGRACAO: idIntegracao })
        .update({ IE_INTEGRADO: newStatus });
}
