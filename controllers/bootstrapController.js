var AppError = require('../models/error');
var q = require('q');
var appConfig = require('../config/appConfig');
var bootstrapUtil = require('../utilities/bootstrapUtil');

module.exports.get = function(req){

    var res = bootstrapUtil.testMethod();
    return q.when(res);
}