import { useContext, useEffect } from "react";
import { ViewerContext } from "../Context";

const Invoices = () => {
  const { invoicesdata, selectedSubfamily, setAccumatedValue } =
    useContext(ViewerContext);
  

  const formatCurrency = (value) => {
    return Number(value).toLocaleString("es-Cl", {
      style: "currency",
      currency: "CLP",
      minimumFractionDigits: 2,
    });
  };

  const formatedDate = (isoDate) => {
    if (!isoDate) return "Fecha no disponible";

    // Crear la fecha en base al isoDate
    const date = new Date(isoDate);

    // Usar getUTC* en lugar de get* para obtener la fecha en UTC
    const day = date.getUTCDate();
    const month = date.getUTCMonth() + 1; // getUTCMonth() devuelve un índice basado en cero (0-11)
    const year = date.getUTCFullYear();

    // Formatea el día y el mes para asegurar que tengan dos dígitos
    const formattedDay = String(day).padStart(2, "0");
    const formattedMonth = String(month).padStart(2, "0");

    // Retorna la fecha formateada como "día/mes/año"
    return `${formattedDay}/${formattedMonth}/${year}`;
  };

  useEffect(() => {

    
    const filteredInvoices = invoicesdata.filter(
      invoice => invoice.subfamily === selectedSubfamily
    );
  
    let acumulado = 0;
    filteredInvoices.map(invoice => {
      acumulado += parseFloat(invoice.totalInvoices) || 0;
      return { ...invoice, totalAcumulado: acumulado };
    });
  
    // Actualiza el estado con el valor acumulado final para la subfamilia seleccionada
    setAccumatedValue(acumulado);
  }, [selectedSubfamily, invoicesdata]);
  
  const filteredInvoices = invoicesdata.filter(
    invoice => invoice.subfamily === selectedSubfamily
  );
  
  let acumulado = 0;
  const invoicesWithAccumulated = filteredInvoices.map(invoice => {
    acumulado += parseFloat(invoice.totalInvoices) || 0;
    return { ...invoice, totalAcumulado: acumulado };
  });



  return (
    <div>
      <table className="table-auto mt-4 border-collapse border border-slate-500 ml-2 mr-2  ">
        <thead className="sticky top-0 bg-cyan-700 text-white -z-3">
          <tr className="border border-slate-500 px-4 text-xl ">
            <th className="border border-slate-500 px-4 text-base  ">
              ProjectId
            </th>
            <th className="border border-slate-500 px-4 text-base  ">
              Familia
            </th>
            <th className="border border-slate-500 px-4 text-base  ">
              SubFamila
            </th>
            <th className="border border-slate-500 px-4  text-base ">
              N° Factura
            </th>
            <th className="border border-slate-500 px-4 text-base  ">
              Fecha de emision
            </th>
            <th className="border border-slate-500 px-4  text-base">
              Proveedor
            </th>
            <th className="border border-slate-500 px-4  text-base ">
              Glosa/EEPP
            </th>
            <th className="border border-slate-500 px-4 text-base  ">
              $ Factura
            </th>
            <th className="border border-slate-500 px-4 text-base  ">
              $ AcumuladoFactura
            </th>
            <th className="border border-slate-500 px-4  text-base ">
              Fecha
            </th>
            <th className="border border-slate-500 px-4  text-base ">
              Estado Factura
            </th>

            <th className="border border-slate-500 px-4  text-base ">
              Observaciones
            </th>
          </tr>
        </thead>
        <tbody>
          {invoicesWithAccumulated.map((item, invoice) => (
            <tr key={invoice}>
              <td className="border border-slate-500 px-4 text-base ">
                {item.projectId}
              </td>
              <td className="border border-slate-500 px-4 text-base ">
                {item.family}
              </td>
              <td className="border border-slate-500 px-4 text-base ">
                {item.subfamily}
              </td>
              <td className="border border-slate-500 px-4 text-base ">
                {item.invoices}
              </td>
              <td className="border border-slate-500 px-4 text-base ">
                {formatedDate(item.dateInvoices)}
              </td>
              <td className="border border-slate-500 px-4 text-base ">
                {item.subcontractorOffers}
              </td>
              <td className="border border-slate-500 px-4 text-base ">
                {item.description}
              </td>
              <td className="border border-slate-500 px-4 text-base ">
                {formatCurrency(item.totalInvoices)}
              </td>
              <td className="border border-slate-500 px-4 text-base ">
                {formatCurrency(item.totalAcumulado)}
              </td>
              <td className="border border-slate-500 px-4 text-base ">
                {item.dueDate}
              </td>
              <td className="border border-slate-500 px-4 text-base ">
                {item.invoiceStatus}
              </td>
              <td className="border border-slate-500 px-4 text-base ">
                {item.observations}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Invoices;
