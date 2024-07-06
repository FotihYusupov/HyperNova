const { Router } = require("express");
const authMiddleware = require("../middlewares/auth.middleware");
const portfolioController = require("../controller/portfolio.controller");
const portfolioRoutes = Router();

portfolioRoutes.get("/", portfolioController.getAll);
portfolioRoutes.get("/front",  portfolioController.getFront);
portfolioRoutes.post("/", authMiddleware, portfolioController.addPortfolio);
// portfolioRoutes.post('/img', portfolioController.addImg);
portfolioRoutes.put("/:id", authMiddleware, portfolioController.updatePortfolio);
portfolioRoutes.delete("/:id", authMiddleware, portfolioController.deletePortfolio);

module.exports = portfolioRoutes;
