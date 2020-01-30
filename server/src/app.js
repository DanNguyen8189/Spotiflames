const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const morgan = require("morgan");

const app = express();
app.use(morgan("combine"));
app.use(bodyParser.json());
app.use(cors());

/*get request to status endpoint. If you go to /status in the browser you'll see the message in JSON format*/
app.get("/status", (req, res) => {
  res.send({
    message: "hello world"
  });
});

app.listen(process.env.PORT || 8081);
