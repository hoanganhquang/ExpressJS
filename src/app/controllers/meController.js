const Course = require('../models/course')

class MeController {

    // [/me, GET]
    stored(req, res, next){
        
        Course.find({})
            .lean()
            .then((re)=>{
                res.render('me/stored', {
                    re
                })
            })
            .catch(next)
        

    }

    // [/archived/courses, GET]
    archived(req, res, next) {
        Course.findDeleted({})
            .lean()
            .then((re) => {
                res.render('me/archived', {
                    re
                })
            })
    }
}


module.exports = new MeController