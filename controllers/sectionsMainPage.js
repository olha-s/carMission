const SectionMainPage = require("../models/SectionMainPage");

exports.addSectionMainPage = (req, res, next) => {
  const newSectionMainPage = new SectionMainPage(req.body);

  newSectionMainPage
    .save()
    .then((data) => res.json(data))
    .catch((err) =>
      res.status(400).json({
        message: `Error happened on server: "${err}" `,
      })
    );
};

exports.getSectionsMainPage = (req, res, next) => {
  SectionMainPage.find()
    .then((data) => res.send(data))
    .catch((err) =>
      res.status(400).json({
        message: `Error happened on server: "${err}" `,
      })
    );
};

exports.deleteAllSectionsMainPage = (req, res, next) => {
  SectionMainPage.deleteMany({}).then(() => {
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
