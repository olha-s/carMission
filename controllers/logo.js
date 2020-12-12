const Logo = require("../models/Logo");
const _ = require("lodash");
const queryCreator = require("../commonHelpers/queryCreator");

exports.addLogo = (req, res, next) => {

    const newLogo = new Logo(req.body);

    newLogo
        .save()
        .then(data => res.json(data))
        .catch(err =>
            res.status(400).json({
            message: `Error happened on server: "${err}" `
        })
        );

};

exports.getLogo = (req, res, next) => {
    Logo.find()
        .then(data => res.send(data))
        .catch(err =>
            res.status(400).json({
            message: `Error happened on server: "${err}" `
        })
    );
};

exports.deleteLogo = (req, res, next) => {
    Logo.findOne({ _id: req.params.id }).then(async logo => {
      if (!logo) {
        return res
          .status(400)
          .json({ message: `Logo with _id "${req.params.id}" is not found.` });
      } else { 
        Logo.deleteOne({ _id: req.params.id })
          .then(deletedCount =>
            res.status(200).json({
              message: `Logo is successfully deletes from DB. `
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

exports.updateLogoData = (req, res, next) => {
    Logo.findOne({ _id: req.params.id })
        .then(logo => {
        if (!logo) {
            return res
            .status(400)
            .json({ message: `Logo is not found.` });
        } else {
            const logoData = _.cloneDeep(req.body);
            const updatedLogoData = queryCreator(logoData);

            Logo.findOneAndUpdate(
            { _id: req.params.id },
            { $set: updatedLogoData },
            { new: true }
            )
            .then(logo => res.json(logo))
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
