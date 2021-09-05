const newsRoute = require('./news')
const sitesRoute = require('./sites')
const coursesRoute = require('./courses')

function route(app) {

    app.use('/courses', coursesRoute)

    app.use('/news', newsRoute)

    app.use('/', sitesRoute)
       
}


module.exports = route
