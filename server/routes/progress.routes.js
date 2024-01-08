import { getAllProgress, getOneProgress, createProgress, deleteProgress, editProgress } from "../controllers/progress.controller.js";

const setupRoutes = (app) => {
    app.get("/admin/", getAllProgress);
    app.get("/admin/:id/", getOneProgress);
    app.post("/admin/", createProgress);
    app.delete("/admin/:id/", deleteProgress);
    app.patch("/admin/:id/", editProgress);
};

export default setupRoutes;
