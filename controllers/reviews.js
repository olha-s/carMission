const Review = require("../models/Review");

exports.addReview = (req, res, next) => {

  const newReview = new Review(req.body);

  newReview
    .save()
    .then(data => res.json(data))
    .catch(err =>
      res.status(400).json({
        message: `Error happened on server: "${err}" `
      })
    );

};

exports.getReviews = (req, res, next) => {
  Review.find()
    .then(data => res.send(data))
    .catch(err =>
      res.status(400).json({
        message: `Error happened on server: "${err}" `
      })
    );
};


