const express = require('express');
const { randomBytes } = require('crypto');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

const commentsByPostid ={};

app.get('/posts/:id/comments', (req, res)=>{
    res.send(commentsByPostid[req.params.id] || []);
});

app.post('/posts/:id/comments', (req, res)=>{

    const commentId = randomBytes(4).toString('hex');
    const { content } = req.body;

    const comments = commentsByPostid[req.params.id] || [];
    comments.push({id: commentId, content});
    commentsByPostid[req.params.id] = comments;

    res.status(201).send(comments);
    
});


app.listen(4001,()=>{
    console.log("Listening for comments on port 4001");
});