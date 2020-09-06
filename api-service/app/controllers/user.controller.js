const User = require('../models/user.model.js');
var passwordGenerator = require('generate-password');
const bcryptjs = require('bcryptjs');
// Create and Save a new User
exports.createUser = async(req, res) => {
    // Create a User
    var password = passwordGenerator.generate({ length: 10, numbers: true });
    var hash = await bcryptjs.hash(password, 10);
    const user = new User({
        userName: req.body.userName,
        password:  hash,
        userRole:req.body.userRole
    });
    // Save User in the database
    user.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the User."
        });
    });
};

// Retrieve and return all User from the database.
exports.findAll = (req, res) => {
    User.find()
    .populate({ path: 'role', select: 'roleName' })
    .then(user => {
        res.send(user);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving User."
        });
    });
};

// Find a single User with a id
exports.findOne = (req, res) => {
    User.findById(req.params.id)
    .populate({ path: 'role', select: 'roleName' })
    .then(user => {
        if(!user) {
            return res.status(404).send({
                message: "User not found with id " + req.params.id
            });            
        }
        res.send(user);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "User not found with id " + req.params.id
            });                
        }
        return res.status(500).send({
            message: "Error retrieving User with id " + req.params.id
        });
    });
};

// Update a User identified by the id in the request
exports.updateUser = (req, res) => {
    // Find User and update it with the request body
    User.findByIdAndUpdate(req.params.id, {
        userName: req.body.userName,
        password:  req.body.password,
        userRole:req.body.userRole
    }, {new: true})
    .then(user => {
        if(!user) {
            return res.status(404).send({
                message: "User not found with id " + req.params.id
            });
        }
        res.send(user);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "User not found with id " + req.params.id
            });                
        }
        return res.status(500).send({
            message: "Error updating User with id " + req.params.id
        });
    });
};

// Delete a User with the specified id in the request
exports.deleteUser = (req, res) => {
    User.findByIdAndRemove(req.params.id)
    .then(user => {
        if(!user) {
            return res.status(404).send({
                message: "User not found with id " + req.params.id
            });
        }
        res.send({message: "User deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "User not found with id " + req.params.id
            });                
        }
        return res.status(500).send({
            message: "Could not delete User with id " + req.params.id
        });
    });
};


// exports.cancelOrder = (req, res) => {
//     // Find User and update it with the request body
//     User.findByIdAndUpdate(req.params.id, {
//        orderStatus: req.body.orderStatus, 
//     }, {new: true})
//     .then(user => {
//         if(!user) {
//             return res.status(404).send({
//                 message: "User not found with id " + req.params.id
//             });
//         }
//         res.send(user);
//     }).catch(err => {
//         if(err.kind === 'ObjectId') {
//             return res.status(404).send({
//                 message: "User not found with id " + req.params.id
//             });                
//         }
//         return res.status(500).send({
//             message: "Error updating User with id " + req.params.id
//         });
//     });
// };