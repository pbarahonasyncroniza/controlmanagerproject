import { useState, useContext, useEffect } from "react";
import { ViewerContext } from "../Context";
import Sidebardb from "../dashboard/Sidebardb";
import FormInvoices from "../sheetcontrol/FormInvoices";
import axios from "axios";

const InvicesMasterTable = () => {
  const {
    setIsModalOpenBudget,
    formSubmitted,
    setFormSubmitted,
    invoicesdata,
    setInvoicesData,
    selectedSubfamily,
  } = useContext(ViewerContext);

  const openModal = () => setIsModalOpenBudget(true);

  const fetchInvoices = async () => {
    try {
      const response = await axios.get("http://localhost:8000/invoices/");

      if (Array.isArray(response.data.data) && response.data.data.length > 0) {
        setInvoicesData(response.data.data); // Actualiza el estado de proyectos
      } else {
        console.error("Empty array of projects", response);
      }
    } catch (error) {
      console.error("Error fetching projects", error);
    }
  };

  useEffect(() => {
    fetchInvoices();
  }, [selectedSubfamily]); // Se ejecuta solo e

  useEffect(() => {
    if (formSubmitted) {
      fetchInvoices();
      setFormSubmitted(false); // Cambia el estado de formSubmitted a false después de obtener los datos
    }
  }, [formSubmitted]);

  const handleDeleteInvoice = async (invoicesid) => {
    try {
      const response = await axios.delete(
        `http://localhost:8000/invoices/${invoicesid}`
      );
      if (response.status === 200) {
        setInvoicesData((prevInvoiceData) => {
          // Filtrar el array para remover el elemento eliminado
          return prevInvoiceData.filter(
            (invoice) => invoice._id !== invoicesid
          );
        });
      }
    } catch (err) {
      console.error("Error deleting invoice:", err);
    }
  };

  // calculo de acumulado
  let acumulado = 0;
  const invoicesWithAccumulated = invoicesdata.map((invoice) => {
    acumulado += invoice.totalInvoices;
    console.log("🚀 ~ invoicesWithAccumulated ~ acumulado:", acumulado);
    return { ...invoice, totalAcumulado: acumulado };
  });
  console.log(
    "🚀 ~ invoicesWithAccumulated ~ invoicesWithAccumulated:",
    invoicesWithAccumulated
  );

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

  return (
    <div className="flex">
      <Sidebardb />
      <FormInvoices />
      <div className=" max-h-[1000px] overflow-y-auto  b-4 bg-white mt-4 ml-3 p-4 rounded-xl ">
        <h1 className="text-xl text-center font-semibold">
          MAESTRO DE FACTURAS
        </h1>
        <div className="flex">
          <button
            onClick={openModal}
            className="flex  bg-blue-500 mt-2 ml-2 p-2 text-white rounded-lg text-sm gap-2 ">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              dataslot="icon"
              className="w-4 h-4">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 4.5v15m7.5-7.5h-15"
              />
            </svg>{" "}
            Nuevo Registro
          </button>
        </div>
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
              <th className="border border-slate-500 px-4  text-base ">
                Estado Factura
              </th>
              <th className="border border-slate-500 px-4  text-base ">
                Fecha Pago
              </th>
              <th className="border border-slate-500 px-4  text-base ">
                Observaciones
              </th>
              <th className="border border-slate-500 px-4  text-base ">
                Borrar
              </th>
              <th className="border border-slate-500 px-4  text-base ">
                Editar
              </th>
            </tr>
          </thead>
          <tbody>
            {invoicesdata.map((item, invoice) => {
              const totalInvoice = parseFloat(item.totalInvoices);
              if (!isNaN(totalInvoice)) {
                acumulado += totalInvoice;
              }

              return (
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
                    {item.invoiceStatus}
                  </td>
                  <td className="border border-slate-500 px-4 text-base ">
                    {item.dueDate}
                  </td>
                  <td className="border border-slate-500 px-4 text-base ">
                    {item.observations}
                  </td>
                  <td>
                    <button
                      className=" bg-red-500  p-1 text-white rounded-lg text-sm "
                      onClick={() => handleDeleteInvoice(item._id || item.id)}>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-5 h-5 ">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                        />
                      </svg>
                    </button>
                  </td>
                  <td>
                    <button
                      className=" bg-green-500   p-1 text-white rounded-lg text-sm "
                      onClick={""}>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-5 h-5">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125"
                        />
                      </svg>
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default InvicesMasterTable;
