const SocialNetworks = require("../models/SocialNetworks");
const _ = require("lodash");


exports.addSocialNetworksData = (req, res, next) => {

    const newSocialNetworks = new SocialNetworks(req.body);

    newSocialNetworks
        .save()
        .then(data => res.json(data))
        .catch(err =>
            res.status(400).json({
            message: `Error happened on server: "${err}" `
        })
        );

};

exports.getSocialNetworksData = (req, res, next) => {
    SocialNetworks.find()
        .then(data => res.send(data))
        .catch(err =>
            res.status(400).json({
            message: `Error happened on server: "${err}" `
        })
    );
};


exports.deleteAllSocialNetworksData = (req, res, next) => {
    SocialNetworks.deleteMany({}).then(() => {
      res
        .status(200)
        .json({
          message: "you've just deleted all data from collection",
        })
        .catch((err) => {
          res.status(400).json({
            message: `Error happened on server: "${err}" `,
          });
        });
    });
  };