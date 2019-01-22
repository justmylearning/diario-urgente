const jwt = require('jsonwebtoken');
const authConfig = require('../../config/auth.json');
module.exports = class AuthService{
    static async encrypt(payload){
        return await jwt.sign(payload, authConfig.secret,{expiresIn: 80000});
    }

    static async decrypt(token){
        return await jwt.verify(token, authConfig.secret, (err, decoded) => {
            if(err) return false;
            return decoded;
        });
    }
}