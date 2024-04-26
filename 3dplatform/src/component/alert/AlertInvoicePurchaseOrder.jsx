import { useContext, useState, useEffect } from "react";
import { ViewerContext } from "../Context";
import axios from "axios";
import AlertMail from "../alert/AlertMail";

function AlertInvoicePurchaseOrder() {
  const {
    accumatedValue,
    totalPurchaseOrders,
    selectedProjectId,
    selectedSubfamily,
  } = useContext(ViewerContext);

  const [showAlert, setShowAlert] = useState(false);
  const SPI = totalPurchaseOrders / accumatedValue;
  console.log("🚀 ~ AlertInvoicePurchaseOrder ~ SPI:", SPI);
  useEffect(() => {
    const checkSPIAndSendAlert = async () => {
      const totalFacturadoALaFecha = accumatedValue;
      console.log(
        "🚀 ~ checkSPIAndSendAlert ~ accumatedValue:",
        accumatedValue
      );

      const totalordenDeCompraALaFecha = totalPurchaseOrders;
      console.log(
        "🚀 ~ checkSPIAndSendAlert ~ totalPurchaseOrders:",
        totalPurchaseOrders
      );

      if (SPI < 1) {
        try {
          const projectId = selectedProjectId || "Project name not found";
          const subfamily = selectedSubfamily || "subfamily name not found";

          const message = `Gastos igualan o superan el disponible en el proyecto: ${projectId}, Hoja de Control: ${subfamily}`;
          await sendAPIAlert(message);
          setShowAlert(true);
        } catch (error) {
          console.error("Error sending SPI alert:", error);
        }
      }
    };
    checkSPIAndSendAlert();
  }, [
    accumatedValue,
    totalPurchaseOrders,
    selectedProjectId,
    selectedSubfamily,
  ]);

  const sendAPIAlert = async (message) => {
    try {
      const response = await axios.post("http://localhost:8000/sendSPIAlert", {
        message: message,
      });
      setShowAlert(true);
      console.log("Alerta enviada exitosamente:", response.data);
    } catch (error) {
      console.error("Error al enviar la alerta:", error);
    }
  };

  return (
    <div>
      {showAlert && (
        <AlertMail
          message="Se ha enviado un correo electrónico a Gerencia ."
          showAlert={showAlert}
          onClose={() => setShowAlert(false)}
        />
      )}
    </div>
  );
}

export default AlertInvoicePurchaseOrder;
