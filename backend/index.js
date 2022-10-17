const cors = require('cors')
const express = require('express')
const app = express()
app.use(express.json());
app.use(cors())
const port = 3000
const axios = require('axios').default;

// Conseguir retornar endereço da resposta da API
// Como é um retorno assíncrono precisamos usar uma promise
// retornar de uma função o valor de uma promessa

const consultarCEP = async (cep) => {
    const reqResult = await axios.get("https://viacep.com.br/ws/" + cep + "/json/")
    return reqResult.data
}

// Aqui não podemos usar async, pois isso é sintaxe de ES6 (js novo)
// Como não podemos usar await/async, temos que retornar uma nova promise
// Ao retornar uma nova promise, temos acesso aos métodos resolve e reject
// E os usamos para retornar / expressar erros
const consultarCEPAntigo = (cep) => {
    return new Promise((resolve, reject) => {
        axios.get("https://viacep.com.br/ws/" + cep + "/json/")
            .then(response => {
                resolve(response.data)
            })
            .catch(error => {
                reject(error)
            })
    })
}

// meuservico.com/minharota/usuario/petersonv (path parameters)
// Aqui petersonv é um path param
// meuservico.com/minharota/usuario?name=pet (query string parameters)
// E também tem o corpo/cabeçalho da req
//rota/caminho
//:cep -> path param
app.get('/consulta-cep/:cep', async (req, res) => {
    try {
        let cepFront = req.params.cep
        // Chamar a função que retorna o endereço
        // Responder requisição
    
        let endereco = await consultarCEP(cepFront)
        res.send(endereco)
        // versão com Promise
        // consultarCEP(cepFront).then(response => {
        //     res.send(response)
        // })
    } catch (err) {
        console.error('erro genérico', err)
        res.status(500).send('erro')
    }
})

// const minhaFuncao = (a, fn) => {
//     console.log(a)
//     fn('pet', 'v')
// }

// minhaFuncao('minhaString', (nome, sobrenome) => {
//     console.log('oi', nome, sobrenome)
// })


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})


    // Integrar com VIA CEP
    // Diferença entre script e backend: backend é um webserver que espera uma requisição para fazer algo, expoe recursos, coisas
    // que podem ser feitas atreves das requisições, expoe o endpoint e roda o ws (webservice)
    // nodemon é uma biblioteca
    //