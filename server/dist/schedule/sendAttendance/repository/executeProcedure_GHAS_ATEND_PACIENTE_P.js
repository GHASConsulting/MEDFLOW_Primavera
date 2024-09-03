"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.executeProcedure_GHAS_ATEND_PACIENTE_P = executeProcedure_GHAS_ATEND_PACIENTE_P;
const database_1 = __importDefault(require("../../../config/database"));
function translateApiStatus(responseStatus) {
    const sucessStatus = 'T';
    const errorStatus = 'E';
    const httpStatusMapping = {
        200: sucessStatus,
        201: sucessStatus,
        204: sucessStatus,
        400: errorStatus,
        401: errorStatus,
        403: errorStatus,
        404: errorStatus,
        500: errorStatus,
    };
    const ie_integrado = httpStatusMapping[responseStatus];
    return ie_integrado;
}
async function executeProcedure_GHAS_ATEND_PACIENTE_P(id_integracao, responseStatus, responseData) {
    try {
        const ie_integrado = translateApiStatus(responseStatus);
        const ds_log = JSON.stringify(responseData);
        await database_1.default.raw(`
      BEGIN
        GHAS_ATEND_PACIENTE_P(${id_integracao}, '${ie_integrado}', '${ds_log}');
      END;
    `);
    }
    catch (error) {
        console.error(error);
    }
}
