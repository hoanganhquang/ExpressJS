const course = require('../models/course')
class SitesController {

    // [/home, GET]
    home(req, res, next){
        
        course.find({})
        .lean()
            .then(course => {
                res.render('home', {
                    course
                })
            })
            .catch(next)

    }
}


module.exports = new SitesController
