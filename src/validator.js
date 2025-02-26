function validarNumeroProcesso(numeroProcesso) {
    // Remove qualquer caractere que não seja número
    const numeroLimpo = numeroProcesso.replace(/\D/g, "");

    // Verifica se tem 20 dígitos
    if (numeroLimpo.length !== 20) {
        return { valido: false, mensagem: "Número de processo deve ter 20 dígitos." };
    }

    // Extrai os campos conforme estrutura do CNJ
    const numero = numeroLimpo.substring(0, 7);
    const digitoVerificador = numeroLimpo.substring(7, 9);
    const ano = numeroLimpo.substring(9, 13);
    const segmento = numeroLimpo.substring(13, 14);
    const tribunal = numeroLimpo.substring(14, 16);
    const unidade = numeroLimpo.substring(16, 20);

    // Calcula o dígito verificador esperado
    const numeroCalculado = calcularDigitoVerificador(`${numero}${ano}${segmento}${tribunal}${unidade}`);

    if (parseInt(digitoVerificador, 10) !== numeroCalculado) {
        return { valido: false, mensagem: "Dígito verificador incorreto." };
    }

    return { valido: true, mensagem: "Número de processo válido." };
}

function calcularDigitoVerificador(base) {
    const numeroParaCalculo = BigInt(base + "0000");
    const digitoCalculado = 98n - (numeroParaCalculo % 97n);
    return Number(digitoCalculado);
}

module.exports = { validarNumeroProcesso };
