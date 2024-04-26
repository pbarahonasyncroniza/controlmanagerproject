import { useContext, useState, useEffect } from "react";
import { ViewerContext } from "../Context";
import axios from "axios";
import AlertMail from "../alert/AlertMail";

const KpiBySubFamily = () => {
  const [showAlert, setShowAlert] = useState(false);
  const { filters, getDataBudget, selectedProject, filterType } =
   
    useContext(ViewerContext);

  // Filtro del Total por Familia
  const filteredData = getDataBudget.filter((item) => {
    return Object.keys(filters).every((filterName) => {
      // console.log("filterskPI",filters)
      const filterValue = filters[filterName]
        ? filters[filterName].toLowerCase()
        : "";
      const itemValue = String(item[filterName]).toLowerCase();
      return itemValue.includes(filterValue);
    });
  });
 

  // calcula la sumatoria por familia
  const calculateTotalForFamily = (family) => {
    if (!filteredData) {
      return 0;
    }

    const familyItems = filteredData.filter((items) => {
      return (
        items.family && items.family.toLowerCase() === family.toLowerCase()
      );
    });

    const totalSum = familyItems.reduce((sum, item) => {
      const totalPrice = Number(item.totalPrice);
      return isNaN(totalPrice) ? sum : sum + totalPrice;
    }, 0);

    const formattedTotal = totalSum.toLocaleString(undefined, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });

    return formattedTotal;
  };

  // Filtra  y calcula Actual  Cost por familia
  const sheets = selectedProject?.sheets || [];
  let filteredSheets = [];
  if (filterType && filterType !== "") {
    filteredSheets = sheets?.filter(
      (sheet) => sheet.family.toLowerCase() === filterType.toLowerCase()
    );
  }

  const actualCost = filteredSheets.reduce((acc, current) => {
    const totalValue = typeof current.total === "number" ? current.total : 0;
    return acc + totalValue;
  }, 0);

  const totalFamily = calculateTotalForFamily(filters.family);
  const totalFamilyString =
    typeof totalFamily === "string" ? totalFamily : totalFamily.toString();
  const normalizedTotalForFamily = parseFloat(
    totalFamilyString.replace(/[^\d,]/g, "").replace(",", ".")
  );

  const difference = normalizedTotalForFamily - actualCost;

  const sendAPIAlert = async (message) => {
    try {
      const response = await axios.post("http://localhost:8000/sendSPIAlert", {
        message: `${message}`,
      });
      setShowAlert(true);
      console.log("Alert sent successfully:", response.data);
    } catch (error) {
      console.error("Error sending SPI alert:", error);
    }
  };

  const SPI = normalizedTotalForFamily / actualCost;

  //aca se asegura que se envie solo una vez el correo de alerta
  useEffect(() => {
    const checkSPIAndSendAlert = async () => {
      if (SPI < 1) {
        try {
          const projectId =
            selectedProject?.projectId || "Project name not found";
          const projectName =
            selectedProject?.projectName || "Project name not found";
          const familyAffected = filterType;
          console.log("🚀 ~ checkSPIAndSendAlert ~ familyAffected:", familyAffected);
          const message = `Facturacion Total mayor o igual al 90% de las OC emitidas a la fecha ${familyAffected} en el projecto ${projectName} ${projectId} `;
          await sendAPIAlert(message, familyAffected);
          setShowAlert(true);
        } catch (error) {
          console.error("Error sending SPI alert:", error);
        }
      }
    };

    checkSPIAndSendAlert();
  }, [SPI, filterType, selectedProject]);

  let style = {};

  // estilo de SPI

  if (SPI < 1) {
    style = { backgroundColor: "red" };
  } else if (SPI === 1) {
    style = { backgroundColor: "yellow" };
  } else {
    style = { backgroundColor: "#0E7490" };
  }
  // estilo de Disponible
  let styledifferent = {};
  if (difference < 0) {
    styledifferent = { backgroundColor: "red" };
  } else if (difference === 0) {
    styledifferent = { backgroundColor: "#0E7490" };
  } else {
    styledifferent = { backgroundColor: "green" };
  }
  // estilo de formato de moneda
  const formatCurrency = (value) => {
    return Number(value).toLocaleString("es-Cl", {
      style: "currency",
      currency: "CLP",
      minimumFractionDigits: 2,
    });
  };

  return (
    <div className="flex flex-col w-50 text-center bg-white rounded-lg mt-4 shadow-xl">
      <AlertMail
        message="has been sent email to manager"
        showAlert={showAlert}
        onClose={() => setShowAlert(false)}></AlertMail>

      <nav className=" ">
        <h1 className="text-lg text-center mb-4 font-semibold mt-4 w-60">
          KPI BY FAMILY
        </h1>

        <div className=" text-lg bg-cyan-700 text-white ml-4  mb-4 rounded-lg w-52 ">
          Total {filters.family}:
          <div>{formatCurrency(normalizedTotalForFamily)}</div>
        </div>
        <div className="">
          <h1 className="bg-cyan-700  text-cyan-400 p-6  mt-3 ml-4 w-52 rounded-lg text-sm ">
            Actual Cost:
            <div className="text-white text-xl">
              {formatCurrency(actualCost)}
            </div>
          </h1>

          <h1
            className="bg-cyan-700  text-cyan-400 p-6  mt-3 ml-4 w-52 rounded-lg text-sm"
            style={styledifferent}>
            Disponible:
            <div className="text-white text-xl " style={styledifferent}>
              {formatCurrency(difference)}
            </div>
          </h1>
          <h1
            className="bg-cyan-700 shadow-xl text-cyan-400 p-6  mt-3 ml-4 w-52 rounded-lg text-sm"
            style={style}>
            SPI:{" "}
            <div className="text-white text-2xl font-bold" style={style}>
              {formatCurrency(SPI)}
            </div>
          </h1>
        </div>
      </nav>
    </div>
  );
};

export default KpiBySubFamily;
