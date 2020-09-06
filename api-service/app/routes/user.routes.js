const express = require('express');
    const user = require('../controllers/user.controller.js');
    const login=require('../controllers/login.controller.js');
    const userRouter = new express.Router();
    // Create a new User
    userRouter.post('/create', user.createUser);

    // Retrieve all User
    userRouter.get('/all', user.findAll);

    // Retrieve a single User with id
    userRouter.get('/:id', user.findOne);

   
    // Update a User with id
    userRouter.put('/update/:id', user.updateUser);

    // Delete a User with id
    userRouter.delete('/delete/:id', user.deleteUser);

    userRouter.post('/login', login.login);
    module.exports = userRouter;
