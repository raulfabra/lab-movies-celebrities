// starter code in both routes/celebrities.routes.js and routes/movies.routes.js

const router = require("express").Router();

const Celebrity = require("../models/Celebrity.model");
const Movie = require("../models/Movie.model")

// all your routes here

router.get("/create", (req, res, next) => {
    Celebrity.find()
    .then(result => {
        res.render("movies/new-movie", {result})
    })
    .catch((err) => console.log(`Err while displaying the form with params: ${err}`));
});
router.post("/create", (req, res, next) => {
    // console.log("Nueva peli: ", req.body)
    const {title, genre, plot, cast} = req.body;

    Movie
    .create({title, genre, plot, cast})
    .then(() => {
               res.redirect("/movie/movies")
    })
    .catch((err) => console.log(`Err while displaying new-movie page: ${err}`));
});
router.get("/movies", (req,res,next) => {
    Movie.find()
    .then(result => {
        res.render("movies/movies", {result})
    })
});


router.get("/:id", (req, res, next) => {
    let moviesId = req.params.id;

    Movie.findById(moviesId)
    .populate("cast")
    .then(result2 => {
        console.log(result2)
        res.render("movies/movie-details", {result2})
    })
    .catch((err) => console.log(`Err while displaying new-movie page: ${err}`));
})

router.post("/:id/delete", (req,res, next) => {
    const moviesId = req.params.id;

    Movie.findByIdAndRemove(moviesId)
    .then(() => {
        res.redirect("/movie/movies")
    })
    .catch((err) => console.log(`Err while displaying new-movie page: ${err}`));
})

router.get("/:id/edit", (req,res,next) => {
    console.log("esto es req", req.params)
    let moviesId = req.params.id;
    Movie.findById(moviesId)
    .then(result => {
        Celebrity.find()
        .then (data => {
            let total = {
                result : result,
                data : data
            }
            res.render("movies/edit-movie", total)
        })
    })
});

router.post("/:id/edit", (req, res, next) => {
    let moviesId = req.params.id;
    const {title, genre, plot, cast} = req.body;

    Movie
    .findByIdAndUpdate(moviesId, {title, genre, plot, cast}, {new: true})
    .then(() => {
        res.redirect(`/movie/${moviesId}`)
    })
    .catch((err) => console.log(`Err while displaying new-movie page: ${err}`));
});

module.exports = router;