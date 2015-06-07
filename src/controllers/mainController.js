module.exports = function mainController(database){

    this.main = function(req, res){

        var newItem = new dbModels.UserModel();
        database.createItem(newItem);
        res.send("OKKK");
    };

};

module.exports.$inject = ['database'];