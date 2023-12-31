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

app.get("/getboards", (req, res) => {
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

app.get("/getlists", (req, res) => {
  const id = req.query.id; // Obtém o valor do parâmetro de consulta 'id' da URL

  const sqlSelect = "SELECT id, name, color FROM list WHERE board_id = ?";

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

app.get("/labels", (req, res) => {
  const boardId = req.query.boardId;

  const sqlSelectLabels = `
    SELECT label.id, label.title, label.color
    FROM label
    INNER JOIN task_label ON label.id = task_label.label_id
    INNER JOIN task ON task_label.task_id = task.id
    INNER JOIN list ON task.list_id = list.id
    WHERE list.board_id = ?
  `;

  db.query(sqlSelectLabels, [boardId], (err, labels) => {
    if (err) {
      console.log(err);
      return res.status(500).json(err);
    }
    console.log(labels);
    res.send(labels);
  });
});

app.get("/taskColors", (req, res) => {
  const boardId = req.query.boardId;

  const sqlSelectColors = `
    SELECT DISTINCT task.color
    FROM task
    INNER JOIN list ON task.list_id = list.id
    WHERE list.board_id = ? AND task.color IS NOT NULL
  `;

  db.query(sqlSelectColors, [boardId], (err, colors) => {
    if (err) {
      console.log(err);
      return res.status(500).json(err);
    }
    console.log(colors);
    res.send(colors);
  });
});

app.post("/newboard", (req, res) => {
  const { name, id } = req.body;

  // Inserindo um novo quadro na tabela "board"
  const sqlInsertBoard = "INSERT INTO board (title) VALUES (?)";
  db.query(sqlInsertBoard, [name], (err, result) => {
    if (err) {
      console.log(err);
      return res.status(500).json(err);
    }

    // Inserindo uma nova linha na tabela "usuario-board" vinculando o usuário ao quadro criado
    const boardId = result.insertId; // Obtém o ID do quadro recém-inserido
    const sqlInsertUserBoard =
      "INSERT INTO usuario_board (usuario_id, board_id) VALUES (?, ?)";
    db.query(sqlInsertUserBoard, [id, boardId], (err, result) => {
      if (err) {
        console.log(err);
        return res.status(500).json(err);
      }

      console.log(result);
      res.send(result);
    });
  });
});

app.post("/detetboard", (req, res) => {
  const { id } = req.body;

  // Inserindo um novo quadro na tabela "board"
  const sqlInsertBoard = "DELETE FROM board WHERE id = ?;";
  db.query(sqlInsertBoard, [id], (err, result) => {
    if (err) {
      console.log(err);
      return res.status(500).json(err);
    }
    console.log(result);
    res.send(result);
  });
});

app.post("/newlist", (req, res) => {
  const { name, id } = req.body;

  // Inserindo um novo quadro na tabela "board"
  const sqlInsertBoard = "INSERT INTO list (name, board_id) VALUES (?, ?)";
  db.query(sqlInsertBoard, [name, id], (err, result) => {
    if (err) {
      console.log(err);
      return res.status(500).json(err);
    }
    console.log(result);
    res.send(result);
  });
});

app.post("/deletlist", (req, res) => {
  const { id } = req.body;

  // Inserindo um novo quadro na tabela "board"
  const sqlInsertBoard = "DELETE FROM list WHERE id = ?;";
  db.query(sqlInsertBoard, [id], (err, result) => {
    if (err) {
      console.log(err);
      return res.status(500).json(err);
    }
    console.log(result);
    res.send(result);
  });
});

app.post("/editlist", (req, res) => {
  const { id, name, color } = req.body;

  // Inserindo um novo quadro na tabela "board"
  const sqlInsertBoard =
    "UPDATE `list` SET `name` = ?, `color` = ? WHERE `id` = ?";
  db.query(sqlInsertBoard, [name, color, id], (err, result) => {
    if (err) {
      console.log(err);
      return res.status(500).json(err);
    }
    console.log(result);
    res.send(result);
  });
});

app.get("/getTasks", (req, res) => {
  const id = req.query.id; // Obtém o valor do parâmetro de consulta 'id' da URL

  const sqlSelect = "SELECT * FROM task WHERE list_id = ?";

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

app.post("/newtask", (req, res) => {
  const { title, description, date, color, completed, idList } = req.body;
  const sqlInsertBoard =
    "INSERT INTO task (title, description, date, color, completed, help, list_id) VALUES (?, ?, ?, ?, ?, ?, ?)";
  db.query(
    sqlInsertBoard,
    [title, description, date, color, completed, false, idList],
    (err, result) => {
      if (err) {
        console.log(err);
        return res.status(500).json(err);
      }
      console.log(result);
      res.send(result);
    }
  );
});

app.post("/checktask", (req, res) => {
  const { id, check } = req.body;
  let valuecheck = 0;
  if (check) {
    valuecheck = 1;
  }
  // Inserindo um novo quadro na tabela "board"
  const sqlInsertBoard = "UPDATE `task` SET `completed` = ? WHERE `id` = ?";
  db.query(sqlInsertBoard, [check, id], (err, result) => {
    if (err) {
      console.log("ERRRROOOO!!!!", err);
      return res.status(500).json(err);
    }
    console.log(result);
    res.send(result);
  });
});

app.post("/delettask", (req, res) => {
  const { id } = req.body;

  // Inserindo um novo quadro na tabela "board"
  const sqlInsertBoard = "DELETE FROM task WHERE id = ?;";
  db.query(sqlInsertBoard, [id], (err, result) => {
    if (err) {
      console.log(err);
      return res.status(500).json(err);
    }
    console.log(result);
    res.send(result);
  });
});

app.post("/edittask", (req, res) => {
  const { title, description, date, color, completed, idList } = req.body;

  // Inserindo um novo quadro na tabela "board"
  const sqlInsertBoard =
    "UPDATE `task` SET `title` = ?, `description` = ?, `date` = ?, `color` = ?, `completed` = ? WHERE `id` = ?";
  db.query(
    sqlInsertBoard,
    [title, description, date, color, completed, idList],
    (err, result) => {
      if (err) {
        console.log(err);
        return res.status(500).json(err);
      }
      console.log(result);
      res.send(result);
    }
  );
});

app.get("/getuser", (req, res) => {
  const id = req.query.id; // Obtém o valor do parâmetro de consulta 'id' da URL

  const sqlSelect = "SELECT name FROM usuario WHERE id = ?";

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

app.listen(3001, () => {
  console.log(`Servidor rodando na porta 3001`);
});
