var express = require('express');
var router = express.Router();
var review = require('../controllers/reviewsController');

router.get('/', review.getAllReview);
router.get('/movies/:movieId',review.getReviewByMovieId);
router.get('/:reviewId', review.getReviewById);
router.post('/',review.saveReview);
router.put('/:reviewId',review.updateReview);
router.delete('/:reviewId',review.deleteReview);

module.exports = router;