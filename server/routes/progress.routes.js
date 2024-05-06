import { getAllProgress, getOneProgress, createProgress, deleteProgress, editProgress } from "../controllers/progress.controller.js";
import multer from 'multer';

const storage = multer.memoryStorage(); // Almacenar el archivo en memoria
const upload = multer({ storage: storage });

const progressRoutes = (app) => {
    app.get("/progress/", getAllProgress);
    app.get("/progress/:id/", getOneProgress);
    app.post("/progress/",upload.single("excelfile"), createProgress);
    app.post("/progress/", createProgress);
    app.delete("/progress/:id/", deleteProgress);
    app.patch("/progress/:id/", editProgress);
};

export default progressRoutes;
