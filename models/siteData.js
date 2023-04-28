const mongoose = require("mongoose");

const sliderSchema = new mongoose.Schema({
  image: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  button: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Site_data_slider", sliderSchema);
