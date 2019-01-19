const express = require("express");
const router = express.Router();
const { check, validationResult } = require('express-validator/check');
const LoggerService = require('../services/LoggerService.js');
const PostLikeService = require('../services/PostLikeService.js');

const AuthMiddleware = require('../middlewares/AuthMiddleware.js');

router.get('/api/post-like/list', async (req, res) => {
    const postLikeService = new PostLikeService();
    try{
        var postLikes = await postLikeService.findAll();
        return res.json(
            {
                body:postLikes
            }
        )
    }catch(err){
        LoggerService.log(err);
        return res.status(500).json(
            {
                error:"Erro ao listar PostLikes"
            }
        )
    }
});

router.post('/api/post-like', [
    AuthMiddleware,
    check('post_id').isInt().isLength({min:1})
]
, async (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }

    const postLikeService = new PostLikeService();
    try{
        var params = req.body;
        params.user_id = req.userId;
        var postLikes = await postLikeService.create(params);
        return res.json(
            {
                body:postLikes
            }
        )
    }catch(err){
        LoggerService.log(err);
        return res.status(500).json(
            {
                error:"Erro ao criar PostLikes: " + err
            }
        )
    }
});

router.delete('/api/post-like', [
    AuthMiddleware,
    check('post_like_id').isInt({min:1})
]
, async (req, res) => {
    
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }

    const postLikeService = new PostLikeService();
    try{
        var query = {
            id:req.body.post_like_id,
            user_id:req.userId
        }
        var postLike = await postLikeService.findByFields();
        if(!postLike)
            return res.status(400).json(
                {
                    error:"PostLike nao encontrado"
                }
            )

        await postLikeService.delete(req.body.post_like_id);
        return res.json(
            {
                body:{}
            }
        )
    }catch(err){
        LoggerService.log(err);
        return res.status(500).json(
            {
                error:"Erro ao deletar PostLike"
            }
        )
    }
});

module.exports = router;