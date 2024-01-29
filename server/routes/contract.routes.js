import { getAllContract, getOneContract, createContract, deleteContract, editContract } from "../controllers/contract.controller.js";

const contractRoutes = (app) => {
    app.get("/contract/", getAllContract);
    app.get("/contract/:id/", getOneContract);
    app.post("/contract/", createContract);
    app.delete("/contract/:id/", deleteContract);
    app.patch("/contract/:id/", editContract);
};

export default contractRoutes;
