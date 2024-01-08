import express from "express";
import "dotenv/config";
import cors from "cors";
import mongoConnect from "./config/mongo.config.js";
import setupRoutes from "./routes/progress.routes.js";
import taskRoutes from "./routes/gantt.routes.js";
import sheetRoutes from "./routes/controlsheet.routes.js";
import projectRoutes from "./routes/project.routes.js";
import budgettRoutes from "./routes/budget.routes.js";
import mailRoutes from "./routes/mail.routes.js";

const app = express();

app.use("/uploads", express.static("server/uploads"));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  cors({
    credentials: true,
    origin: "http://localhost:5173",
  })
);


// Conexión a MongoDB
const PORT = process.env.PORT || 8000;

setupRoutes(app);
taskRoutes(app);
sheetRoutes(app);
projectRoutes(app);
budgettRoutes(app);
mailRoutes(app)


mongoConnect().then(() => {
  app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`);
  });
});
