const express = require("express");
const router = express.Router();
const bcrypt = require('bcryptjs');
const { check, validationResult } = require('express-validator/check');
const UserService = require('../services/UserService.js');
const AuthService = require('../services/AuthService.js');

router.post('/api/auth', [
    check('email').isEmail(),
    check('password').isLength({min:5})
], async (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }

    const userService = new UserService();
    const email = req.body.email;
    var user = await userService.findByField('email', email);
    if(!user)
        return res.status(400).json(
            {
                message:"Usuario nao encontrado"
            }
        );

    if(!await bcrypt.compare(req.body.password, user.password))
        return res.status(400).json(
            {
                message:"Senha incorreta"
            }
        );
    
    var token = await AuthService.encrypt({id:user.id});

    return res.json(
        {
            body:{
                user:user,
                token:token
            }
        }
    );

});

module.exports = router;