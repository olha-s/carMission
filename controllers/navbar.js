const Navbar = require("../models/Navbar");
const _ = require("lodash");


exports.addNavbarItem = (req, res, next) => {

    const newNavbar = new Navbar(req.body);

    newNavbar
        .save()
        .then(data => res.json(data))
        .catch(err =>
            res.status(400).json({
            message: `Error happened on server: "${err}" `
        })
        );

};

exports.getNavbarItem = (req, res, next) => {
    Navbar.find()
        .then(data => res.send(data))
        .catch(err =>
            res.status(400).json({
            message: `Error happened on server: "${err}" `
        })
    );
};

exports.deleteNavbarItem = (req, res, next) => {
    Navbar.findOne({ _id: req.params.id }).then(async item => {
      if (!item) {
        return res
          .status(400)
          .json({ message: `Item with _id "${req.params.id}" is not found.` });
      } else {
        const itemToDelete = await Navbar.findOne({ _id: req.params.id });
  
        Navbar.deleteOne({ _id: req.params.id })
          .then(deletedCount =>
            res.status(200).json({
              message: `Item witn name "${itemToDelete.name}" is successfully deletes from DB `
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
  
  


