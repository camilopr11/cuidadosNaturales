const express = require('express');
const indexRoutes = require('./routes/index.routes');
const plantsRoutes = require('./routes/plants.routes');
const app = express(); 
app.use(express.json());

app.use(indexRoutes);
app.use(plantsRoutes);


module.exports = app;