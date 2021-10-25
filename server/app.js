const { Client } = require("pg");

const client = new Client({
  user: "postgres",
  password: "",
  host: "localhost",
  port: "5432",
  database: "SGDB_project",
});

client
  .connect()
  .then(() => console.log("connected"))
  .catch((err) => console.error(err));
