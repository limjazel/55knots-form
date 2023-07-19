import express from "express";
import cors from 'cors'
import axios from 'axios'

const port = process.env.PORT || 3000;
const app = express();

app.use(cors())

app.get("/api/v1/hello", (_req, res) => {
  res.json({ message: "Hello, world!" });
});

app.listen(port, () => {
  console.log("Server listening on port", port);
});

app.get("/api/countries", (_req, res) => {
  axios.get("https://test-services.interact.technology/rest/refdata/countries")
  .then((response) => {
    res.json(response.data)
  })
})