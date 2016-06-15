module.exports = function AppError(message, code) {
    var err = new Error();
    err.name = this.constructor.name;
    err.message = message;
    err.code = code;
    return err;
};
