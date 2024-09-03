"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.findAnamnese = findAnamnese;
function findAnamnese(queixa, hda, diagnostico, hpp, alergias, medicacoes_de_uso_comum, habitos, antecedentes_pessoais, hfam, sinais_vitais, exame_fisico, exame_imagem, exame_lab) {
    let anamneseResumo;
    let queixa_p = queixa;
    let hda_p = hda;
    let diagnostico_p = diagnostico;
    let hpp_p = hpp;
    let alergias_p = alergias;
    let medicacoes_de_uso_comum_p = medicacoes_de_uso_comum;
    let habitos_p = habitos;
    let antecedentes_pessoais_p = antecedentes_pessoais;
    let hfam_p = hfam;
    let sinais_vitais_p = sinais_vitais;
    let exame_fisico_p = exame_fisico;
    let exame_imagem_p = exame_imagem;
    let exame_lab_p = exame_lab;
    if (queixa_p) {
        anamneseResumo.push(queixa_p);
    }
    else {
        null;
    }
    if (hda_p) {
        anamneseResumo.push(hda_p);
    }
    else {
        null;
    }
    if (diagnostico_p) {
        anamneseResumo.push(diagnostico_p);
    }
    else {
        null;
    }
    if (hpp_p) {
        anamneseResumo.push(hpp_p);
    }
    else {
        null;
    }
    if (alergias_p) {
        anamneseResumo.push(alergias_p);
    }
    else {
        null;
    }
    if (medicacoes_de_uso_comum_p) {
        anamneseResumo.push(medicacoes_de_uso_comum_p);
    }
    else {
        null;
    }
    if (habitos_p) {
        anamneseResumo.push(habitos_p);
    }
    else {
        null;
    }
    if (antecedentes_pessoais_p) {
        anamneseResumo.push(antecedentes_pessoais_p);
    }
    else {
        null;
    }
    if (hfam_p) {
        anamneseResumo.push(hfam_p);
    }
    else {
        null;
    }
    if (sinais_vitais_p) {
        anamneseResumo.push(sinais_vitais_p);
    }
    else {
        null;
    }
    if (exame_fisico_p) {
        anamneseResumo.push(exame_fisico_p);
    }
    else {
        null;
    }
    if (exame_imagem_p) {
        anamneseResumo.push(exame_imagem_p);
    }
    else {
        null;
    }
    if (exame_lab_p) {
        anamneseResumo.push(exame_lab_p);
    }
    else {
        null;
    }
    return anamneseResumo;
}
