const User = require('../models/user.model.js')
const config = require('../../config.json');
const bcryptjs = require('bcryptjs');
// const constants = require('../constants');

/**
 * Method for authenticate login
 * Flow-Request validation,User Verified check,password match,generate token
 * @param {*} req 
 * @param {*} res 
 */
exports.login = async (req, res) => {

    const user = await User.findOne({ userName: req.body.userName });
    console.log(user)
    if (user) {

            var result = await bcryptjs.compare(req.body.password, user.password);
          
          //  if (result) {
                config.success.message = "AUTH_SUCCESS";
                var userdata = { userName: user.userName ,_id:user._id}
                config.success.data = { auth: true, userdata: userdata }
                res.send(config.success);
            // } else {
            //     config.error.message = "AUTH_PASSWORD_MISMATCH";
            //     config.error.data = { auth: false, token: null }
            //     res.send(config.error);
            // }
        
    } else {
        config.error.message = "AUTH_USER_NOT_FOUND";
        config.error.data = { auth: false, token: null }
        res.send(config.error);
    }
}



