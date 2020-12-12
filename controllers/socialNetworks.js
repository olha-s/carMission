const SocialNetworks = require("../models/SocialNetworks");
const _ = require("lodash");
const queryCreator = require("../commonHelpers/queryCreator");

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

exports.getSocialNetworksItem = (req, res, next) => {
  SocialNetworks.findOne({ _id: req.params.id })
    .then(item => res.json(item))
    .catch(err =>
      res.status(400).json({
        message: `Error happened on server: "${err}" `
      })
    );
};

exports.updateSocialNetworksItem = (req, res, next) => {
  SocialNetworks.findOne({ _id: req.params.id })
    .then(items => {
      if (!items) {
        return res
          .status(400)
          .json({ message: `Social-network with _id "${req.params.id}" is not found.` });
      } else {
        const socialNetworksData = _.cloneDeep(req.body);
        const updatedSocialNetworksItem = queryCreator(socialNetworksData);

        SocialNetworks.findOneAndUpdate(
          { _id: req.params.id },
          { $set: updatedSocialNetworksItem },
          { new: true }
        )
          .then(items => res.json(items))
          .catch(err =>
            res.status(400).json({
              message: `Error happened on server: "${err}" `
            })
          );
      }
    })
    .catch(err =>
      res.status(400).json({
        message: `Error happened on server: "${err}" `
      })
    );
};

exports.deleteSocialNetworksItem = (req, res, next) => {
  SocialNetworks.findOne({ _id: req.params.id }).then(async items => {
    if (!items) {
      return res
        .status(400)
        .json({ message: `Item with _id "${req.params.id}" is not found.` });
    } else {
      const socialNetworkToDelete = await SocialNetworks.findOne({ _id: req.params.id });

      SocialNetworks.deleteOne({ _id: req.params.id })
        .then(deletedCount =>
          res.status(200).json({
            message: `Social network "${socialNetworkToDelete.name}" is successfully deletes from DB. `
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


