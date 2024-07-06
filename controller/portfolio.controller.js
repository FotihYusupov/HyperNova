const Portfolio = require("../models/Portfolio");
const paginate = require("../utils/pagination");
const filterByLang = require("../utils/filterByLang");

exports.getAll = async (req, res) => {
  try {
    const data = await paginate(Portfolio, req.query, "portfolio", 'images');
    const result = filterByLang(data.data, req.query.lang, 'projectName', 'client');
    data.data = result;
    return res.json(data);
  } catch (err) {
    return res.status(400).json(err);
  }
};

exports.getFront = async (req, res) => {
  try {
    let data = await Portfolio.find();
    const result = [];
    let typesOrder = [2, 2, 1, 3, 2];
    let count = 0;

    for(let i = 0; i <= data.length; i++) {
      const index = data.findIndex(e => e._doc.type == typesOrder[count])
      if(index !== -1) {
        result.push(data[index])
        data.splice(index, 1)
      }
      if(count == 6) {
        count = 0
        continue
      }
      count = count + 1
    }

    const finalData = filterByLang(result, req.query.lang, 'projectName', 'client')

    return res.status(200).json({
      data: finalData
    });
  } catch (err) {
    return res.status(400).json(err);
  }
}



exports.addPortfolio = async (req, res) => {
  try {
    const newPortfolio = new Portfolio({
      ...req.body,
    });
    await newPortfolio.save();
    return res.status(201).json({
      data: newPortfolio,
    });
  } catch (err) {
    console.log(err);
    return res.status(400).json(err);
  }
};

exports.updatePortfolio = async (req, res) => {
  try {
    const findPortfolio = await Portfolio.findByIdAndUpdate(
      req.params.id,
      { ...req.body },
      { new: true }
    );
    if (!findPortfolio) {
      return res.status(404).json({
        message: "Portfolio Not Found!",
      });
    }
    return res.json({
      data: findPortfolio,
    });
  } catch (err) {
    return res.status(400).json(err);
  }
};

exports.addImg = async (req, res) => {
  try {
    return res.json(req.images);
  } catch (err) {
    return res.status(400).json(err);
  }
};

exports.deletePortfolio = async (req, res) => {
  try {
    const findPortfolio = await Portfolio.findByIdAndDelete(req.params.id);
    if(!findPortfolio) {
      return res.status(404).json({
        message: "Portfolio Not Found!",
      });
    };
    return res.json({
      message: "Portfolio deleted",
    });
  } catch (err) {
    return res.status(400).json(err);
  };
};
