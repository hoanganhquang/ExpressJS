const newsRoute = require('./news')
const sitesRoute = require('./sites')
const coursesRoute = require('./courses')
const meRoute = require('./me')

function route(app) {

    app.use('/me', meRoute)

    app.use('/courses', coursesRoute)

    app.use('/news', newsRoute)

    app.use('/', sitesRoute)
       
}


module.exports = route
