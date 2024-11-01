const express = require('express');
const path = require('path');
const app = express();
const PORT = 3010;

app.get('*', (req, res)=> {
    res.sendFile(path.resolve(`${__dirname}/build/index.html`));
});

app.listen(PORT, ()=> {
    console.log('Front end running on port: ' + PORT)
});
