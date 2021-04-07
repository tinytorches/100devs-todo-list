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
        console.log(`Noice! Connected to ${dbName} database...`);
        db = client.db(dbName);
    })
    .catch(err => {
        console.log(err);
    });

// ========== Setting up our server ========== //
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

app.post('/createTodo', (req, res) => {
    db.collection('todoList').insertOne({todo: req.body.todoItem, completed: false})
    .then(result => {
        console.log('Todo has been added to the list!');
        res.redirect('/');
    })
});


// ========== Route Error Catcher ========== //
app.get('*', (req, res) => {
    res.send(console.log('Invalid page request...'));
});

// ========== Server Listening ========== //
app.listen(process.env.PORT || PORT, () => {
    console.log(`Server running on port ${PORT}...`)
});