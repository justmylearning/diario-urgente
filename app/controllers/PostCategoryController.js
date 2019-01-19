const express = require("express");
const router = express.Router();
const { check, validationResult } = require('express-validator/check');
const LoggerService = require('../services/LoggerService.js');
const PostCategoryService = require('../services/PostCategoryService.js');

const AuthMiddleware = require('../middlewares/AuthMiddleware.js');

router.get('/api/post-category/list', async (req, res) => {
    const postCategoryService = new PostCategoryService();
    try{
        var postCategories = await postCategoryService.findAll();
        return res.json(
            {
                body:postCategories
            }
        )
    }catch(err){
        LoggerService.log(err);
        return res.status(500).json(
            {
                error:"Erro ao listar PostCategorys"
            }
        )
    }
});

router.post('/api/post-category', [
    AuthMiddleware,
    check('name').isString().isLength({min:5})
]
, async (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }

    const postCategoryService = new PostCategoryService();
    try{
        var postCategory = await postCategoryService.create(req.body);
        return res.json(
            {
                body:postCategory
            }
        )
    }catch(err){
        LoggerService.log(err);
        return res.status(500).json(
            {
                error:"Erro ao criar PostCategory"
            }
        )
    }
});

router.put('/api/post-category', [
    AuthMiddleware,
    check('post_category_id').isInt().isLength({min:1}),
    check('name').isString().isLength({min:5})
]
, async (req, res) => {
    
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }

    const postCategoryService = new PostCategoryService();
    try{
        var postCategory = await postCategoryService.findById(req.body.post_category_id);
        if(!postCategory)
            return res.status(400).json(
                {
                    error:"PostCategory nao encontrado"
                }
            )

        await postCategoryService.update(req.body, {id:req.body.post_category_id});
        postCategory = await postCategoryService.findById(req.body.post_category_id);
        return res.json(
            {
                body:postCategory
            }
        )
    }catch(err){
        LoggerService.log(err);
        return res.status(500).json(
            {
                error:"Erro ao atualizar PostCategory"
            }
        )
    }
});

router.delete('/api/post-category', [
    AuthMiddleware,
    check('post_category_id').isInt({min:1})
]
, async (req, res) => {
    
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }

    const postCategoryService = new PostCategoryService();
    try{
        var postCategory = await postCategoryService.findById(req.body.post_category_id);
        if(!postCategory)
            return res.status(400).json(
                {
                    error:"PostCategory nao encontrado"
                }
            )

        await postCategoryService.delete(req.body.post_category_id);
        return res.json(
            {
                body:{}
            }
        )
    }catch(err){
        LoggerService.log(err);
        return res.status(500).json(
            {
                error:"Erro ao deletar PostCategory"
            }
        )
    }
});

module.exports = router;