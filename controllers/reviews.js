const Review = require("../models/Review");
const queryCreator = require("../commonHelpers/queryCreator");
const _ = require("lodash");

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
exports.updateReview = (req, res, next) => {
  Review.findOne({ _id: req.params.id })
    .then((review) => {
      if (!review) {
        return res.status(400).json({
          message: `Review with _id "${req.params.id}" is not found.`,
        });
      } else {
        const reviewData = _.cloneDeep(req.body);
        const updatedReview = queryCreator(reviewData);

        Review.findOneAndUpdate(
          { _id: req.params.id },
          { $set: updatedReview },
          { new: true }
        )
          .then((review) => res.json(review))
          .catch((err) =>
            res.status(400).json({
              message: `Error happened on server: "${err}" `,
            })
          );
      }
    })
    .catch((err) =>
      res.status(400).json({
        message: `Error happened on server: "${err}" `,
      })
    );
};

exports.deleteReview = (req, res, next) => {
  Review.findOne({ _id: req.params.id }).then(async review => {
    if (!review) {
      return res
        .status(400)
        .json({ message: `Review with _id "${req.params.id}" is not found.` });
    } else {
      const reviewToDelete = await Review.findOne({ _id: req.params.id });

      Review.deleteOne({ _id: req.params.id })
        .then(deletedCount =>
          res.status(200).json({
            message: `Review with _id "${reviewToDelete.id}" is successfully deletes from DB `
          })
        )
        .catch(err =>
          res.status(400).json({
            message: `Error happened on server: "${err}" `
          })
        );
    }
  });
};





