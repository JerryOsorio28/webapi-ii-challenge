//Pulls express dependency
const express = require('express');

//Run our server under the express depencency
const server = express();

//Teaches express to parse JSON
server.use(express.json()) 

//Assign port that our server will be listening for traffic
const port = 8000;

const DbFile = require('./data/db'); //<-- pulls our data base

// <------------------------------------------------------------------------- GET REQUESTS ----------------
//Returns an array of all the post objects contained in the database.
server.get('/api/posts', (req, res) => {

    DbFile.find()
    .then(posts => res.status(200).json(posts))
    .catch(err => res.status(500).json({ message: "The posts information could not be retrieved." }))
});

//Returns the post object with the specified id.
server.get('/api/posts/:id', (req, res) => {

    const id = req.params.id; // <-- fetchs post ID.

    DbFile.findById(id)
    .then(post => {res.status(200).json(post)})

    .catch(err => res.status(404).json({ message: "The post with the specified ID does not exist." }))

});

//Returns an array of all the comment objects associated with the post with the specified id.
server.get('/api/posts/:id/comments', (req, res) => {

    const id = req.params.id; // <-- fetchs post ID.

    DbFile.findCommentById(id)
    .then(comment => {
        if(comment){
            res.status(200).json(comment)
        }else{
            res.status(404).json({ message: "The post with the specified ID does not exist." })
        }
    })
    .catch(err => res.status(500).json({ error: "The post information could not be retrieved." }))
});
// <------------------------------------------------------------------------- POST REQUESTS ----------------
//Creates a post using the information sent inside the request body.
server.post('/api/posts', (req, res) => {

    const newPost = req.body; //fetch's new post from body

    DbFile.insert(newPost)
    .then(post => {
        if(post){
            res.status(201).json(post)
        }else{
            res.status(400).json({ errorMessage: "Please provide title and contents for the post." })
        }
    })
    .catch(err => res.status(500).json({ error: "There was an error while saving the post to the database" }))
})

//Creates a comment for the post with the specified id using information sent inside of the request body.
server.post('/api/posts/:id/comments', (req, res) => {

    nextId = 10;
    const comment = req.body; //fetch post from the body 
    post.id = nextId++;
    const id = req.params.id; // <-- fetchs comment ID.
    
})
// <------------------------------------------------------------------------- PUT REQUESTS ----------------
//Updates the post with the specified id using data from the request body. Returns the modified document, NOT the original.
server.put('/api/posts/:id', (req, res) => {
    
    nextId = 10;
    const post = req.body; //fetch post from the body 
    post.id = nextId++;
    const id = req.params.id; // <-- fetchs posts ID.
});
// <------------------------------------------------------------------------- DELETE REQUESTS ----------------
//Removes the post with the specified id and returns the deleted post object.
server.delete('/api/posts/:id', (req, res) => {
    
    nextId = 10;
    const post = req.body; //fetch post from the body 
    post.id = nextId++;
    const id = req.params.id; // <-- fetchs posts ID.
   

    res.status(200).json({
        url: `/api/posts/${id}`, 
        operation: `DELETE post with id ${id}`
    });
})

//Log in which port our server is listening for traffic
server.listen(port , () => {
    console.log(`server listening on port ${port}`);
});

