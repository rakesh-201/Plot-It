// const { Client } = require("pg");

// const client = new Client({
//   user: "postgres",
//   password: "",
//   host: "localhost",
//   port: "5432",
//   database: "SGDB_project",
// });

// client
//   .connect()
//   .then(() => console.log("connected"))
//   .catch((err) => console.error(err));

const express = require("express");
const cors = require("cors");
const app = express();
const port = 5000;
const bodyParser = require('body-parser');

app.use(cors());
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/analyse", (req, res) => {
  res.send("Hello");
});

app.post("/analyse", async (req, res) => {
  console.log(req.body);

  const data = req.body.data;

  const cur_loc = req.body.cur_loc;

  await upload_data(data);

  const avg = find_avg();

  const tot_avg = fund_tot_avg();

  const result = (avg >= tot_avg ? false : true)

  const dist = find_avg_dist(cur_loc);

  const cases = find_cases(cur_loc);

  

  res.json("received");
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
