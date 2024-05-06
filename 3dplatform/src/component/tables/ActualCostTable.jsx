import { useContext, useEffect } from "react";
import { ViewerContext } from "../Context";
function ActualCostTable() {
  const { invoicesdata, totalByWeek, setTotalByWeek, formatCurrency } =
    useContext(ViewerContext);

  //--------- Calcula sumatoria de facturas por semana para calcular el Actual Cost-----------//
  const calculateTotalByWeek = () => {
    const invoicesByWeek = {};

    invoicesdata.forEach((invoice) => {
      const invoiceDate = new Date(invoice.dateInvoices);

      const weekNumber = getWeekNumber(invoiceDate);

      if (!invoicesByWeek[weekNumber]) {
        invoicesByWeek[weekNumber] = 0;
      }

      invoicesByWeek[weekNumber] += invoice.totalInvoices;
    });

    setTotalByWeek(invoicesByWeek);
  };

  // Obtener el número de semana a partir de una fecha
  const getWeekNumber = (date) => {
    const firstDayOfYear = new Date(date.getFullYear(), 0, 1);
    const pastDaysOfYear = (date - firstDayOfYear) / 86400000;
    return Math.ceil((pastDaysOfYear + firstDayOfYear.getDay() + 0) / 7);
  };

  // Actualizar el estado totalWeekly con la suma por semana
  useEffect(() => {
    const totalByWeek = calculateTotalByWeek();

    console.log("Total facturado por semana:", totalByWeek);
  }, [invoicesdata]);

  return (
    <div className=" ml-5 mt-10">
      <div>
        <h1>Total Facturado por Semana:</h1>
        <ul>
          {Object.keys(totalByWeek).map((weekNumber, index) => (
            <li key={index}>
              Semana {weekNumber}: {formatCurrency(totalByWeek[weekNumber])}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default ActualCostTable;
