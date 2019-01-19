const express = require("express");
const router = express.Router();
const { check, validationResult } = require('express-validator/check');
const LoggerService = require('../services/LoggerService.js');
const PostService = require('../services/PostService.js');

const AuthMiddleware = require('../middlewares/AuthMiddleware.js');

router.get('/api/post/list', async (req, res) => {
    const postService = new PostService();
    try{
        var posts = await postService.findAll();
        return res.json(
            {
                body:posts
            }
        )
    }catch(err){
        LoggerService.log(err);
        return res.status(500).json(
            {
                error:"Erro ao listar Posts"
            }
        )
    }
});

router.get('/api/post/category/:category_id', async (req, res) => {
    const postService = new PostService();
    try{
        var posts = await postService.findByField('category_id', req.params.category_id);
        return res.json(
            {
                body:posts
            }
        )
    }catch(err){
        LoggerService.log(err);
        return res.status(500).json(
            {
                error:"Erro ao listar Posts"
            }
        )
    }
});

router.post('/api/post', [
    AuthMiddleware,
    check('category_id').isInt().isLength({min:1}),
    check('title').isString().isLength({min:5}),
    check('html_content').isString().isLength({min:5})
]
, async (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }

    const postService = new PostService();
    try{
        var posts = await postService.create(req.body);
        return res.json(
            {
                body:posts
            }
        )
    }catch(err){
        LoggerService.log(err);
        return res.status(500).json(
            {
                error:"Erro ao criar Post"
            }
        )
    }
});

router.put('/api/post', [
    AuthMiddleware,
    check('post_id').isInt({min:1}),
    check('category_id').isInt().isLength({min:1}),
    check('title').isString().isLength({min:5}),
    check('html_content').isString().isLength({min:5})
]
, async (req, res) => {
    
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }

    const postService = new PostService();
    try{
        var post = await postService.findById(req.body.post_id);
        if(!post)
            return res.status(400).json(
                {
                    error:"Post nao encontrado"
                }
            )

        await postService.update(req.body, {id:req.body.post_id});
        post = await postService.findById(req.body.post_id);
        return res.json(
            {
                body:post
            }
        )
    }catch(err){
        LoggerService.log(err);
        return res.status(500).json(
            {
                error:"Erro ao atualizar Post"
            }
        )
    }
});

router.delete('/api/post', [
    AuthMiddleware,
    check('post_id').isInt({min:1})
]
, async (req, res) => {
    
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }

    const postService = new PostService();
    try{
        var post = await postService.findById(req.body.post_id);
        if(!post)
            return res.status(400).json(
                {
                    error:"Post nao encontrado"
                }
            )

        await postService.delete(req.body.post_id);
        return res.json(
            {
                body:{}
            }
        )
    }catch(err){
        LoggerService.log(err);
        return res.status(500).json(
            {
                error:"Erro ao deletar Post"
            }
        )
    }
});

module.exports = router;