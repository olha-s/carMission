const Feedback = require("../models/Feedback");
const mailSender = require("../commonHelpers/mailSender");

exports.createFeedback = (req, res, next) => {
  console.log("req body  - - - ", req.body);
  mailSender("db.carsmission@gmail.com", "Вам пришел запрос от клиента",
    `<p style="font-size: 20px">Вам пришел запрос от клиента: имя клиента ${req.body.name}, контактный номер телефона ${req.body.phone}.</p>`);

  const newFeedback = new Feedback(req.body);

  newFeedback
    .save()
    .then(data => res.json(data))
    .catch(err =>
      res.status(400).json({
        message: `Error happened on server: "${err}" `
      })
    );

};

exports.getFeedbacks = (req, res, next) => {
  Feedback.find()
    .then(data => res.send(data))
    .catch(err =>
      res.status(400).json({
        message: `Error happened on server: "${err}" `
      })
    );
};

exports.deleteFeedbacks = (req, res, next) => {
  Feedback.deleteMany({})
    .then(data => res.send(data))
    .catch(err =>
      res.status(400).json({
        message: `Error happened on server: "${err}" `
      })
    );
};


