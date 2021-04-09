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

// ========== Express Routes ========== //
// app.get('/', (req, res) => {
//     db.collection('todoList').find().toArray()
//     .then(data => {
//         res.render('index.ejs', {zebra: data})
//     });
// });
app.get('/', async (req, res) => {
    const todoList = await db.collection('todoList').find().toArray();
    const todoLeft = await db.collection('todoList').countDocuments({completed: false});
    res.render('index.ejs', {zebra: todoList, left: todoLeft})
});

app.post('/createTodo', (req, res) => {
    db.collection('todoList').insertOne({todo: req.body.todoItem, completed: false})
    .then(result => {
        console.log('Todo has been added to the list!');
        res.redirect('/');
    }); 
});

app.put('/markComplete', (req, res) => {
    // console.log(`"${req.body.textToComplete}" has been marked completed...`);
    db.collection('todoList').updateOne({todo: req.body.textToComplete}, {
        $set: {
            completed: true
        }
    })
    .then(result => {
        console.log('Marked Complete');
        res.json('Marked Complete')
    })
    .catch(err => { 
        console.log(err)
    }); 
});

app.put('/undo', (req, res) => {
    // console.log(`"${req.body.textToUndo}" has been marked undone...`);
    db.collection('todoList').updateOne({todo: req.body.textToUndo}, {
        $set: {
            completed: false
        }
    })
    .then(result => {
        console.log('Todo Marked Undone');
        res.json('Todo Marked Undone')
    })
    .catch(err => { 
        console.log(err)
    }); 
});

app.delete('/deleteTodo', (req, res) => {
    // console.log(`"${req.body.textToDelete}" has been deleted...`);
    db.collection('todoList').deleteOne({todo: req.body.textToDelete})
    .then(result => {
        console.log('Deleted Todo');
        res.json('Deleted it');
    })
    .catch(err => {
        console.log(err);
    });
});

// ========== Route Error Catcher ========== //
app.get('*', (req, res) => {
    res.send(console.log('Invalid page request...'));
});

// ========== Server Listening ========== //
app.listen(process.env.PORT || PORT, () => {
    console.log(`Server running on port ${PORT}...`)
});