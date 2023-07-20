// used to setup a server so that the APIs can be managed and manipulated
import express from "express";
// used to enable CORS for the APIs provided
import cors from 'cors'
import axios from 'axios'
import bodyParser from 'body-parser'

const port = process.env.PORT || 3000;
const app = express();

app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.get("/api/v1/hello", (_req, res) => {
  res.json({ message: "Hello, world!" })
});

app.listen(port, () => {
  console.log("Server listening on port", port);
});

app.get("/api/countries", async (_req, res) => {
  let countries = await axios.get("https://test-services.interact.technology/rest/refdata/countries")
  .then((response) => {
    return response.data
  })
  return res.json(countries)
   // used to test api fetching
  // res.status(400);
  // res.send('None shall pass');
})

app.get("/api/professions", async (_req, res) => {
  let professions = await axios.get("https://test-services.interact.technology/rest/refdata/professions")
  .then((response) => {
    return response.data
  })
  return res.json(professions)
})

app.get("/api/specialties", async (req, res) => {
  let url = `https://test-services.interact.technology/rest/refdata/specialties`

  if (req.query.profession) {
    url = `${url}?professionId=${req.query.profession}`
  }

  let specialties = await axios.get(url)
  .then((response) => {
    return response.data
  })
  return res.json(specialties)
})