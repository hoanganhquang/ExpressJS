class SitesController {

    // [/home, GET]
    home(req, res){
        res.render('home')
    }
}


module.exports = new SitesController
