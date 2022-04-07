const express = require("express");

const DEFAULT_PORT = 3000;

const port = process.env.PORT || DEFAULT_PORT;

const app = express();

app.use(express.static("dist"));

app.listen(port, () => console.log(`Server working on Port ${port}`));
