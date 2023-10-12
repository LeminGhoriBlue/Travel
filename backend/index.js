const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const User = require("./db/User");
const TripModel = require("./db/trip");

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

  app.get('/api/trips', verifyToken, async (req, res) => {
    try {
      // Query the database to get trips based on the email ID filter
      const trips =  await TripModel.aggregate([{ $match: { email:req.query.email } }])
    
      // Send the retrieved data as a JSON response
      res.json(trips);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'An error occurred while fetching trips' });
    }
  });
  
  
  app.post('/add-trip', verifyToken, async (req, res) => {
    try {
      const existingTrip = await TripModel.findOne({ email: req.body.email, title: req.body.title });
      if (existingTrip) {
        // If the trip already exists, handle the error accordingly
        res.status(400).json({ error: 'Trip already exists' });
      } else {
        // Create a new trip with the provided information
        const newTrip = new TripModel(req.body);
        const result = await newTrip.save();
        res.send(result);
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'An error occurred while saving trip information' });
    }
  });

  app.delete('/delete-trip', verifyToken, async (req, res) => {
    try {
      const email = req.query.email;
      const title = req.query.title;
      
      const result = await TripModel.deleteOne({ email: email, title: title });
  
      if (result.deletedCount === 1) {
        res.status(200).json({ message: 'Trip Data deleted successfully' });
      } else {
        res.status(404).json({ message: 'Trip data not found' });
      }
    } catch (error) {
      res.status(500).json({ message: error.message });
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

function verifyToken(req, res, next) {
  const token = req.header('authorization');

  if (!token) return res.status(401).json({ message: 'Token not provided' });

  Jwt.verify(token, jwtKey, (err, decoded) => {
    if (err) return res.status(403).json({ message: 'Invalid token' });

    req.user = decoded.user;
    next();
  });
}

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
