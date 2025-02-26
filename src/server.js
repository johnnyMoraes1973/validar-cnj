const express = require("express");
const { validarNumeroProcesso } = require("./validator");

const app = express();
app.use(express.json());

// Endpoint para validar o número do processo CNJ
app.post("/validar-cnj", (req, res) => {
    const { numero } = req.body;

    if (!numero) {
        return res.status(400).json({ error: "O campo 'numero' é obrigatório." });
    }

    const resultado = validarNumeroProcesso(numero);
    res.json(resultado);
});

// Inicia o servidor na porta 3333
const PORT = 3333;
app.listen(PORT, () => {
    console.log(`✅ Servidor rodando em http://localhost:${PORT}`);
});
