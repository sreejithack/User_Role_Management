const express = require('express');
    const role = require('../controllers/role.controller.js');
    const roleRouter = new express.Router();
    // Create a new Item
    roleRouter.post('/create', role.createRole);

    // Retrieve all item
    roleRouter.get('/all', role.findAll);

    // Retrieve a single Item with id
    roleRouter.get('/:id', role.findOne);

  
    // Update a Item with id
    roleRouter.put('/update/:id', role.updateRole);

    // Delete a Item with id
    roleRouter.delete('/delete/:id', role.deleteRole);
    module.exports = roleRouter;
