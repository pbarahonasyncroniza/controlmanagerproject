import { getAllTask, getOneTask, createTask, deleteTask, editTask } from "../controllers/gantt.controller.js";

const taskRoutes = (app) => {
    app.get("/task/", getAllTask);
    app.get("/task/:id/", getOneTask);
    app.post("/task/", createTask);
    app.delete("/task/:id/", deleteTask);
    app.patch("/task/:id/", editTask);
};

export default taskRoutes;
