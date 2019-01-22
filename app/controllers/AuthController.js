const express = require("express");
const router = express.Router();
const bcrypt = require('bcryptjs');
const { check, validationResult } = require('express-validator/check');
const UserService = require('../services/UserService.js');
const AuthService = require('../services/AuthService.js');

const nodemailerConfig = require('../../config/nodemailer.json');


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

router.get('/api/forgot', [
    check('email').isEmail()
], async (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }

    const userService = new UserService();
    const email = req.query.email
    var user = await userService.findByField('email', email);
    if(!user)
        return res.status(400).json(
            {
                message:"Usuario nao encontrado"
            }
        );
    
    var token = await AuthService.encrypt({id:user.id});
    var nodemailer = require('nodemailer');
    var transporter = nodemailer.createTransport({
        service: nodemailerConfig.service,
        auth: {
            user: nodemailerConfig.email,
            pass: nodemailerConfig.password
        }
    });
    
    const mailOptions = { 
        from: nodemailerConfig.email,
        to: user.email,
        subject: 'Solicitação para redefinição de senha',
        html: `Token: ${token}`
    };


    await new Promise( (resolve, reject) => {
        transporter.sendMail(mailOptions, (err, info) => {
            if(err){
                console.log('Error: ' + err);
                res.status(500).json(
                    {
                        message: "Erro ao enviar e-mail! Tente novamente mais tarde"
                    }
                );

            }
            else{
                console.log(info);
                res.json(
                    {
                        body:{
                            message: "OK"
                        }
                    }
                );

            }
        });
    });


});

router.post('/api/reset-password', [
    check('token').isString().isLength({min: 10}),
    check('new_password').isLength({min:5})
], async (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }

    const userService = new UserService();
    const decoded = await AuthService.decrypt(req.body.token);
    if(!decoded)
        return res.status(400).json(
            {
                message:"Token inválido"
            }
        );
    
    var user = await userService.findById(decoded.id);
    if(!user)
        return res.status(400).json(
            {
                message:"Usuario nao encontrado"
            }
        );
        
    userService.update({password: req.body.new_password}, {id: decoded.id});

    return res.json(
        {
            body:{
                message:"OK"
            }
        }
    );

});

module.exports = router;