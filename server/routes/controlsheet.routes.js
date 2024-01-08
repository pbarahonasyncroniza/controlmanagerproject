import {
  getAllSheet,
  getOneSheet,
  createSheet,
  deleteSheet,
  editSheet,
} from "../controllers/controlsheet.controller.js";

const sheetRoutes = (app) => {
  app.get("/sheet/", getAllSheet);
  app.get("/sheet/:id/", getOneSheet);
  app.post("/sheet/", createSheet);
  app.delete("/sheet/:id/", deleteSheet);
  app.patch("/sheet/:id/", editSheet);
};

export default sheetRoutes;
