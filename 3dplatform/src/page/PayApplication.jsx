import { useContext, useEffect, useState } from "react";
import { ViewerContext } from "../component/Context";
import axios from "axios";
import Sidebardb from "../component/dashboard/Sidebardb";
import MaterialSheetsControl from "../component/tables/MaterialSheetsControl";
import FormPayApplication from "../component/sheetcontrol/FormPayApplication";

const PayApplication = () => {
  const {
    formatCurrency,
    formatedDate,
    setIsModalOpenBudget,
    selectedProjectId,
    selectedSubfamily,
  } = useContext(ViewerContext);

  const [getApplicationData, setGetaApplicationData] = useState([]);
  console.log("🚀 ~ PayApplication ~ getApplicationData:", getApplicationData);
  const openModal = () => setIsModalOpenBudget(true);

  useEffect(() => {
    const fetchPayApplicationData = async () => {
      const response = await axios.get("http://localhost:8000/payapplication/");
      if (Array.isArray(response.data.data) && response.data.data.length > 0) {
        //filtro por projectId y Subfamily
      
        const filteredpayApplication = response.data.data.filter((payapplication) => {
          console.log("🚀 ~ filteredpayApplication ~ payapplication:", payapplication);
          return( 
          (!selectedProjectId ||
              payapplication.projectId === selectedProjectId) &&
            (!selectedSubfamily || payapplication.subfamily === selectedSubfamily)
         ) }
        );
        let acumuladoEEPP = 0;
        let acumuladoAnticipo = 0;
        let acumuladoRetenciones = 0;
        let acumuladoFacturas = 0;

        // Modificar cada objeto del array para incluir los acumulados
        const dataConAcumulados = filteredpayApplication.map((payapplication) => {
          acumuladoEEPP += Number(payapplication.payapplication);
          acumuladoAnticipo += Number(payapplication.dsctoanticipo);
          acumuladoRetenciones += Number(payapplication.retenciones);
          acumuladoFacturas += Number(payapplication.totalInvoices);
          // Añadir nuevos campos para los acumulados en el objeto
          return {
            ...payapplication,
            acumuladoEEPP,
            acumuladoAnticipo,
            acumuladoRetenciones,
            acumuladoFacturas,
          };
        });
        console.log("🚀 ~ dataConAcumulados ~ dataConAcumulados:", dataConAcumulados);

        setGetaApplicationData(dataConAcumulados);
        
      } else {
        console.error("Empty Array", response);
      }
    };

    fetchPayApplicationData();
  }, [selectedProjectId,selectedSubfamily,setGetaApplicationData,]);

 

  return (
    <div className="flex ">
      <Sidebardb />
      <div
        className="grid grid-cols-[3fr_1fr]
        ">
        <div className="bg-white p-2 mt-4 ml-4 rounded-xl">
          <MaterialSheetsControl />
          <div className="flex ">
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
          <FormPayApplication />
          <div className="">
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
                    Numero EEPP
                  </th>
                  <th className="border border-slate-500 px-4 text-base  ">
                    $ EEPP
                  </th>
                  <th className="border border-slate-500 px-4 text-base  ">
                    $ Acumulado EEPP
                  </th>
                  <th className="border border-slate-500 px-4 text-base  ">
                    $ Devolucion Anticipo
                  </th>
                  <th className="border border-slate-500 px-4 text-base  ">
                    $ Acumulado devolucion Anticipo
                  </th>
                  <th className="border border-slate-500 px-4 text-base  ">
                    $ Retenciones
                  </th>
                  <th className="border border-slate-500 px-4 text-base  ">
                    $ Acumulado Retenciones
                  </th>
                  <th className="border border-slate-500 px-4 text-base  ">
                    $ Valor Final Factura
                  </th>
                  <th className="border border-slate-500 px-4 text-base  ">
                    $ Acumulado Factura
                  </th>
                  <th className="border border-slate-500 px-4  text-base ">
                    Observaciones
                  </th>
                </tr>
              </thead>
              <tbody>
                {getApplicationData.map((payapplication) => (
                  <tr key={payapplication._id}>
                    <td className="border border-slate-500 px-4 text-base ">
                      {payapplication.projectId}
                    </td>
                    <td className="border border-slate-500 px-4 text-base ">
                      {payapplication.family}
                    </td>
                    <td className="border border-slate-500 px-4 text-base ">
                      {payapplication.subfamily}
                    </td>
                    <td className="border border-slate-500 px-4 text-base ">
                      {payapplication.invoices}
                    </td>
                    <td className="border border-slate-500 px-4 text-base ">
                      {formatedDate(payapplication.datepayapplication)}
                    </td>
                    <td className="border border-slate-500 px-4 text-base ">
                      {payapplication.subcontractorOffers}
                    </td>
                    <td className="border border-slate-500 px-4 text-base ">
                      {payapplication.numberpayapplication}
                    </td>
                    <td className="border border-slate-500 px-4 text-base ">
                      {formatCurrency(payapplication.payapplication)}
                    </td>
                    <td className="border border-slate-500 px-4 text-base ">
                      {formatCurrency(payapplication.acumuladoEEPP)}
                    </td>
                    <td className="border border-slate-500 px-4 text-base ">
                      {formatCurrency(payapplication.dsctoanticipo)}
                    </td>
                    <td className="border border-slate-500 px-4 text-base ">
                      {formatCurrency(payapplication.acumuladoAnticipo)}
                    </td>
                    <td className="border border-slate-500 px-4 text-base ">
                      {formatCurrency(payapplication.retenciones)}
                    </td>
                    <td className="border border-slate-500 px-4 text-base ">
                      {formatCurrency(payapplication.acumuladoRetenciones)}
                    </td>
                    <td className="border border-slate-500 px-4 text-base ">
                      {formatCurrency(payapplication.totalInvoices)}
                    </td>
                    <td className="border border-slate-500 px-4 text-base ">
                      {formatCurrency(payapplication.acumuladoFacturas)}
                    </td>
                    <td className="border border-slate-500 px-4 text-base ">
                      {payapplication.observations}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PayApplication;
