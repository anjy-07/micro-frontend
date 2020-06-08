const express = require('express');
const app = express(),
      bodyParser = require("body-parser");
      port = 8081;

const users = [];

app.use(bodyParser.json());
app.use(express.static(process.cwd()+"/dist/parent/"));

app.get('/', (req,res) => {
  res.sendFile(process.cwd()+"/parent/dist/parent/index.html")
});

app.listen(port, () => {
    console.log(`Server listening on the port::${port}`);
});