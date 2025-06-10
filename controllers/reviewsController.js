var reviewService = require('../services/reviewsService');
const errorHandler = require('../middlewares/httpErrorHandler');

//Handlers
const getAllReviewsHandler = async function(req, res, next) {
    const reviews = await reviewService.getAllReview();
    if(!reviews.length) throw new Error('No reviews yet');
    await res.status(200).json(reviews);
}
const getReviewByIdHandler = async (req, res, next) => {
    let reviewId = req.params['reviewId'];
    const review = await reviewService.getReviewById(reviewId);
    if(!review) throw new Error(`No review for Id:${reviewId} found`);
    await res.status(200).json(review);
}
const getReviewByMovieIdHandler = async (req, res, next) => {
    let movieId = req.params['movieId'];
    const review = await reviewService.getReviewByMovieId(movieId);
    if(!review.length) throw new Error(`No review for movieId:${movieId} found`);
    await res.status(200).json(review);
}
const saveReviewHandler = async (req,res,next)=>{
    const body = req.body;
    const review = await reviewService.saveReview(body);
    if(!review) throw Error('review cannot be saved');
    await res.status(201).json(review);
}
const updateReviewHandler = async (req,res,next)=>{
    let reviewId = req.params['reviewId'];
    let review = req.body;
    console.log(`update review ${reviewId} `,req.body);
    const updateReview = await reviewService.updateReview(reviewId,review);
    console.log('Updated Review ',updateReview);
    if(!updateReview) throw new Error('Cannot update Review');
    await res.status(200).json(updateReview);
}
const deleteReviewHandler = async (req,res,next)=>{
    let reviewId = req.params['reviewId'];
    const deleteReview = await reviewService.deleteReview(reviewId);
    if(!deleteReview) throw Error('Cannot delete review');
    await res.status(200).json(deleteReview);
}

//Functions for Route
const getAllReview = async (req, res, next) => {
    await errorHandler.httpErrorHandler(getAllReviewsHandler,404)(req, res, next);
}
const getReviewById = async (req, res, next) => {
    await errorHandler.httpErrorHandler(getReviewByIdHandler,404)(req,res,next);
}
const getReviewByMovieId = async (req,res,next)=>{
    await errorHandler.httpErrorHandler(getReviewByMovieIdHandler,400)(req,res,next);
};
const saveReview = async (req,res,next)=>{
   await errorHandler.httpErrorHandler(saveReviewHandler,400)(req,res,next);
}
const updateReview = async function (req,res,next)
{
    await errorHandler.httpErrorHandler(updateReviewHandler,400)(req,res,next);
}
const deleteReview = async (req,res,next)=>{
    await errorHandler.httpErrorHandler(deleteReviewHandler,400)(req,res,next);
}

module.exports = {
    getAllReview,
    getReviewById,
    getReviewByMovieId,
    saveReview,
    updateReview,
    deleteReview,
}