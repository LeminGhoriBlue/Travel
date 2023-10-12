const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  packAgeType: {
      type: String,
      required: true
  },
  image: {
      type: String,
      required: true
  },
  title: {
      type: String,
      required: true
  },
  subTitle: {
      type: String,
      required: true
  },
  cost: {
      type: String,
      required: true
  },
  km: {
    type: String,
    required: true
  },
  duration: {
      type: String,
      required: true
  },
  email: {
    type: String,
    required: true
}
});

module.exports = mongoose.model("Trip", productSchema);
