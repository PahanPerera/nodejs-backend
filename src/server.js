(function Main() {
    'use strict';

    console.log("[start] Init configs...");
    var appConfig = require('./config/appConfig');
    //Init logger
    console.log("[start] Init logger...");
    var loggerConfigs = require('./config/loggerConfig');
    var winston = require('winston');
    var transportsFromConfig = [];
    for (var i in loggerConfigs.winstonTransports) {
        var transport = loggerConfigs.winstonTransports[i];
        var newTransport = new (winston.transports[transport.type])(transport.options);
        transportsFromConfig.push(newTransport);
    }
    var logger = new (winston.Logger)({
        transports: transportsFromConfig
    });

    process.console = logger;
    console.log = logger.info;
    logger.info('[success] Overriding console.log...');
    console.log("[success] Init logger...");
    //Finish Logger

    //Init DI
    console.log("[start] Init Dependency injection...");
    var intravenous = require('intravenous');
    var container = intravenous.create();
    //Mandotory Dependencies
    container.register('logger', logger, 'singleton');
    container.register('appConfig', appConfig, 'singleton');

    var depConfigs = require('./dependencyContext');
    for (var i in depConfigs.dependencies) {
        var dep = depConfigs.dependencies[i];
        container.register(dep.name, dep.object, 'singleton');
    }
    console.log("[success] Registering required...");


    //Register custom dependencies
    depConfigs.registerCustomDependencies(container);
    console.log("[success] Registering custom dependencies...");
    console.log("[success] Init Dependency injection...");


    //Load Middleware
    var app = container.get('expressApp').module;
  //  var app = express();
    var bodyParser = container.get('body-parser').module;
    app.use(bodyParser.json());
    console.log("[success] Loading middleware...");

    //Init Database
    var db = container.get('database');
    db.init();

    //Load controllers
    var appResources = require('./resources');
    for(var i in appResources.resourses){
        var resource = appResources.resourses[i];
        var controller = container.get(resource.controller);
        for(var j in resource.router){
            var route = resource.router[j];
            app[route.method](route.path,controller[route.use]);
        }

    }
    console.log("[success] Loading app resources...");

    //Start server
    var http = require('http');
    var port = process.env.PORT || appConfig.PORT;
    http.createServer(app).listen(port);
    console.log('[success] Server started on port '+port + "...");

})();