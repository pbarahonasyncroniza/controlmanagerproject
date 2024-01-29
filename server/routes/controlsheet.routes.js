import {
  getAllSheet,
  getOneSheet,
  createSheet,
  deleteSheet,
  editSheet,
} from "../controllers/controlsheet.controller.js";

import multer from 'multer';

const storage = multer.memoryStorage(); // Almacenar el archivo en memoria
const upload = multer({ storage: storage });

const sheetRoutes = (app) => {
  app.get("/sheet/", getAllSheet);
  app.get("/sheet/:id/", getOneSheet);
  app.post("/sheet/", upload.single('excelfile'), createSheet);
  app.delete("/sheet/:id/", deleteSheet);
  app.patch("/sheet/:id/", editSheet);
};

export default sheetRoutes;
