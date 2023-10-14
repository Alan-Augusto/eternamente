const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();
const mysql = require("mysql");
const db = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "0511",
  database: "eternamente",
});

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/home", (req, res) => {
  const id = req.query.id; // Obtém o valor do parâmetro de consulta 'id' da URL

  const sqlSelect =
    "SELECT b.* FROM usuario_board AS ub JOIN board AS b ON ub.board_id = b.id WHERE ub.usuario_id = ?";
  console.log(sqlSelect);

  db.query(sqlSelect, [id], (err, result) => {
    if (err) {
      console.log(err);
      return res.status(500).json(err);
    }
    console.log(result);
    res.send(result);
  });
});

app.post("/signup", (req, res) => {
  const { email, password, name, birthday } = req.body;

  const sqlInsert =
    "INSERT INTO usuario (email, password, name, birthday) VALUES (?, ?, ?, ?)";

  db.query(sqlInsert, [email, password, name, birthday], (err, result) => {
    if (err) {
      console.log(err);
      return res.status(500).json(err);
    }
    console.log(result);
    res.send(result);
  });
});

app.get("/signin", (req, res) => {
  const email = req.query.email; // Obtém o valor do parâmetro de consulta 'id' da URL

  const sqlSelect = "SELECT * FROM usuario WHERE email = ?";
  console.log(sqlSelect);

  db.query(sqlSelect, [email], (err, result) => {
    if (err) {
      console.log(err);
      return res.status(500).json(err);
    }
    console.log(result);
    res.send(result);
  });
});

/*
(----OBTENDO AS BOARDS DE UM USUÁRIO----)
SELECT b.*
FROM usuario_board AS ub
JOIN board AS b ON ub.board_id = b.id
WHERE ub.usuario_id = YOUR_USER_ID;

(----OBTENDO AS LISTAS DE UMA BOARD----)
SELECT l.*, t.*
FROM list AS l
LEFT JOIN task AS t ON l.id = t.list_id
WHERE l.board_id = YOUR_BOARD_ID;

(----CRIANDO UMA NOVA BOARD E ASSOCIA AO USUÁRIO----)
INSERT INTO board (title) VALUES ('Your New Board Title');

INSERT INTO usuario-board (usuario_id, board_id) VALUES (YOUR_USER_ID, LAST_INSERT_ID());

(----CRIANDO UMA NOVA LISTA E ASSOCIA À BOARD SELECIONADA----)
INSERT INTO list (name, color, board_id) VALUES ('Your List Name', 'List Color', YOUR_BOARD_ID);

(----CRIANDO UMA NOVA TAREFA E ASSOCIA À LISTA SELECIONADA----)
INSERT INTO task (title, description, date, color, completed, help, helptext, list_id) 
VALUES ('Task Title', 'Task Description', 'Task Date', 'Task Color', 0, 0, 'Task Help Text', YOUR_LIST_ID);


*/

app.listen(3001, () => {
  console.log(`Servidor rodando na porta 3001`);
});
