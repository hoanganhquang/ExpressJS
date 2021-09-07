const Course = require('../models/course')

class CoursesController {

    // [/sources/:slug, GET]
    index(req, res, next) {
        Course.findOne({slug: req.params.slug})
        .lean()
        .then((result)=>{
            res.render('courses/show', {
                result
            })
        })
        .catch(next)
        
    };

    // [/courses/create, GET]
    create(req, res, next){
        res.render('courses/create')
    };

    // [/courses/newCourse, POST]
    newCourse(req, res, next){
        const data = req.body
        data.slug = req.body.name
        const course = new Course(data)
        course.save()
            .then(()=>{
                res.redirect('/')
            })
            .catch(next)
    }

    // [/courses/:id/edit, GET]
    edit(req, res, next){
        Course.findById(req.params.id)
            .lean()
            .then((re)=>{
                res.render('courses/edit', {
                    re
                })

            })
            .catch(next)
    }

    // [/courses/:id, PUT]
    update(req, res, next) {
        Course.updateOne({_id: req.params.id}, req.body)
            .then(()=>{
                res.redirect('/me/stored/courses')
            })
            .catch(next)
    }

    // [/courses/:id, DELETE]
    delete(req, res, next) {
        Course.delete({_id: req.params.id})
            .then((re) => {
                res.redirect('back')
            })
            .catch(next)
    }

    // [/courses/:id/force, DELETE]
    deleteForce(req, res, next) {
        Course.deleteOne({_id: req.params.id})
            .then((re) => {
                res.redirect('back')
            })
            .catch(next)
    }

    
    // [/courses/:id, PATCH]
    restore(req, res, next) {
        Course.restore({_id: req.params.id})
            .then((re) => {
                res.redirect('back')
            })
            .catch(next)
    }

    // [/cour]
}



module.exports = new CoursesController
