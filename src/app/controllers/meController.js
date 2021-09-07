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
}


module.exports = new MeController