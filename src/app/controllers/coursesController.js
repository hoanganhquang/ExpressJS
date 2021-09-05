const course = require('../models/course')

class CoursesController {

    // [/sources/:slug, GET]
    index(req, res) {
        course.findOne({slug: req.params.slug}, function(err, result){
            if (err) throw err
            res.send(result)
        })
    }

}



module.exports = new CoursesController
