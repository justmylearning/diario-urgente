const express = require("express");
const router = express.Router();
const { check, validationResult } = require('express-validator/check');
const LoggerService = require('../services/LoggerService.js');
const CommentLikeService = require('../services/CommentLikeService.js');

const AuthMiddleware = require('../middlewares/AuthMiddleware.js');

router.get('/api/comment-like/list', async (req, res) => {
    const commentLikeService = new CommentLikeService();
    try{
        var commentLikes = await commentLikeService.findAll();
        return res.json(
            {
                body:commentLikes
            }
        )
    }catch(err){
        LoggerService.log(err);
        return res.status(500).json(
            {
                error:"Erro ao listar CommentLikes"
            }
        )
    }
});

router.post('/api/comment-like', [
    AuthMiddleware,
    check('comment_id').isInt().isLength({min:1})
]
, async (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }

    const commentLikeService = new CommentLikeService();
    try{
        var params = req.body;
        params.user_id = req.userId;
        var commentLikes = await commentLikeService.create(params);
        return res.json(
            {
                body:commentLikes
            }
        )
    }catch(err){
        LoggerService.log(err);
        return res.status(500).json(
            {
                error:"Erro ao criar CommentLikes: " + err
            }
        )
    }
});

router.delete('/api/comment-like', [
    AuthMiddleware,
    check('comment_like_id').isInt({min:1})
]
, async (req, res) => {
    
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }

    const commentLikeService = new CommentLikeService();
    try{
        var query = {
            id:req.body.comment_like_id,
            user_id:req.userId
        }
        var postLike = await commentLikeService.findByFields();
        if(!postLike)
            return res.status(400).json(
                {
                    error:"CommentLike nao encontrado"
                }
            )

        await commentLikeService.delete(req.body.comment_like_id);
        return res.json(
            {
                body:{}
            }
        )
    }catch(err){
        LoggerService.log(err);
        return res.status(500).json(
            {
                error:"Erro ao deletar CommentLike"
            }
        )
    }
});

module.exports = router;