const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
let REDIRECT_URI = process.env.REDIRECT_URI || "http://localhost:8081/callback";
let FRONTEND_URI = process.env.FRONTEND_URI || "http://localhost:8080";
const PORT = process.env.PORT || 8081;

if (process.env.NODE_ENV !== "production") {
  REDIRECT_URI = "http://localhost:8081/callback";
  FRONTEND_URI = "http://localhost:8080";
}

const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const morgan = require("morgan");
const history = require("connect-history-api-fallback");

const app = express();

/** https://stackoverflow.com/questions/52327143/serving-vuejs-builds-via-express-js-using-history-mode */
app
  .use(morgan("combine"))
  .use(bodyParser.json())
  .use(cors())
  .use(express.static(path.resolve(__dirname, "../client/dist")))
  .use(
    // Support history api
    history({
      index: "/dist/index.html"
    })
  );

/*get request to status endpoint. If you go to /status in the browser you'll see the message in JSON format*/
app.get("/status", (req, res) => {
  res.send({
    message: "hello world"
  });
});

/*home page: __dirname tells you the absolute path of the directory containing the executing file
https://alligator.io/nodejs/how-to-use__dirname/*/
app.get("/", (req, res) => {
  res.render(path.resolve(__dirname, "../client/dist/index.html"));
});

/*All remaining requests get sent to the client side so it can handle routing TODO*/
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../client/public", "index.html"));
});

app.listen(PORT, () => {
  console.log("Server running on port ${PORT}");
});
