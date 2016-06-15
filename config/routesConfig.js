module.exports = [
    {
        controller: "bootstrap",
        route: {
            get: {path: "/api/bootstrap", isLoginRequired: false}
        }
    }
];