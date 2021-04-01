const express = require('express');
const app = express();

app.set('view engine', 'ejs');

let todoList = [
    'Item 1',
    'Item 2',
    'Item 3',
];

// ========== Express Routes ========== //
app.get('/', (req, res) => {
    res.render('index');
});



// ========== Route Error Catcher ========== //
app.get('*', (req, res) => {
    res.send(console.log('Invalid Page'));
});

// ========== Server Listening ========== //
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));