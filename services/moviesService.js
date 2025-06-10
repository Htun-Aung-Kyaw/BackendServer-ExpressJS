let Movies = require('../model/moviesModel');

const getAllMovie = async ()=>
{
    let movies;
    movies = await Movies.find({});
    if(!movies.length) throw new Error('No movies found');
    return movies;
};
const getMovieById= async (movieId)=>{
    let movie = await Movies.findById(movieId);
    // console.log(movie);
    if(!movie) throw new Error('No movies found');
    return movie;
}
const searchMovieByTitle = async (movieTitle)=>
{
    let movie;
    movie = await Movies.find({
        title: {$regex: movieTitle},
    });
    if(!movie.length) throw new Error(`${movieTitle} not found`);
    return  movie;
}
const newMovie = async (movie)=> await new Movies(movie).save();

const updateMovie = async (movieId,movie)=>{
    let movieFound = await Movies.findById(movieId);
    if(!movieFound) throw new Error(`${movieId} not found`);
    let newMovie;
    newMovie = await Movies.findByIdAndUpdate(movieId, movie, {new: true});
    return newMovie;
}
const deleteMovie = async (movieId)=>{
    if (!await Movies.findById(movieId)) throw new Error(`${movieId} not found`);
    let deletedMovie;
    deletedMovie = await Movies.findByIdAndDelete(movieId);
    return deletedMovie;
}
module.exports = {
    getAllMovie,
    newMovie,
    getMovieById,
    updateMovie,
    deleteMovie,
    searchMovieByTitle,
}