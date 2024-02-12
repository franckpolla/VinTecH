const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");

const Port = 8000;
//middleware cors  for cross-origin resource sharing.
app.use(cors());
//When a request is made
//with a JSON payload (such as a POST or PUT request with JSON data in the body),
// express.json() parses the JSON data and exposes it on the req.body
//property of the request object. This makes it easy to work with JSON data in your route handlers.
app.use(express.json());

//====================ROUTES=================//

// greate a todo
app.post("/todo", async (req, res) => {
  try {
    //create an instance of pool and make query on it
    const { description } = req.body;

    //we are creating a newtodo with that value
    const newTodo = await pool.query(
      "INSERT INTO todos(description) VALUES ($1) RETURNING*",
      [description]
    );
    res.json(newTodo.rows[0]);
  } catch (error) {
    console.error(error.message);
  }
});
// get all todo
app.get("/todos", async (req, res) => {
  try {
    const alltodos = await pool.query("SELECT * FROM todos");
    res.json(alltodos.rows);
  } catch (error) {
    console.error(error.message);
  }
});

//get a todo
app.get("/todos/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const todo = await pool.query("SELECT * FROM todos WHERE todo_id=$1", [id]);

    res.json(todo.rows[0]);
  } catch (error) {
    console.error(error.message);
  }
});

//update a todo
app.put("/todos/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const { description } = req.body;
    const updateTodo = await pool.query(
      "UPDATE todos SET description=$1 WHERE todo_id=$2",
      [description, id]
    );
    res.json("Todo was updated");
  } catch (error) {
    console.error(error.message);
  }
});
// deleta a todo
app.delete("/todos/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const deleteTodos = await pool.query("DELETE FROM todos WHERE todo_id=$1", [
      id,
    ]);

    res.json("todo deleted");
  } catch (error) {
    console.error(error.message);
  }
});

app.listen(Port, () => {
  console.log(`Server is running  on ${Port}`);
});
