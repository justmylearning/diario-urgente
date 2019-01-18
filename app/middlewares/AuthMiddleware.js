const AuthService = require('../services/AuthService.js');

module.exports = async (req, res, next) => {

    const authHeader = req.headers.authorization;
    if(!authHeader)
        return res.status(401).json(
            {
                message:"No token provided"
            }
        );
    
    const parts = authHeader.split(' ');
    if(!parts.length == 2)
        return res.status(401).json(
            {
                message:"Invalid header format: bearer $token"
            }
        );
    
    const [schema, token] = parts;
    if(!schema.toLowerCase() == 'bearer')
        return res.status(401).json(
            {
                message:"Invalid header format: bearer $token"
            }
        );

    const decoded = await AuthService.decrypt(token);
    if(!decoded)
        return res.status(401).json(
            {
                "message":"Invalid token"
            }
        );

    req.userId = decoded.id;
    return next();


}