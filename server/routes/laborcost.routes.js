import { getAllLabor, getOneLabor,createLaborExcel, deleteLabor, editLabor } from "../controllers/laborcost.controller.js"
import multer from 'multer';

const storage = multer.memoryStorage(); // Almacenar el archivo en memoria
const upload = multer({ storage: storage });

const laborRoutes = (app) => {
  app.get("/labor/", getAllLabor);
  app.get("/labor/:id/", getOneLabor);
  // app.post("/labor/", createLabor);
  app.post("/labor/", upload.single('excelfile'), createLaborExcel);
  app.delete("/labor/:id/", deleteLabor);
  app.patch("/labor/:id/", editLabor);
};

export default laborRoutes;
