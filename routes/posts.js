const { request } = require('express');
const express = require('express');
const router = express.Router();
const Post = require('../models/Post');


//GET BACK ALL THE POSTS
router.get('/', async (req, res) =>{
    try{
        const posts = await Post.find();
        res.json(posts);
    }catch (err){
        res.json({message: err});
    }
});

//SUBMITS A POST
router.post('/', async (req, res) =>{
    const post = new Post({
        title: req.body.title,
        price: req.body.price
    });
    try {
    //save post and catch/respond with an error if it exists
        const savedPost = await post.save()
        res.json(savedPost);
    } catch (err) {
        res.json({message: err});
    }
});

//SPECIFIC POSTS
router.get('/:postId', async (req,res) => {
    try {
        const post = await Post.findById(req.params.postId);
        res.json(post);
    } catch (err){
        res.json({message: err});
    }
});

//DELETE SPECIFIC POST
router.delete('/:postId', async (req, res) =>{
    try {
        const removeOnePost = await Post.deleteOne({_id: req.params.postId});
        res.json(removeOnePost);
    }catch(err){
        res.json({message: err});
    }
});

//UPDATE SPECIFIC POST
//modify to allow other fields to be modified
router.patch('/:postId', async (req, res) =>{
    try {
        const updatedPost = await Post.updateOne(
            {_id: req.params.postId}, 
            { $set: {title: req.body.title}}
        );
        res.json(updatedPost);
    }catch(err){
        res.json({message: err});
    }
});

module.exports = router;