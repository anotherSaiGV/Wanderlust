const userDB = require('../model/userslogin');
const bcrypt = require('bcrypt');

const userService = {}

//login a user
userService.login = (contactNo, userPassword) => {
    return userDB.checkUser(contactNo).then((user) => {
        if (user == null) {
            let err = new Error("Enter registered contact number! If not registered, please register")
            err.status = 404
            throw err
        }
        else {
            return userDB.getPassword(contactNo).then((password) => {
                return bcrypt.compare(userPassword, password).then((result) => {
                    if (result == true) {
                        return user
                    }
                    else {
                        let err = new Error("Incorrect password")
                        err.status = 406
                        throw err
                    }
                })
                // if( password != userPassword ) {
                //     let err = new Error( "Incorrect password" )
                //     err.status = 406
                //     throw err
                // }
                // else{
                //     return user;
                // }
            })
        }
    })
}

module.exports = userService
