const Clients = require("../models/Clients");
const paginate = require("../utils/pagination");

exports.getAll = async (req, res) => {
  try {
    const data = await paginate(Clients, req.query, 'clients');
    return res.json(data);
  } catch (err) {
    return res.status(400).json(err);
  }
};

exports.addClient = async (req, res) => {
  try {
    const newClient = new Clients({ ...req.body });
    await newClient.save();
    return res.status(201).json({
      message: "Client Created",
      data: newClient,
    })
  } catch (err) {
    return res.status(400).json(err);
  }
};

exports.updateClient = async (req, res) => {
  try {
    const findClient = await Clients.findByIdAndUpdate(req.params.id,
      { ...req.body },
      { new: true },
    );
    if(!findClient) {
      return res.status(404).json({
        message: "Client Not Found!"
      });
    };
    return res.json({
      message: "Client Updated!",
      data: findClient,
    });
  } catch (err) {
    return res.status(400).json(err);
  }
};

exports.deleteClient = async (req, res) => {
  try {
    const findClient = await Clients.findByIdAndDelete(req.params.id);
    if(!findClient) {
      return res.status(404).json({
        message: "Client Not Found!",
      })
    };
    return res.json({
      message: "Client Deleted",
    });
  } catch (err) {
    return res.status(400).json(err)
  }
};
