const express = require('express')
const routes = express.Router()
const siteController = require('../app/controllers/sitesControllers')

routes.get('/', siteController.home)


module.exports = routes
