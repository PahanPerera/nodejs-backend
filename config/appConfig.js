module.exports = {
    server:{
        port:process.env.PORT || 3000,
        secureEndPoints:true,
        requestLimit:4000000
    },
    database:{
        host:"localhost",
        port:27017,
        db:"bookShareDB"
    }
}