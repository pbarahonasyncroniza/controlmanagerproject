import { sendSPIAlert } from "../controllers/mail.controller.js";

const mailRoutes = (app) => {
   
    app.post("/sendSPIAlert/",sendSPIAlert);
  
  };
  
  export default mailRoutes;
  