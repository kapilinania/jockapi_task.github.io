const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const jokesRouter = require('./routes/jokes');
const mysql = require('mysql2');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.static('public'));

// Database Connection
const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

db.connect(err => {
    if (err) throw err;
    console.log('MySQL Connected...');
});

// Routes
app.use('/api/jokes', jokesRouter(db));

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});