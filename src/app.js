var express = require('express')
var IndexRoutes = require('./routes/index.routes')
var PlantsRoutes = require('./routes/plants.routes')
var AlertsRoutes = require('./routes/alerts.routes')
var EnciclopediaRoutes = require('./routes/enciclopedia.routes')
var UsersRoutes = require('./routes/users.routes')
var app = express() 

// Settings
app.set('port', process.env.PORT || 3000)
app.use(express.json())

// Routes
app.use(IndexRoutes)
app.use(PlantsRoutes)
app.use(AlertsRoutes)
app.use(EnciclopediaRoutes)
app.use(UsersRoutes)

module.exports = app

