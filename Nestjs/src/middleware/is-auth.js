import * as jwt from 'jsonwebtoken';

module.exports = (req, res, next) =>{
    const authHeader = req.get('Authorization');
    if(!authHeader){
        req.isAuth = false;
        return next();
    }
    const token = authHeader.split(' ')[1];//Authorazation bearer token
    if(!token || token === ''){
        req.isAuth = false;
        return next();
    }
    let decodeToken;
    try{
        decodeToken = jwt.verify(token, 'SUPERSECRETKEYDONTREADTHIS');

    }
    catch(err){
        req.isAuth = false;
        return next();
    }
    if(!decodeToken){
        req.isAuth = false;
        return next();
    }

    req.isAuth = true;
    req.userId= decodeToken.userId;
    return next();
}