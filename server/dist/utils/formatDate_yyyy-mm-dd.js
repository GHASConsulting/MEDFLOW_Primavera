"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.formatDate = formatDate;
function padZero(valor) {
    return valor.toString().padStart(2, '0');
}
/** @description Format date to format yyyy-mm-dd */
function formatDate(data) {
    const ano = data.getFullYear();
    const mes = padZero(data.getMonth() + 1);
    const dia = padZero(data.getDate());
    return `${ano}-${mes}-${dia}`;
}
