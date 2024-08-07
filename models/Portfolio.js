const mongoose = require("mongoose");
const PortfolioSchema = new mongoose.Schema({
  type: {
    type: Number,
    required: true,
  },
  projectNameUz: {
    type: String,
    required: true,
  },
  projectNameRu: {
    type: String,
    required: true,
  },
  projectNameEn: {
    type: String,
    required: true,
  },
  clientUz: {
    type: String,
    required: true,
  },
  clientRu: {
    type: String,
    required: true,
  },
  clientEn: {
    type: String,
    required: true,
  },
  appStore: {
    type: String,
  },
  playMarket: {
    type: String,
  },
  webSite: {
    type: String,
  },
  images: [{
    type: mongoose.Types.ObjectId,
    ref: "image"
  }],
});

const Portfolio = mongoose.model("portfolio", PortfolioSchema);
module.exports = Portfolio;
