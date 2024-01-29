import { getAllIncreasediscount, getOneIncreasediscount, createIncreasediscount, deleteIncreasediscount, editIncreasediscount } from "../controllers/increasediscount.controller.js";

const increasediscountRoutes = (app) => {
    app.get("/increasediscount/", getAllIncreasediscount);
    app.get("/increasediscount/:id/", getOneIncreasediscount);
    app.post("/increasediscount/", createIncreasediscount);
    app.delete("/increasediscount/:id/", deleteIncreasediscount);
    app.patch("/increasediscount/:id/", editIncreasediscount);
};

export default increasediscountRoutes;
