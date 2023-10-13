const express = require("express");
const router = express.Router();
const User = require("../models/User");
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
var jwt = require("jsonwebtoken");
const fetchuser = require("../middleware/fetchuser");


const JMT_SECT = "abcdefghijklmno";
// Create a user using POST "/api/auth/createuser". Does not require Auth
//Route 1
router.post(
  "/createuser",
  [
    body("name").isLength({ min: 5 }),
    body("email").isEmail(),
    body("password").isLength({ min: 5 }),
  ],
  async (req, res) => {
    console.log(req.body);

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    // Create a new User instance using the User model
    try {
      let user = await User.findOne({ email: req.body.email });
      if (user) {
        return res
          .status(400)
          .json({ error: "Sorry a user with this email already exist" });
      }
      const salt = await bcrypt.genSalt(10);
      const secPass = await bcrypt.hash(req.body.password, salt);
      //create user
      user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: secPass,
      });
      //   .then((user) => {
      //     res.json(user);
      //   })
      //   .catch((err) => {
      //     console.log(err);
      //     res.json({ error: "please not make redendetn e-mail" });
      //   });

      // // Save the user to the database
      // user.save()
      //     .then(savedUser => {
      //         console.log('User saved:', savedUser);
      //         res.status(201).json(savedUser);
      //     })
      //     .catch(error => {
      //         console.error('Error saving user:', error);
      //         res.status(500).json({ error: 'Internal server error' });
      //     });
      const data = {
        user: {
          id: user.id,
        },
      };
      const authToken = jwt.sign(data, JMT_SECT);

      console.log(authToken);
      res.json({ authToken: authToken });
    } catch (error) {
      res.status(500).send("server Error occured");
    }
  }
);

// Authentication a user using :POST "/api/auth/login". NO login required
//Route 2
router.post(
  "/login",
  [
    body("email").isEmail(),
    body("password", "password should not be blank").exists(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body; //destructuring req.body
    try {
      let user = await User.findOne({ email });
      if (!user) {
        return res
          .status(400)
          .json({ error: "Please try with correct credentials" });
      }
      const passwordCompare = await bcrypt.compare(password, user.password);
      if (!passwordCompare) {
        return res
          .status(400)
          .json({ error: "Please try with correct credentials" });
      }
      const data = {
        user: {
          id: user.id,
        },
      };
      const authToken = jwt.sign(data, JMT_SECT);
      res.json({ authToken: authToken });
    } catch (error) {
      console.error("Error:", error);
      res.status(500).send("server Error occured");
    }
  }
);

//Route 3:Get loggin User Details using :POST "/api/auth/getuser".Login required
router.post("/getuser", fetchuser, async (req, res) => {
  try {
    userId = req.user.id;
    const user = await User.findById(userId).select("-password");
    res.send(user);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).send("server Error occured");
  }
});

module.exports = router;
