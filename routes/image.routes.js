const { Router } = require("express");
const fileController = require("../controller/image.controller");
const fileRoutes = Router();

fileRoutes.post("/upload", fileController.upload);
fileRoutes.get("/upload", fileController.getFiles);
fileRoutes.delete("/upload/:id", fileController.deleteFile);

module.exports = fileRoutes;
