//Pulls express dependency
const express = require('express');

//Run our server under the express depencency
const server = express();

//Teaches express to parse JSON
server.use(express.json()) 

//Assign port that our server will be listening for traffic
const port = 8000;

// //Pulls posts data
// const Posts = require('./data/seeds/01-posts');

// //Pulls comments data
// const Comments = require('./data/seeds/02-comments');

const DbFile = require('./data/db'); //<-- pulls our data base



// <------------------------------------------------------------------------- GET REQUESTS ----------------
//Returns an array of all the post objects contained in the database.
server.get('/api/posts', (req, res) => {
    DbFile.find()
    .then(posts => res.status(200).json(posts))
});

//Returns the post object with the specified id.
server.get('/api/posts/:id', (req, res) => {

    const id = req.params.id; // <-- fetchs posts ID.

    DbFile.findById(id)
    .then(post => {res.status(200).json(post)})
    
    .catch(err => res.status(404).json({ message: "The post with the specified ID does not exist." }))

});

//Returns an array of all the comment objects associated with the post with the specified id.
server.get('/api/posts/:id/comments', (req, res) => {
    res.send("It's working")
});
// <------------------------------------------------------------------------- POST REQUESTS ----------------
//Creates a post using the information sent inside the request body.
server.post('/api/posts', (req, res) => {

    nextId = 10;
    const post = req.body; 
    post.id = nextId++;

    Posts.push(post)

    res.status(201).json({
        url: '/api/posts', operation: 'POST'
    });
})

//Creates a comment for the post with the specified id using information sent inside of the request body.
server.post('/api/posts/:id/comments', (req, res) => {
    res.status(201).json({
        url: '/api/posts/:id/comments', operation: 'POST'
    });
})
// <------------------------------------------------------------------------- PUT REQUESTS ----------------
//Updates the post with the specified id using data from the request body. Returns the modified document, NOT the original.
server.put('/api/posts/:id', (req, res) => {
    res.status(200).json({
        url: `/api/posts/${id}`, operation: 'PUT'
    })
});
// <------------------------------------------------------------------------- DELETE REQUESTS ----------------
//Removes the post with the specified id and returns the deleted post object.
server.delete('/api/posts/:id', (req, res) => {

    const id = req.params.id; // <-- fetchs posts ID.
    console.log(req.params)

    res.status(200).json({
        url: `/api/posts/${id}`, 
        operation: `DELETE post with id ${id}`
    });
})

//Log in which port our server is listening for traffic
server.listen(port , () => {
    console.log(`server listening on port ${port}`);
});

