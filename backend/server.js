const express   = require('express');
const server    = express();


//configurar o servidor para apresentar arquivos staticos
server.use(express.static('../public'));

//habilitar body do  formulario
server.use(express.urlencoded({ extended: true}));

// Configurar a conexão com o banco de dados
const Pool      = require('pg').Pool;
const db = new Pool({
    user: 'postgres',
    password: '0000',
    host: 'localhost',
    port: '5000',
    database: 'donation'
});


//configurando a template engine
const nunjucks = require('nunjucks');
nunjucks.configure("../", {
    express: server,
    noCache: true,
});

// configura as rotas e apresentações da pagina
server.get('/', (req, res) => {
    db.query(`SELECT * FROM donors`, (err, result) => {
        if(err) return res.send('Erro no banco de Dados!');

        const donors = result.rows;
        return res.render("index.html", { donors } );
    });

});

server.post('/', (req, res) => {
    const name = req.body.name;
    const email = req.body.email;
    const blood = req.body.blood;

    if(name == "" || email == "" || blood == ""){
        return res.send("Todos os campos são obrigatórios!");
    }

    const values = [name, email, blood];
    const query = `
    INSERT INTO donors ("name", "email", "blood")
    VALUES ($1, $2, $3)`;
    //put the values inside data base
    db.query(query, values, (err) => {
        if (err) return res.send("Erro no banco de dados!" + err);

        return res.redirect('/');
    });   
});
//Liga o server e permite o acesso na porta 3000
server.listen(3333);
