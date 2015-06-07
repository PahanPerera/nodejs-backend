module.exports = function database(appConfig, mongoose) {

    this.init = function () {
        var dbUrl = "mongodb://" + appConfig.DB.host + "/" + appConfig.DB.databaseName;
        var db = mongoose.connect(dbUrl, function (err) {
            if (err) throw  err;
            console.log("[success] Connecting to database...");
        });

    };

    this.createSchema = function (fields) {
        return new mongoose.Schema(fields);
    };

    this.registerSchema = function(name, schema){
        return mongoose.model(name, schema);
    };

};

module.exports.$inject = ['appConfig', 'mongoose'];