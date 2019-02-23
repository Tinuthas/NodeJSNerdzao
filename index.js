const express = require('express');

const bodyParser = require('body-parser');

const joi = require('joi');
const casaSchema = require('./schemas/casas.js');

const stringConexao = "mongodb://galera:nerdzao123@ds021984.mlab.com:21984/got-nerdzao";

const MongoCliente = require('mongodb').MongoClient;

// Aplicação Devolve personagem do GoT
async function main() {
    const garcom = express();

    garcom.use(bodyParser.json());
    const cliente = new MongoCliente(stringConexao, {useNewUrlParser: true});

    await cliente.connect();

    const db = cliente.db("got-nerdzao")

    const colecaoDados = db.collection("casas");    
    garcom.get("/casas", async (req, res) => {

        const casas = await colecaoDados.find({}).toArray();
        res.send(casas);

    });

    garcom.post("/casas", async (req, res) => {
        const novaCasa = req.body;
        //Console.log(novaCasa: $[JSON.stringify(novaCasa, null, 2)])

        const resultadoValidacao = joi.validate(novaCasa, casaSchema);

        if(resultadoValidacao.error != null) {
            res.status(400);
            res.send(resultadoValidacao.error.details[0].message);
        }

        const result = await db.collection("casas").insertOne(novaCasa);
        res.status(201).send(result.ops[0]);
    
    });
    
    garcom.listen(3000), () => console.log("Servidor rodando...");
    
    // process.on("SIGKILL", () => {
    //     cliente.close();
    // });

    // process.on("SIGTERM", () => {
    //     cliente.close();
    // });
}


// res.send(
//     [
//         {
//             nome: "Stark",
//             regiao: "Norte"
//         },
//         {
//             nome: "Lannister",
//             regiao: "Noroeste"
//         },
//         {
//             nome: "Martell",
//             regiao: "Sul"
//         }
//     ]);


main();