console.log("Starting server ...");
console.log("Loading server config ...");
var appConfig = require('./config/appConfig'),
    express = require('express'),
    async = require('async'),
    //mongoose = require('mongoose'),
    bodyParser = require('body-parser'),
    auth = require('./models/auth'),
    http = require('http'),
    q = require('q');

//mongoose.Promise = q.Promise;
var app = express();
var port = appConfig.server.port;

app.use(bodyParser.json({limit:appConfig.server.requestLimit}));
app.use("/web-app",express.static('www/app'));

var routes = require('./config/routesConfig');
async.forEach(routes, function (route) {
    var controller = require("./controllers/" + route.controller + "Controller");
    async.forEachOf(route.route, function (value, key) {
        console.log('Registering ' + route.controller + ":" + key);
        app[key](value.path, function (req, res, next) {
            try {
                var securePromise = auth.secure(value, req);
                securePromise.then(()=>{
                    return controller[key](req);
                }).then((results)=> {
                    res.status(200);
                    res.send(results);
                }).catch((err)=> {
                    handleError(err, res);
                }).done();
            }catch(err){
                handleError(err, res);
            }
        });
    });
});

function handleError(err, res){
    console.log(err);
    if(err.name == 'AppError'){
        res.status(err.code);
        delete err.code;
        res.send(err);
    }else{
        res.status(500);
        res.send({
            name:err.name,
            message:err.message
        })
    }
}
//var mongoDBUrl = 'mongodb://' + appConfig.database.host + ':' + appConfig.database.port + "/" + appConfig.database.db;
//if(process.env.MONGODB_URI){
//    mongoDBUrl = process.env.MONGODB_URI;
//}
//mongoose.connect(mongoDBUrl);
//var db = mongoose.connection;
//var dbFn = q.nbind(db.on, db);
//dbFn('open').then(()=>{
//    console.log('Connecting to Database...'+mongoDBUrl);
    var server = http.createServer(app);
    server.listen(port);
    console.log('Sever listening at http://localhost:%s ...', port);
//}).done();
//dbFn('error').catch((err)=>{
//    console.error("Error while connecting to the Database ...");
//    console.log(err);
//}).done();




