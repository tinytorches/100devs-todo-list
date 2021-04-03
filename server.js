const express = require('express');
const app = express();
const MongoClient = require('mongodb').MongoClient;
const PORT = 3000;
require('dotenv').config();

// ========== Connect to DB ========== //
let db,
    dbConnectionStr = process.env.DB_STRING,
    dbName = 'tattooine';

MongoClient.connect(dbConnectionStr, { useUnifiedTopology: true })
    .then(client => {
        console.log(`Connected to ${dbName}`);
        db = client.db(dbName);
    });

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// ========== List ========== //
let todoList = [
    'Item 1',
    'Item 2',
    'Item 3',
];

// ========== Express Routes ========== //
app.get('/', (req, res) => {
    res.render('index.ejs');
});



// ========== Route Error Catcher ========== //
app.get('*', (req, res) => {
    res.send(console.log('Invalid Page'));
});

// ========== Server Listening ========== //
app.listen(process.env.PORT || PORT, () => {
    console.log(`Server running on port ${PORT}...`)
});