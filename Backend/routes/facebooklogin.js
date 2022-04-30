const router = require("express").Router();
const fetch = require("node-fetch");
const bcrypt = require("bcrypt");
const { User, validate } = require("../models/user");
router.post("/facebooklogin", async (req, res) => {
  const { userID, accessToken, name, email } = req.body;
  console.log(userID);
  let urlGraphFacebook = `http://graph.facebook.com/v2.11/${userID}/?fields=id,name,email&access_token=${accessToken}`;
  fetch(urlGraphFacebook, {
    method: "GET",
  })
    .then((res) => res.json())
    .then(async (res) => {
      const user = await User.findOne({ email: req.body.email });
      if (user) console.log("user exists");
      else {
        let newUser = await new User({
          name,
          email,
          password: "aA12345678!",
        }).save();
        console.log("success", newUser);
      }
    });
});

module.exports = router;
