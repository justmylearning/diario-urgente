const express = require("express");
const router = express.Router();
const { check, validationResult } = require('express-validator/check');
const LoggerService = require('../services/LoggerService.js');
const UserService = require('../services/UserService.js');

const AuthMiddleware = require('../middlewares/AuthMiddleware.js');

router.get('/api/user/list', AuthMiddleware, async (req, res) => {
    try{
        const userService = new UserService();
        var users = await userService.findAll();
        res.json(
            {
                "users":users
            }
        );
    }catch(err){
        LoggerService.log(err);
        return res.status(500).json(
            {
                status:500
            }
        );
    }
});

router.post('/api/register', [
    check('name').isString().isLength({min:5}),
    check('email').isEmail(),
    check('password').isLength({min:5})
], async (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }

    try{
        const userService = new UserService();
        var user = await userService.create(req.body);
        if(user)
            res.status(200).json(
                {
                    "body":user
                }
            );
        else
            throw 'Erro ao cadastrar User';
    }catch(err){
        LoggerService.log(err);
        return res.status(500).json(
            {
                status:500
            }
        );
    }
});



module.exports = router;