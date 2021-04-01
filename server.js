const express = require('express');
const app = express()

// ========== Express Routes ========== //
app.get('/', (req, res) => {
    res.send('<h1>Hello World</h1>');
});



// ========== Route Error Catcher ========== //
app.get('*', (req, res) => {
    res.send(console.log('Invalid Page'));
});

// ========== Server Listening ========== //
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));