// starter code in both routes/celebrities.routes.js and routes/movies.routes.js

const router = require("express").Router();
const Celebrity = require("../models/Celebrity.model")

// all your routes here
router.get("/create", (req, res, next) => {
    res.render("celebrities/new-celebrity")
    
});

router.post("/create", (req, res, next) => {
    
     let {name, occupation, catchPhrase} = req.body

    Celebrity
    .create({name, occupation, catchPhrase})
    .then(result => {
        console.log("new celebrity created:", result)
        res.redirect("/celebrities")
    })
    .catch(err => next(err))
});

router.get("/", (req, res, next) => {
    
    Celebrity.find()
    .then(result => {
        res.render("celebrities/celebrities", result)
    })
    .catch(err => next(err))

})


module.exports = router;