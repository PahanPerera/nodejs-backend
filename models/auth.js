var AppError = require('./error');
var q = require('q');
var appConfig = require('../config/appConfig');


module.exports.secure = function (routeConfig, req) {
    var token = req.headers.authorization;
    if(token){
        token = token.split("Bearer ")[1];
    }
    var isLoginRequired = routeConfig.isLoginRequired;
    function throwLoginFail(){
        throw new AppError("User not authorized", 401);
    }
    if(!appConfig.server.secureEndPoints){
        return q.when(null);
    }
    if(!isLoginRequired){
        return q.when(null);
    }
    if(!token){
        throwLoginFail();
    }

    return q.when();

}