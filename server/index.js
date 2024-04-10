const express = require("express");
const path = require("path");
const cors = require("cors");
const pool = require("./db");
const app = express();

app.use(cors({
  origin: 'https://college-event-website-fb75aa7fe949.herokuapp.com'
}));
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
        university_id: university.university_id
      });
    });

    res.status(200).json(university_list);
  } catch (err) {
    res.status(400).json({
      error: "Error in Retrieving Universities.",
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

app.listen(process.env.PORT || 5000, () => {
  console.log(`server has started on port ${process.env.PORT || 5000}`);
});
