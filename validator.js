function validarNumeroProcesso(numeroProcesso) {
    // Remove qualquer caractere que não seja número
    const numeroLimpo = numeroProcesso.replace(/\D/g, "");

    // Verifica se o número tem exatamente 20 dígitos
    if (numeroLimpo.length !== 20) {
        return { valido: false, mensagem: "Número de processo deve ter 20 dígitos." };
    }

    // Extrai os campos conforme a estrutura do CNJ
    const numero = numeroLimpo.substring(0, 7);
    const digitoVerificador = numeroLimpo.substring(7, 9);
    const ano = numeroLimpo.substring(9, 13);
    const segmento = numeroLimpo.substring(13, 14);
    const tribunal = numeroLimpo.substring(14, 16);
    const unidade = numeroLimpo.substring(16, 20);

    // Formata para cálculo, substituindo os dígitos verificadores por "00"
    const baseParaCalculo = `${numero}${ano}${segmento}${tribunal}${unidade}00`;

    // Calcula o dígito verificador correto
    const digitoCalculado = calcularDigitoVerificador(baseParaCalculo);

    // Compara o dígito informado com o calculado
    if (parseInt(digitoVerificador, 10) !== digitoCalculado) {
        return { valido: false, mensagem: `Dígito verificador incorreto. Esperado: ${digitoCalculado}` };
    }

    return { valido: true, mensagem: "Número de processo válido." };
}

function calcularDigitoVerificador(base) {
    // Convertendo para um número inteiro grande (BigInt)
    const numeroParaCalculo = BigInt(base);

    // Aplica a fórmula correta para o cálculo do dígito verificador
    const digitoCalculado = 98n - (numeroParaCalculo % 97n);

    // Retorna o valor como um número de 2 dígitos (ex: "05" ao invés de "5")
    return parseInt(digitoCalculado.toString().padStart(2, "0"), 10);
}
/*
// ✅ Testes
const exemplos = [
    "0001234-56.2024.8.01.0001", // Exemplo correto
    "1234567-89.2023.4.02.5678", // Exemplo incorreto
    "00012345620248010001",       // Sem separadores, válido
];

exemplos.forEach(numero => {
    console.log(`🔍 Validando: ${numero}`);
    console.log(validarNumeroProcesso(numero));
});
*/


module.exports = { validarNumeroProcesso };
