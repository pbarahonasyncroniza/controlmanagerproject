import { useContext, useEffect, useState } from "react";
import { ViewerContext } from "../Context";

const Invoices = () => {
  const {
    invoicesdata,
    selectedSubfamily,
    setAccumatedValue,
    selectedProjectId,
    formatCurrency,
    selectedFamily,
    totalPaidByProjectFamilySubfamily,
    setTotalPaidByProjectFamilySubfamily,
    accumatedValue,
  } = useContext(ViewerContext);
  console.log("🚀 ~ Invoices ~ invoicesdata:", invoicesdata);
  const [newfilteredInvoices, setNewFilteredInvoices] = useState([]);

  console.log(
    "🚀 ~ Invoices ~ totalPaidByProjectFamilySubfamily:",
    totalPaidByProjectFamilySubfamily
  );
  const [percentagePaid, setPercentagePaid] = useState([]);

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

  // filtro por projectId familia y subfamilia y ademas el calculo acumulado
  useEffect(() => {
    const filteredInvoices = invoicesdata.filter(
      (invoice) =>
        (!selectedProjectId || invoice.projectId === selectedProjectId) &&
        (!selectedFamily || invoice.family === selectedFamily) &&
        (!selectedSubfamily || invoice.subfamily === selectedSubfamily)
    );
    let acumulado = 0;
    const invoicesWithAccumulated = filteredInvoices.map((invoice) => {
      acumulado += parseFloat(invoice.totalInvoices) || 0;
      return { ...invoice, totalAcumulado: acumulado };
    });
    const totalPaid = filteredInvoices
      .filter((invoice) => invoice.invoiceStatus === "Pagado")
      .reduce(
        (sum, invoice) => sum + parseFloat(invoice.totalInvoices || 0),
        0
      );
    // Calculamos el porcentaje pagado.
    // Calculamos el total facturado de las facturas filtradas.
    const totalInvoiced = filteredInvoices.reduce(
      (sum, invoice) => sum + parseFloat(invoice.totalInvoices || 0),
      0
    );

    const percentagePaid =
      totalInvoiced > 0
        ? Number(((totalPaid / totalInvoiced) * 100).toFixed(2))
        : 0;
    setPercentagePaid(percentagePaid);

    setTotalPaidByProjectFamilySubfamily(totalPaid);

    setNewFilteredInvoices(invoicesWithAccumulated);
    setAccumatedValue(acumulado);
  }, [
    selectedSubfamily,
    invoicesdata,
    selectedProjectId,
    selectedFamily,
    setPercentagePaid,
    setTotalPaidByProjectFamilySubfamily,
    setNewFilteredInvoices,
    setAccumatedValue,
  ]);

  return (
    <div className="bg-white mt-3 mb-3 p-2 rounded-xl ml-3 ">
      <h1 className="text-xl font-semibold ml-3 ">FACTURAS</h1>
      <div className="grid grid-cols-[3fr_1fr] overflow-y-visible">
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
                Fecha Pago
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
            {newfilteredInvoices.map((invoice) => (
              <tr key={invoice._id}>
                <td className="border border-slate-500 px-4 text-base ">
                  {invoice.projectId}
                </td>
                <td className="border border-slate-500 px-4 text-base ">
                  {invoice.family}
                </td>
                <td className="border border-slate-500 px-4 text-base ">
                  {invoice.subfamily}
                </td>
                <td className="border border-slate-500 px-4 text-base ">
                  {invoice.invoices}
                </td>
                <td className="border border-slate-500 px-4 text-base ">
                  {formatedDate(invoice.dateInvoices)}
                </td>
                <td className="border border-slate-500 px-4 text-base ">
                  {invoice.subcontractorOffers}
                </td>
                <td className="border border-slate-500 px-4 text-base ">
                  {invoice.description}
                </td>
                <td className="border border-slate-500 px-4 text-base ">
                  {formatCurrency(invoice.totalInvoices)}
                </td>
                <td className="border border-slate-500 px-4 text-base ">
                  {formatCurrency(invoice.totalAcumulado)}
                </td>
                <td className="border border-slate-500 px-4 text-base ">
                  {formatedDate(invoice.dueDate)}
                </td>
                <td className="border border-slate-500 px-4 text-base ">
                  {invoice.invoiceStatus}
                </td>
                <td className="border border-slate-500 px-4 text-base ">
                  {invoice.observations}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className=" ml-4 mr-8 mt-4 p-6 rounded-xl text-xl text-white text-center shadow-lg  grid grid-cols-2 ">
          <div className=" flex flex-col justify-center mr-2 gap-2 bg-cyan-700 rounded-xl font-light">
            <h1>TOTAL FACTURADO</h1>
            <h1 className="text-3xl text-white text-center font-semibold  ">
              {formatCurrency(accumatedValue)}
            </h1>
          </div>
          <div className="flex flex-col justify-center font-light mr-2 gap-2 bg-cyan-700 rounded-xl ml-1">
            <h1>% PAGADO DE LO FACTURADO</h1>
            <h1 className="text-3xl font-semibold ">{percentagePaid}%</h1>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Invoices;
