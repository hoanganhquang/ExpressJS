const newsRoute = require('./news')
const sitesRoute = require('./sites')

function route(app) {

    app.use('/news', newsRoute)

    app.use('/', sitesRoute)
       
}


module.exports = route
