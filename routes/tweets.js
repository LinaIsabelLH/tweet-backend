var express = require("express");
var router = express.Router();

const Tweet = require("../models/tweet");
const User = require("../models/users");

//Message posted
router.post("/post/:token", (req, res) => {
  if (!req.body.message) {
    return res.json({ result: false, error: "Missing fields" });
  }

  User.findOne({ token: req.params.token }).then((data) => {
    const newTweet = new Tweet({
      message: req.body.message,
      date: new Date(),
      author: data,
    });
    newTweet.save().then((newDoc) => {
      res.json({ result: true, message: newDoc });
    });
  });
});

// Messages listing
router.get("/get", (req, res) => {
  Tweet.find()
    .populate("author")
    .sort({ date: -1 })
    .then((data) => {
      res.json({ result: true, data });
    });
});

//Erase a message
router.get("/delete/:token", (req, res)=>{
  Tweet.find()
  .populate("author")
  .then((data)=>{
    data.filter(e => e.author.token !== req.params.token)
     res.json({result: true, data})
  });
});

module.exports = router;
