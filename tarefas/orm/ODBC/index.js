const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');

const bodyParser = require('body-parser');
const port = 3000;
const app = express();

app.use(express.json());
app.use(cors({ origin: true }));
app.use(bodyParser.urlencoded({ extended: true }));

require("dotenv").config();

var client;

async function connect() {

    //se já tiver uma conexão, retorna ela
    if (global.connection)
        return global.connection.connect();

    //cria uma nova conexão    
    const pool = new Pool({
        connectionString: process.env.CONNECTION_STRING
    });

    //testa a conexão
    client = await pool.connect();
    console.log("Criou pool de conexões no PostgreSQL!");

    //testa a conexão
    const res = await client.query('SELECT NOW()');
    console.log(res.rows[0]);
    
    //libera o cliente
    client.release();

    //guardando para usar sempre o mesmo
    global.connection = pool;
    return pool.connect();
}

connect();

/* 
    QUESTÃO 5 - ODBC
    a) Inserir uma atividade em algum projeto
*/

//http://localhost:3000/questao5/a
app.get('/questao5/a', async (req, res) => { 

    //Data atual
    const data1 = new Date();

    //Data atual + 5 dias    
    const data2 = new Date();
    data2.setDate(data2.getDate() + 5);

    //Inserindo atividade
    const text = 'INSERT INTO atividade(descricao, projeto, data_inicio, data_fim) VALUES($1, $2, $3, $4) RETURNING *';
    const values = ['Comer calanguin', 1, data1, data2];

    //Executando query
    const resx = await client.query(text, values);
    console.log(resx.rows[0]);
    
    //Retornando atividade inserida
    res.send(resx.rows[0]);
});

/* 
    QUESTÃO 5 - ODBC
    b) Atualizar o líder de algum projeto
*/

//http://localhost:3000/questao5/b
app.get('/questao5/b', async (req, res) => { 

    //Atualizando responsável
    const text = 'UPDATE projeto SET responsavel = $1 WHERE codigo = $2 RETURNING *';
    const values = [2, 1];

    //Executando query
    const resx = await client.query(text, values);
    console.log(resx.rows[0]);
    
    //Retornando atividade inserida
    res.send(resx.rows[0]);
});

/* 
    QUESTÃO 5 - ODBC
    c) Listar todos os projetos e suas atividades
*/

//http://localhost:3000/questao5/c
app.get('/questao5/c', async (req, res) => { 
    const result = await client.query('SELECT p.*, a.descricao as atividade_descricao FROM projeto p LEFT JOIN atividade a ON p.codigo = a.projeto ORDER BY p.codigo;');
    res.send(result.rows);
});


//alguns endpoints para facilitar a visualização
app.get('/api/atividade', async (req, res) => { 
    const result = await client.query('SELECT * FROM atividade');
    res.send(result.rows);
});

app.get('/api/projeto', async (req, res) => { 
    const result = await client.query('SELECT * FROM projeto');
    res.send(result.rows);
});

app.get('/api/departamento', async (req, res) => { 
    const result = await client.query('SELECT * FROM departamento');
    res.send(result.rows);
});

app.get('/api/funcionario', async (req, res) => { 
    const result = await client.query('SELECT * FROM funcionario');
    res.send(result.rows);
});

app.listen(port, () => {
    console.log("Servidor iniciado na porta: " + port)
});

