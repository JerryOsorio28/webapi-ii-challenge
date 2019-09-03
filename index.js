//Pulls express dependency
const express = require('express');

//Run our server under the express depencency
const server = express();

//Assign port that our server will be listening for traffic
const port = 8000;

server.get('/', (req, res) => {
    res.send("It's working")
});

server.listen(port , () => {
    console.log(`server listening on port ${port}`);
});

