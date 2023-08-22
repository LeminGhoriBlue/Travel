const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const User = require("./db/User");
const UserInfo = require("./db/UserInfo");

const Jwt = require("jsonwebtoken");
const jwtKey = process.env.JWT_KEY || "portfolio";

const app = express();
const PORT = process.env.PORT || 5050;
app.use(express.json());
app.use(cors());

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("MongoDB connected...");
  })
  .catch((error) => {
    console.log(error);
  });

  app.post("/register", async (req, res) => {
    try {
      const existingUser = await User.findOne({ email: req.body.email });
      const existingUserName = await User.findOne({ name: req.body.name });
      if (existingUser) {
        return res.status(400).send({ message: "User with this email already exists" });
      }

      if (existingUserName) {
        return res.status(400).send({ message: "User with this Name already exists" });
      }
      
      let user = new User(req.body);
      let result = await user.save();
      result = result.toObject();
      delete result.password;
  
      Jwt.sign({ result }, jwtKey, (err, token) => {
        if (err) {
          return res.status(500).send({ message: "Something went wrong!!" });
        }
        res.status(200).send({ result, token: token });
      });
    } catch (error) {
      res.status(500).send({ message: "An error occurred while registering user" });
    }
  });
  

app.post("/login", async (req, res) => {
  let user = await User.findOne(req.body).select("-password");
  if (req.body.name && req.body.password) {
    if (user) {
      // res.send(user);
      Jwt.sign({ user }, jwtKey,  (err, token) => {
        if (err) {
          res.status(500).send({ message: "Something went wrong!!" });
        }
        res.status(200).send({ user, token: token });
      });
    } else {
      res.status(400).send({ msg: "User not found!" });
    }
  } else {
    res.status(500).send({ msg: "Something went wrong!" });
  }
});

app.post('/add-userInfo', verifyToken, async (req, res) => {
  try {
    const existingUser = await UserInfo.findOne({ uniqueId: req.body.uniqueId });
    
    if (existingUser) {
      return res.status(400).json({ error: 'uniqueId already exists' });
    }

    const userInfo = new UserInfo(req.body);
    const result = await userInfo.save();
    res.send(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while saving user information' });
  }
});

app.get("/UserInfo", verifyToken, async (req, res) => {
  let userInfo = await UserInfo.find();
  if (userInfo.length > 0) {
    res.status(200).send(userInfo);
  } else {
    res.status(400).send({ msg: "No UserInfo found!" });
  }
});


app.get("/userInfo/:name",  async (req, res) => {
  let result = await UserInfo.findOne({ uniqueId: req.params.name });
  if (result) {
    res.status(200).send(result);
  } else {
    res.status(400).send({ msg: "No records found!" });
  }
});

app.put("/update-userInfo/:id", verifyToken, async (req, res) => {
  let result = await UserInfo.updateOne(
    { _id: req.params.id },
    { $set: req.body }
  );
  res.status(200).send(result);
});

function verifyToken(req, res, next) {
  let token = req.headers["authorization"];
  if (token) {
    token = token.split(" ")[1];
    Jwt.verify(token, jwtKey, (err, valid) => {
      if (err) {
        res.status(401).sen({ message: "Please provide valid token" });
      } else {
        next();
      }
    });
  } else {
    res.status(403).send({ message: "Please add token with header" });
  }
}

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
