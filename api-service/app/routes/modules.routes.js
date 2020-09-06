const express = require('express');
    const modules = require('../controllers/modules.controller.js');
    const moduleRouter = new express.Router();
    // Create a new Item
    moduleRouter.post('/create', modules.createModule);

    // Retrieve all item
    moduleRouter.get('/all', modules.findAll);

    // Retrieve a single Item with id
    moduleRouter.get('/:id', modules.findOne);

  
    // Update a Item with id
    moduleRouter.put('/update/:id', modules.updateModule);

    // Delete a Item with id
    moduleRouter.delete('/delete/:id', modules.deleteModule);
    module.exports = moduleRouter;
