module.exports = function userTable(database){

    var UserSchema = database.createSchema({
        username: String,
        password:String,
        email:String
    });

    this.Model = database.registerSchema('User', UserSchema);

};
module.exports.$inject = ['database'];