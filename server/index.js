const express = require("express");
const path = require("path");
const cors = require("cors");
const pool = require("./db");
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "/../client/build")));

app.get("/dashboard/university_list", async (req, res) => {
  try {
    const statement_sql = "SELECT * FROM public.university";
    const execute_sql = await pool.query(statement_sql);

    let university_list = [];
    execute_sql.rows.forEach((university) => {
      university_list.push({
        name: university.name,
        description: university.description,
        location: university.location,
        enrollment: university.enrollment,
        university_id: university.university_id,
      });
    });

    res.status(200).json(university_list);
  } catch (err) {
    res.status(400).json({
      error: "Error in Retrieving Universities.",
    });
  }
});

app.get("/dashboard/university/:id", async (req, res) => {
  try {
    const statement_sql = "SELECT * FROM public.rso WHERE university_id=$1";
    const insert_sql = [req.params.id];
    const execute_sql = await pool.query(statement_sql, insert_sql);

    let rso_list = [];
    execute_sql.rows.forEach((rso) => {
      rso_list.push({
        name: rso.rso_name,
        description: rso.rso_description,
        rso_id: rso.rso_id,
      });
    });

    res.status(200).json(rso_list);
  } catch (err) {
    res.status(400).json({
      error: "Error in Retrieving RSOs.",
    });
  }
});

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "/../client/build/index.html"));
});

app.post("/register", async (req, res) => {
  try {
    const { first_name, last_name, email, password } = req.body;
    const statement_sql =
      "INSERT INTO public.users(first_name, last_name, email, password, user_type) VALUES ($1, $2, $3, $4, $5)";
    const insert_sql = [first_name, last_name, email, password, "student"];
    const execute_sql = await pool.query(statement_sql, insert_sql);
    res.status(200).json(execute_sql);
  } catch (err) {
    res.status(400).json({
      error:
        "Error in Registering Account. This Email Might Have Been Already Registered. Try Again.",
      exception: err,
    });
  }
});

app.post("/login", async (req, res) => {
  try {
    const body = req.body;
    const statement_sql =
      "SELECT users_id, first_name, last_name, user_type FROM public.users WHERE email=$1 AND password=$2";
    const insert_sql = [body.email, body.password];
    const execute_sql = await pool.query(statement_sql, insert_sql);
    if (!execute_sql.rows[0])
      throw new Error("Incorrect Email and Password Combination");
    res.status(200).json(execute_sql.rows[0]);
  } catch (err) {
    res.status(400).send(err.message);
  }
});

app.post("/dashboard", async (req, res) => {
  try {
    const { user_id, uni_name, uni_location, uni_num, uni_desc } = req.body;
    const statement_sql =
      "INSERT INTO public.university(super_admin_id, name, location, description, enrollment) VALUES ($1, $2, $3, $4, $5)";
    const insert_sql = [user_id, uni_name, uni_location, uni_desc, uni_num];
    const execute_sql = await pool.query(statement_sql, insert_sql);
    res.status(200).json(execute_sql);
  } catch (err) {
    res.status(400).json({
      error:
        "Error in Inserting University Profile. This University Profile Might Have Been Already Created.",
    });
  }
});

app.post("/dashboard/university/:id", async (req, res) => {
  try {
    const { admin_id, rso_desc, rso_name } = req.body;
    const statement_sql =
      "INSERT INTO public.rso(admin_id, rso_name, rso_description, university_id) VALUES ($1, $2, $3, $4)";
    const insert_sql = [admin_id, rso_name, rso_desc, req.params.id];
    const execute_sql = await pool.query(statement_sql, insert_sql);
    res.status(200).json(execute_sql);
  } catch (err) {
    res.status(400).json({
      error:
        "Error in Inserting RSO Profile. This RSO Profile Might Have Been Already Created.",
    });
  }
});

app.post("/dashboard/university/:id/rso/:rso_id", async (req, res) => {
  try {
    const { event_desc, event_name, event_location, event_date } = req.body;
    const statement_sql =
      "INSERT INTO public.rso_event(name, description, location, date, rso_id) VALUES ($1, $2, $3, $4, $5)";
    const insert_sql = [event_name, event_desc, event_location, event_date, req.params.rso_id];
    const execute_sql = await pool.query(statement_sql, insert_sql);
    res.status(200).json(execute_sql);
  } catch (err) {
    res.status(400).json({
      error:
        "Error in Inserting RSO Event. This RSO Event Might Have Been Already Created.",
        err: err
    });
  }
});

app.listen(process.env.PORT || 5000, () => {
  console.log(`server has started on port ${process.env.PORT || 5000}`);
});
