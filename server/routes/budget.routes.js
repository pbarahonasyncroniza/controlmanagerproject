import { getAllBudget, getOneBudget, createBudget, deleteBudget, editBudget } from "../controllers/budget.controller.js";
import multer from 'multer';

const storage = multer.memoryStorage(); // Almacenar el archivo en memoria
const upload = multer({ storage: storage });

const budgetRoutes = (app) => {
  app.get("/budget/", getAllBudget);
  app.get("/budget/:id/", getOneBudget);
  app.post("/budget/", upload.single('excelfile'), createBudget);
  app.delete("/budget/:id/", deleteBudget);
  app.patch("/budget/:id/", editBudget);
};

export default budgetRoutes;
