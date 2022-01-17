const userDB = require('../model/userregister');
const bcrypt = require('bcrypt');

const registerservice = {}

//register a user
registerservice.register = (name, emailId, contactNo, password) => {
    return userDB.checkUser(contactNo).then((user) => {
        if (user) {
            let err = new Error("User Already Exists! Please login to continue")
            err.status = 403
            throw err;
        } else {
            return bcrypt.hash(password, 10).then((hashPassword) => {
                return userDB.registerUser(name, emailId, contactNo, hashPassword).then((user) => {
                    if (user) {
                        return "User Registered Successfully!"
                    }
                    else {
                        let err = new Error("User Registration Failed")
                        err.status = 401
                        throw err;
                    }
                })
            })
        }
    })
}

module.exports = registerservice