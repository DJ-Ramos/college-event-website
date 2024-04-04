const express = require("express");
const path = require("path");
const cors = require("cors");
const pool = require("./db");
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "/../client/build")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "/../client/build/index.html"));
});

app.post("/register", async (req, res) => {
  try {
    const {first_name, last_name, email, password} = req.body;
    const statement_sql =
      "INSERT INTO public.users(first_name, last_name, email, password, user_type) VALUES ($1, $2, $3, $4, $5)";
    const insert_sql = [
      first_name,
      last_name,
      email,
      password,
      "Student",
    ];
    const execute_sql = await pool.query(statement_sql, insert_sql);
    res.status(200).json(execute_sql);
  } catch (err) {
    res.status(400).json({
      error:
        "Error in Registering Account. This Email Might Have Been Already Registered. Try Again.",
    });
  }
});

app.post("/login", async (req, res) => {
  try {
    const body = req.body;
    const statement_sql =
      "SELECT first_name, last_name FROM public.users WHERE email=$1 AND password=$2";
    const insert_sql = [body.email, body.password];
    const execute_sql = await pool.query(statement_sql, insert_sql);
    if (!execute_sql.rows[0])
      throw new Error("Incorrect Email and Password Combination");
    res.status(200).json(execute_sql.rows[0]);
  } catch (err) {
    res.status(400).send(err.message);
  }
});

app.listen(process.env.PORT || 5000, () => {
  console.log(`server has started on port ${process.env.PORT || 5000}`);
});
