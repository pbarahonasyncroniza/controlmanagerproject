import { getAllInvoices, getOneInvoices, createInvoices, deleteInvoices, editInvoices } from "../controllers/invoices.controller.js";

const invoicesRoutes = (app) => {
    app.get("/invoices/", getAllInvoices);
    app.get("/invoices/:id/", getOneInvoices);
    app.post("/invoices/", createInvoices);
    app.delete("/invoices/:id/", deleteInvoices);
    app.patch("/invoices/:id/", editInvoices);
};

export default invoicesRoutes;
