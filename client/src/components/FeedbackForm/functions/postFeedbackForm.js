const axios = require("axios");

export default function postFeedback (feedbackObj) {
    axios.post("/api/feedbacks", feedbackObj)
        .catch((err) => console.error(err));
};