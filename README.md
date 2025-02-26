# 📌 Validador de Número de Processo CNJ
Este é um serviço **Node.js** que valida se um número de processo do **CNJ** está correto, verificando o formato e o **dígito verificador** usando o algoritmo **Módulo 97 Base 10**.
---
## 🚀 Como Executar
### 1️⃣ Instalar Dependências
```sh
yarn install


2️⃣ Iniciar o Servidor

yarn start

O servidor será iniciado em http://localhost:3333.

🛠️ Como Usar

Faça um POST para:

http://localhost:3333/validar-cnj

🔹 Exemplo de Requisição

{
    "numero": "0001234-56.2024.8.01.0001"
}

ou sem separadores:

{
    "numero": "00012345620248010001"
}


🔹 Exemplo de Resposta

✅ Se for válido

{
    "valido": true,
    "mensagem": "Número de processo válido."
}

❌ Se for inválido

{
    "valido": false,
    "mensagem": "Dígito verificador incorreto."
}

