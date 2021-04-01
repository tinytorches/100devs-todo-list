const express = require('express');
const app = express()

// ========== Express Routes ========== //
app.get('/', (req, res) => {
    res.send('Hello World');
});



// ========== Route Catcher ========== //
app.get('*', (req, res) => {
    res.send(console.log('Invalid Page'))
    res.send('<h1>Invalid Page</h1>')
})

// ========== Server Listening ========== //
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));