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
const bodyParser = require("body-parser");
const { Client } = require("pg");

const upload_data = require("./Utilities/spatialFunctions").upload_data;
const find_avg = require("./Utilities/spatialFunctions").find_avg;
const find_tot_avg = require("./Utilities/spatialFunctions").find_tot_avg;
const find_avg_dist = require("./Utilities/spatialFunctions").find_avg_dist;
const find_cases = require("./Utilities/spatialFunctions").find_cases;

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

  await upload_data(data, client);

  const avg = find_avg(client);

  const tot_avg = find_tot_avg(client);

  const result = avg >= tot_avg ? false : true;

  const dist = find_avg_dist(cur_loc, client);

  const cases = find_cases(cur_loc, client);

  res.json({avg, tot_avg, result, dist, cases});
});

app.get('/all_data', async(req, res) => {
  const result = await client.query("SELECT e.name, e.district, d.covid_case FROM districts AS d, entities AS e ON d.district = e.district;");
  res.json({result});
})

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
