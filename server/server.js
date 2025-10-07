const express = require('express');
const connectDB = require('./config/db');
const jsonParser = require('./middleware/jsonParser');
require('dotenv').config();

const app = express();

app.use(jsonParser);

connectDB();

const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`Server running at port ${PORT}`);
});