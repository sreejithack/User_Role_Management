const bodyParser = require('body-parser');
const roleRouter = require('./role.routes.js');
const moduleRouter = require('./modules.routes');
const userRouter = require('./user.routes');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require("../../swagger.json");

const express = require('express');
const path = require('path');
module.exports = function (app) {
    app.use(bodyParser.urlencoded({ extended: true }))
    app.use(bodyParser.json())
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
    app.get('/', (req, res) => {
        res.json({ "message": "Welcome to User Role Management" });
    });
    
     
       app.use('/api/user', userRouter);
       app.use('/api/module', moduleRouter);
       app.use('/api/role', roleRouter);


}