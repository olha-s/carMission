const Logo = require("../models/Logo");
const _ = require("lodash");


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

