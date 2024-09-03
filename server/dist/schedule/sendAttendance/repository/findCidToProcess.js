"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.findCidToProcess = findCidToProcess;
const database_1 = __importDefault(require("../../../config/database"));
async function findCidToProcess() {
    const [hasCidToProcess] = await database_1.default
        .select('*')
        .from('GHAS_LOG_MEDFLOW_T')
        .where({ IE_TIPO_P: 'CPOE' })
        .orderBy('ID_INTEGRACAO')
        .limit(1);
    return hasCidToProcess;
}
