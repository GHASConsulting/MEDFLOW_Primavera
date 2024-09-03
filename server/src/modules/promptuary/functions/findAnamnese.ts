export function findAnamnese(queixa,hda,diagnostico,hpp,alergias,medicacoes_de_uso_comum,habitos,
    antecedentes_pessoais,
    hfam,
    sinais_vitais,
    exame_fisico,
    exame_imagem,
    exame_lab){
    let anamneseResumo
    let queixa_p :any = queixa
    let hda_p :any = hda
    let diagnostico_p :any = diagnostico
    let hpp_p :any = hpp
    let alergias_p :any = alergias
    let medicacoes_de_uso_comum_p :any = medicacoes_de_uso_comum
    let habitos_p :any = habitos
    let antecedentes_pessoais_p :any = antecedentes_pessoais
    let hfam_p :any = hfam
    let sinais_vitais_p :any = sinais_vitais
    let exame_fisico_p :any = exame_fisico
    let exame_imagem_p :any = exame_imagem
    let exame_lab_p :any = exame_lab

    if (queixa_p){anamneseResumo.push(queixa_p)}else{null}
    if (hda_p){anamneseResumo.push(hda_p)}else{null}
    if (diagnostico_p){anamneseResumo.push(diagnostico_p)}else{null}
    if (hpp_p){anamneseResumo.push(hpp_p)}else{null}
    if (alergias_p){anamneseResumo.push(alergias_p)}else{null}
    if (medicacoes_de_uso_comum_p){anamneseResumo.push(medicacoes_de_uso_comum_p)}else{null}
    if (habitos_p){anamneseResumo.push(habitos_p)}else{null}
    if (antecedentes_pessoais_p){anamneseResumo.push(antecedentes_pessoais_p)}else{null}
    if (hfam_p){anamneseResumo.push(hfam_p)}else{null}
    if (sinais_vitais_p){anamneseResumo.push(sinais_vitais_p)}else{null}
    if (exame_fisico_p){anamneseResumo.push(exame_fisico_p)}else{null}
    if (exame_imagem_p){anamneseResumo.push(exame_imagem_p)}else{null}
    if (exame_lab_p){anamneseResumo.push(exame_lab_p)}else{null}

    return anamneseResumo
}