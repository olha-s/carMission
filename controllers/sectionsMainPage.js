const SectionMainPage = require("../models/SectionMainPage");
const _ = require("lodash");
const queryCreator = require("../commonHelpers/queryCreator");

exports.getSectionsMainPage = (req, res, next) => {
  SectionMainPage.find()
    .then((data) => res.send(data))
    .catch((err) =>
      res.status(400).json({
        message: `Error happened on server: "${err}" `,
      })
    );
};

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

exports.updateSectionMainPage = (req, res, next) => {
  SectionMainPage.findOne({ _id: req.params.id })
    .then((sectionMainPage) => {
      if (!sectionMainPage) {
        return res.status(400).json({
          message: `Section of main page with _id "${req.params.id}" is not found.`,
        });
      } else {
        const sectionMainPageData = _.cloneDeep(req.body);
        const updatedSectionMainPage = queryCreator(sectionMainPageData);

        SectionMainPage.findOneAndUpdate(
          { _id: req.params.id },
          { $set: updatedSectionMainPage },
          { new: true }
        )
          .then((sectionMainPage) => res.json(sectionMainPage))
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

exports.deleteSectionMainPage = (req, res, next) => {
  SectionMainPage.deleteOne({ _id: req.params.id }).then(() => {
    res
      .status(200)
      .json({
        message: "you've just deleted section from sections collection",
      })
      .catch((err) => {
        res.status(400).json({
          message: `Error happened on server: "${err}" `,
        });
      });
  });
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
