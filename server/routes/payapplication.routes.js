import { getAllPayApplication, getOnePayApplication, createPayApplication, deletePayApplication, editPayApplication } from "../controllers/payapplication.controller.js";

const payapplicationRoutes = (app) => {
    app.get("/payapplication/", getAllPayApplication);
    app.get("/payapplication/:id/", getOnePayApplication);
    app.post("/payapplication/", createPayApplication);
    app.delete("/payapplication/:id/", deletePayApplication);
    app.patch("/payapplication/:id/", editPayApplication);
};

export default payapplicationRoutes;
