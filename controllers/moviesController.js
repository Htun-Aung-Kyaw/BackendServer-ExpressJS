const movieService = require('../services/moviesService');
const req = require("express/lib/request");
const errorHandler = require("../middlewares/httpErrorHandler");

//error handler bind with getMovieFunctions
const getAllMovieHandler = async (req, res, next) =>{
    // const movies = await movieService.getAllMovie();
    console.log("Request User",req.user);
    res.status(200).json(await movieService.getAllMovie());
}
const getMovieByIdHandler = async (req, res, next) =>{
    let movieId = req.params['movieId'];
    res.status(200).json(await movieService.getMovieById(movieId));
}
async function findMovieByTitleHandler(req,res,next){
    let title = req.params['title'];
    res.status(200).json(await movieService.searchMovieByTitle(title));
}
const createMovieHandler = async (req,res,next)=>{
    let movie = req.body;
    console.log("Movie to save: ",movie);
    res.status(201).json(await movieService.newMovie(movie));
}
const updateMovieHandler = async (req,res,next)=>{
    let movieId = req.params['movieId'];
    let movie = req.body;
    res.status(200).json(await movieService.updateMovie(movieId,movie));
}
const deleteMovieHandler = async (req,res,next)=>{
    let movieId = req.params['movieId'];
    // Simulate Server Delay
    // await new Promise((resolve) => setTimeout(resolve, 3000));
    res.status(200).json(await movieService.deleteMovie(movieId));
}

//functions for router
const getAllMovie = async (req,res,next) => {
    await errorHandler.httpErrorHandler(getAllMovieHandler,404)(req,res,next);
}
async function getMovieById(req, res, next)
{
    await errorHandler.httpErrorHandler(getMovieByIdHandler,404)(req,res,next);
}
const findMovieByTitle = async function (req,res,next)
{
    await errorHandler.httpErrorHandler(findMovieByTitleHandler,404)(req,res,next);
}
const newMovie = async function(req,res,next)
{
    await errorHandler.httpErrorHandler(createMovieHandler,400)(req,res,next);
}
const updateMovie = async function (req,res,next)
{
    await errorHandler.httpErrorHandler(updateMovieHandler,400)(req,res,next);
}
const deleteMovie = async (req,res,next)=>{
    await errorHandler.httpErrorHandler(deleteMovieHandler,404)(req,res,next);
}

module.exports = {
    getAllMovie,
    getMovieById,
    findMovieByTitle,
    newMovie,
    updateMovie,
    deleteMovie,
}