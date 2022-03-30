const express = require('express');

const DEFAULT_PORT = 3000;
const app = express();

app.use(express.static('dist'));

app.listen(DEFAULT_PORT, () => console.log(`Server working on Port ${DEFAULT_PORT}`));
