const express = require("express");
const router = express.Router();
const { check, validationResult } = require('express-validator/check');
const LoggerService = require('../services/LoggerService.js');
const CommentService = require('../services/CommentService.js');
const PostService = require('../services/PostService.js');

const AuthMiddleware = require('../middlewares/AuthMiddleware.js');

router.get('/api/comment/list', async (req, res) => {
    const commentService = new CommentService();
    try{
        var comments = await commentService.findAll();
        return res.json(
            {
                body:comments
            }
        )
    }catch(err){
        LoggerService.log(err);
        return res.status(500).json(
            {
                error:"Erro ao listar Comments"
            }
        )
    }
});

router.get('/api/post/:post_id/comment/list', async (req, res) => {
    const commentService = new CommentService();
    const postService = new PostService();
    try{
        var post = await postService.findById(req.params.post_id);
        if(!post)
            return res.status(400).json(
                {
                    error:"Post nao encontrado"
                }
            )
        
        //var comments = await commentService.findByField('post_id', req.params.post_id);
        var comments = await post.getComments();
        return res.json(
            {
                body:comments
            }
        )
    }catch(err){
        LoggerService.log(err);
        return res.status(500).json(
            {
                error:"Erro ao listar Comments"
            }
        )
    }
});

router.post('/api/comment', [
    AuthMiddleware,
    check('post_id').isInt().isLength({min:1}),
    check('text').isString().isLength({min:1})
]
, async (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }

    const commentService = new CommentService();
    try{
        var params = req.body;
        params.user_id = req.userId;
        var comments = await commentService.create(params);
        return res.json(
            {
                body:comments
            }
        )
    }catch(err){
        LoggerService.log(err);
        return res.status(500).json(
            {
                error:"Erro ao criar Comment"
            }
        )
    }
});

router.put('/api/comment', [
    AuthMiddleware,
    check('comment_id').isInt().isLength({min:1}),
    check('text').isString().isLength({min:1})
]
, async (req, res) => {
    
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }

    const commentService = new CommentService();
    try{
        var comment = await commentService.findByFields({id:req.body.comment_id,user_id:req.userId});
        if(!comment)
            return res.status(400).json(
                {
                    error:"Comment nao encontrado"
                }
            )

        await commentService.update({text:req.body.text}, {id:req.body.comment_id});
        comment = await commentService.findById(req.body.comment_id);
        return res.json(
            {
                body:comment
            }
        )
    }catch(err){
        LoggerService.log(err);
        return res.status(500).json(
            {
                error:"Erro ao atualizar Comment"
            }
        )
    }
});

router.delete('/api/comment', [
    AuthMiddleware,
    check('comment_id').isInt({min:1})
]
, async (req, res) => {
    
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }

    const commentService = new CommentService();
    try{
        var comment = await commentService.findByFields({id:req.body.comment_id,user_id:req.userId});
        if(!comment)
            return res.status(400).json(
                {
                    error:"Comment nao encontrado"
                }
            )

        await commentService.delete(req.body.comment_id);
        return res.json(
            {
                body:{}
            }
        )
    }catch(err){
        LoggerService.log(err);
        return res.status(500).json(
            {
                error:"Erro ao deletar Comment"
            }
        )
    }
});

module.exports = router;