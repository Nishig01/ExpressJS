
let posts = [
    {id:1, title: 'Post One'},
    {id:2, title: 'Post Two'},
    {id:3, title: 'Post Three'},
    {id:4, title: 'Post Four'}
]

//@desc Get all posts
//@route GET /api/posts
export const getPosts = (req, res) => {
    const limit =parseInt(req.query.limit)
    console.log("Query params :",req.query)
    if(!isNaN(limit) && limit >0){
        return res.status(200).json(posts.slice(0, limit))
    }
        res.status(200).json(posts)
}

//@desc Get single post
//@route GET /api/posts/:id
export const getPost = (req, res, next) => {
    const id = parseInt(req.params.id);
    const post = posts.find(p => p.id === id);

    if (!post) {
        const err = new Error(`Post with id ${id} not found`);
        err.status = 404;
        return next(err);
    }
    res.status(200).json(post);
}

//@desc Create new post
//@route POST /api/posts
export const createPost = (req, res, next) => {
    const newPost = {
        id: posts.length + 1,
        title: req.body.title
    }

    if (!newPost.title) {
        const err = new Error(`Please include a title`);
        err.status = 400;
        return next(err);
    }
    posts.push(newPost);
    res.status(201).json(posts);
}
//@desc Update post
//@route PUT /api/posts/:id
export const updatePost = (req, res, next) => {
    const id = parseInt(req.params.id);
    const post = posts.find(p => p.id === id);

    if (!post) {
        const err = new Error(`Post with id ${id} not found`);
        err.status = 404;
        return next(err);
    }

    if (!req.body.title) {
        const err = new Error(`Please include a title`);
        err.status = 400;
        return next(err);
    }

    post.title = req.body.title;
    res.status(200).json(posts);
}

//@desc Delete post
//@route DELETE /api/posts/:id
export const deletePost = (req, res, next) => {
    const id = parseInt(req.params.id);
    const postIndex = posts.findIndex(p => p.id === id);

    if (postIndex === -1) {
        const err = new Error(`Post with id ${id} not found`);
        err.status = 404;
        return next(err);
    }

    posts.splice(postIndex, 1);
    res.status(200).json(posts);
}