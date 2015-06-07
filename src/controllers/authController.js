module.exports = function (userTable) {

    var userModel = userTable.Model;

    this.registerUser = function(req, res, next){

        var newUser = new userModel();
        newUser.username = req.body.username;
        newUser.password = req.body.password;
        newUser.email = req.body.email;
        newUser.save(function (err) {
            if(err) throw err;
            userModel.find({username:req.body.username}, function (err, users) {
                if(err || users.length == 0) {
                    throw err;
                }
                else{
                    res.send(users[0]);
                }

            });
        })
    };

};

module.exports.$inject = ['userTable'];