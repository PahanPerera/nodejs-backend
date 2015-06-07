var resources = [
    {
        controller:"authController",
        router:[
            {
                method:"post",
                path:"/user",
                use:"registerUser"
            }
        ]
    }

];

module.exports.resourses = resources;