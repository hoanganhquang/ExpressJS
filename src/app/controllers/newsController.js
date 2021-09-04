class NewController {

    // [/news, GET]
    index(req, res){
        res.render('news')
    }
    
    // [/news/slug, GET]
    show(req, res){
        res.send(req.params)
    }

}

module.exports = new NewController
