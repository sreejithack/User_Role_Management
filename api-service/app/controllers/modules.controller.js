const Modules = require('../models/modules.model.js');
// Create and Save a new Module
exports.createModule = (req, res) => {
    // Create a Module
    const Module = new Modules({
        moduleName: req.body.moduleName,
        user:req.body.user,
    });

    // Save Module in the database
    Module.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the Module."
        });
    });
};

// Retrieve and return all Module from the database.
exports.findAll = (req, res) => {
    Modules.find()
    .then(Modules => {
        res.send(Modules);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving Module."
        });
    });
};

// Find a single Module with a id
exports.findOne = (req, res) => {
    Modules.findById(req.params.id)
    .populate({ path: 'item', select: 'itemName' })
    .then(Module => {
        if(!Module) {
            return res.status(404).send({
                message: "Module not found with id " + req.params.id
            });            
        }
        res.send(Module);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Module not found with id " + req.params.id
            });                
        }
        return res.status(500).send({
            message: "Error retrieving Module with id " + req.params.id
        });
    });
};

// Update a Module identified by the id in the request
exports.updateModule = (req, res) => {
    // Find Module and update it with the request body
    Modules.findByIdAndUpdate(req.params.id, {
        moduleName: req.body.moduleName,
        user:req.body.user,
    }, {new: true})
    .then(Module => {
        if(!Module) {
            return res.status(404).send({
                message: "Module not found with id " + req.params.id
            });
        }
        res.send(Module);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Module not found with id " + req.params.id
            });                
        }
        return res.status(500).send({
            message: "Error updating Module with id " + req.params.id
        });
    });
};

// Delete a Module with the specified id in the request
exports.deleteModule = (req, res) => {
    Modules.findByIdAndRemove(req.params.id)
    .then(Module => {
        if(!Module) {
            return res.status(404).send({
                message: "Module not found with id " + req.params.id
            });
        }
        res.send({message: "Module deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "Module not found with id " + req.params.id
            });                
        }
        return res.status(500).send({
            message: "Could not delete Module with id " + req.params.id
        });
    });
};
