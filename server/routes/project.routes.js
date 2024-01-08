import { getAllProject, getOneProject, createProject, deleteProject, editProject } from "../controllers/project.controller.js";

const projectRoutes = (app) => {
    app.get("/project/", getAllProject);
    app.get("/project/:id/", getOneProject);
    app.post("/project/", createProject);
    app.delete("/project/:id/", deleteProject);
    app.patch("/project/:id/", editProject);
};

export default projectRoutes;
