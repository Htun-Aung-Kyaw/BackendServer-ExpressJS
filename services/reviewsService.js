let Reviews = require('../model/reviewsModel');

const getAllReview = async ()=> await Reviews.find();

const getReviewById = async(reviewId)=> await Reviews.findById(reviewId);

const getReviewByMovieId = async(movieId)=> await Reviews.find({movie:movieId});

const saveReview = async(review)=>{
    // const newReview = new Reviews({
    //     movie: mongoose.Types.ObjectId(review.movie),
    //     rating: review.rating,
    //     review: review.review,
    // });
    const newReview = new Reviews(review);
    await newReview.save();
    return newReview; //populate('movie') populate ကို ref ထားတဲ့ collection ဒေတာကိုပါ join ပြီးပြဖို့ သုံးတယ်
}

const updateReview = async(reviewId,review)=>{
    // review.movie = mongoose.Types.ObjectId(review.movie);
    //console.log('Review Id ',reviewId, ' Review ',review);
    if(!await Reviews.findById(reviewId)) throw new Error(`review Id: ${reviewId} not found`);
    let updatedReview;
    updatedReview = await Reviews.findByIdAndUpdate(reviewId, review, {new: true});
    return updatedReview;
    // return updatedReview.populate("movie");
}

const deleteReview= async(reviewId)=>{
    let deletedReview;
    deletedReview = await Reviews.findByIdAndDelete(reviewId);
    return deletedReview;
}

module.exports = {
    getAllReview,
    getReviewById,
    saveReview,
    getReviewByMovieId,
    updateReview,
    deleteReview,
}