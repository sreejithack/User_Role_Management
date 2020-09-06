const Role = require('../models/role.model.js');

// Create and Save a new Role
exports.createRole = (req, res) => {
    // Create a Role
    const role = new Role({
        roleName: req.body.roleName,
    });

    // Save Role in the database
    role.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the Role."
        });
    });
};

// Retrieve and return all Role from the database.
exports.findAll = (req, res) => {
    Role.find()
    .then(roles => {
        res.send(roles);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving Role."
        });
    });
};

// Find a single Role with a id
exports.findOne = (req, res) => {
    Role.findById(req.params.id)
    .populate({ path: 'item', select: 'itemName' })
    .then(role => {
        if(!role) {
            return res.status(404).send({
                message: "role not found with id " + req.params.id
            });            
        }
        res.send(role);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "role not found with id " + req.params.id
            });                
        }
        return res.status(500).send({
            message: "Error retrieving Role with id " + req.params.id
        });
    });
};

// Update a Role identified by the id in the request
exports.updateRole = (req, res) => {
    // Find Role and update it with the request body
    Role.findByIdAndUpdate(req.params.id, {
        roleName: req.body.roleName,
    }, {new: true})
    .then(role => {
        if(!role) {
            return res.status(404).send({
                message: "Role not found with id " + req.params.id
            });
        }
        res.send(role);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Role not found with id " + req.params.id
            });                
        }
        return res.status(500).send({
            message: "Error updating Role with id " + req.params.id
        });
    });
};

// Delete a Role with the specified id in the request
exports.deleteRole = (req, res) => {
    Role.findByIdAndRemove(req.params.id)
    .then(role => {
        if(!role) {
            return res.status(404).send({
                message: "Role not found with id " + req.params.id
            });
        }
        res.send({message: "Role deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "Role not found with id " + req.params.id
            });                
        }
        return res.status(500).send({
            message: "Could not delete Role with id " + req.params.id
        });
    });
};


exports.cancelrole = (req, res) => {
    // Find role and update it with the request body
    Role.findByIdAndUpdate(req.params.id, {
       roleStatus: req.body.roleStatus, 
    }, {new: true})
    .then(role => {
        if(!role) {
            return res.status(404).send({
                message: "Role not found with id " + req.params.id
            });
        }
        res.send(role);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Role not found with id " + req.params.id
            });                
        }
        return res.status(500).send({
            message: "Error updating Role with id " + req.params.id
        });
    });
};