const express = require('express')
const path =require('path')
const port = process.env.PORT || 3000
const app = express();

//setup static folder
// app.use(express.static(path.join(__dirname, 'public')));

// app.get('/', (req,res)=>{
//     res.sendFile(path.join(__dirname, 'public', 'index.html'));
//     // res.send({'msg': 'Hello World'})
// })
// app.get('/about', (req,res)=>{

//     res.sendFile(path.join(__dirname, 'public', 'about.html'))
// })
let posts = [
    {id:1, title: 'Post One'},
    {id:2, title: 'Post Two'},
    {id:3, title: 'Post Three'},
    {id:4, title: 'Post Four'}
]
//get all posts
app.get('/api/posts', (req, res)=>{
    const limit =parseInt(req.query.limit)
    console.log("Query params :",req.query)
    if(!isNaN(limit) && limit >0){
        res.status(200).json(posts.slice(0, limit))
    }
    else{
        res.status(200).json(posts)
    }
    })
//get single post
app.get('/api/posts/:id', (req, res)=>{
    console.log("req.params:", req.params)
    const id= parseInt(req.params.id)
    const post = posts.find(p => p.id === id)
    if(!post) return res.status(404).send('Post not found')
    return res.status(200).json(post)
})

app.listen(port, ()=> console.log(`Server is running on port ${port}`));
