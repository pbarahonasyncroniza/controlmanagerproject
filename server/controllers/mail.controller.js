import nodemailer from "nodemailer";
import { google } from "googleapis";

export const sendSPIAlert = async (req, res) => {
    const {message} =req.body
  // Configuración inicial de OAuth2Client
  const OAuth2Client = new google.auth.OAuth2(
    process.env.OAUTH_CLIENTID,
    process.env.OAUTH_CLIENT_SECRET,
    process.env.REDIRECT_URI 
  );

  OAuth2Client.setCredentials({ refresh_token: process.env.OAUTH_REFRESH_TOKEN });

  try {
    // Obtener el accessToken
    const accessToken = await OAuth2Client.getAccessToken();

    // Configurar el transporter de Nodemailer con la autenticación OAuth2
    let transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        type: "OAuth2",
        user: process.env.MAIL_USERNAME,
        accessToken: accessToken.token, // Usar el token de acceso obtenido
      },
    });

    // Configuración de las opciones del correo
    const mailOptions = {
      from: "pbarahona@syncroniza.net",
      to: "pbarahonafullstack@gmail.com,pbarahona.tres@gmail.com,harenas@syncroniza.net",
      subject: "SPI alert",
      text: message,
      html: `<h1> ${message}</h1> </br><p>Plataforma de Control Syncroniza</p> `,
    };

    // Enviar el correo electrónico
    let info = await transporter.sendMail(mailOptions);
    console.log("Email sent", info.response);
    res.status(200).send("The alert has been sent");
  } catch (error) {
    console.error("Error to send email", error);
    res.status(500).send("Error to send email");
  }
};
