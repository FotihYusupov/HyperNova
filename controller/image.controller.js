const path = require("path");
const multer = require("multer");
const Files = require("../models/Image");
const mongoose = require("mongoose");

exports.getFiles = async (req, res) => {
  try {
    const files = await Files.find();
    return res.status(200).json({ data: files });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: {
        uz: error.message,
      },
    });
  }
};

exports.upload = async (req, res) => {
  try {
    const publicFolderPath = `./uploads`;
    const storage = multer.diskStorage({
      destination: publicFolderPath,
      filename: (req, file, cb) => {
        const fileId = new mongoose.Types.ObjectId().toString();
        const fileExtension = path.extname(file.originalname);
        const fileName = `${fileId}${fileExtension}`;
        cb(null, fileName);
      },
    });
    const upload = multer({ storage }).single("file");
    upload(req, res, async (error) => {
      if (error) {
        return res.status(500).json({ message: error.message });
      }
      if (!req.file) {
        return res.status(400).json({
          status: "error",
          message: {
            uz: "Fayl yuklanmadi",
            ru: "Файл не загружен",
            en: "File not uploaded",
          },
        });
      }
      const newFile = new Files({
        fileName: req.file.filename,
        fileUrl: `${process.env.SERVER_URL}uploads/${req.file.filename}`,
      });
      await newFile.save();
      return res.status(200).json({ data: newFile });
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: {
        uz: error.message,
      },
    });
  }
};

exports.deleteFile = async (req, res) => {
  try {
    const file = await Files.findById(req.params.id);
    if (!file) {
      return res.status(404).json({
        status: "error",
        message: {
          uz: "Fayl topilmadi",
          ru: "Файл не найден",
          en: "File not found",
        },
      });
    }
    await file.deleteOne();
    return res.json({ data: file });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: {
        uz: error.message,
      },
    });
  }
};
