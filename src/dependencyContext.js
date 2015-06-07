var dependencies = [
    {
        name:"expressApp",
        object:{
            module:require('express')()
        }
    },
    {
        name:"body-parser",
        object:{
            module:require('body-parser')
        }
    },
    {
        name:"mongoose",
        object:require('mongoose')
    }
];

var customDependencies = function(container){
    //do custom dependency injections here
    container.register("database",require("./database/database"), "singleton");
    container.register("userTable",require("./database/models/user"), "singleton");

    container.register("authController",require("./controllers/authController"), "singleton");
    container.register("mainController",require("./controllers/mainController"), "singleton");
};

module.exports.dependencies = dependencies;
module.exports.registerCustomDependencies = customDependencies;