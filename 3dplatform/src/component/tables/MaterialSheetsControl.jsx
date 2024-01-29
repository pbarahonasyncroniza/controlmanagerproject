import { useContext, useEffect, useState } from "react";
import { ViewerContext } from "../Context";
import ContractObservations from "../tables/ContractObservations";
import Invoices from "./Invoices";
import IdentificationHeader from "./IdentificationHeader";
import IncreasesAndDiscounts from "./IncreasesAndDiscounts";
import PurchaseOrderTable from "./PurchaseOrderTable";

const MaterialSheetsControl = () => {
  const {
    projects,
    getDataBudget,
    selectedSubfamily,
    setSelectedSubfamily,
    getTotalProyectado,
    getTotalRecuperable,
    selectedFamily,
    setMaterialSheets,
    acumuladoActualTotal,
    accumatedValue,
  } = useContext(ViewerContext);

  const [totalBySubFamily, setTotalBySubFamily] = useState({});
  const [familySubfamilyMap, setFamilySubfamilyMap] = useState({});

  useEffect(() => {
    const filteredSheets = projects
      .flatMap((project) => project.sheets || [])
      .filter((sheet) => {
        const familyMatch =
          selectedFamily === "" || sheet.family === selectedFamily;
        const subfamilyMatch =
          selectedSubfamily === "" || sheet.subfamily === selectedSubfamily;
        return familyMatch && subfamilyMatch;
      });

    setMaterialSheets(filteredSheets);
  }, [projects, selectedFamily, selectedSubfamily]);

  //  selecciona subfamily y  suma de totales por subfamily que viene del budget
  useEffect(() => {
    const filteredData =
      selectedSubfamily === ""
        ? getDataBudget
        : getDataBudget.filter((x) => x.subfamily === selectedSubfamily);

    const totalsBySubfamily = {};

    filteredData.forEach((x) => {
      const subfamily = x.subfamily;

      if (totalsBySubfamily[subfamily]) {
        totalsBySubfamily[subfamily] += x.totalPrice;
      } else {
        totalsBySubfamily[subfamily] = x.totalPrice;
      }
    });
    // devuelve el total por subfamily
    setTotalBySubFamily(totalsBySubfamily);
  }, [getDataBudget, selectedSubfamily, selectedFamily]);

  useEffect(() => {
    const map = {};
    getDataBudget.forEach((x) => {
      if (!map[x.family]) {
        map[x.family] = new Set();
      }
      map[x.family].add(x.subfamily);
    });

    setFamilySubfamilyMap(map); // Actualiza el estado con el nuevo mapa
  }, [getDataBudget]);

  const uniqueSubfamilies = Array.from(
    new Set(getDataBudget.map((x) => x.subfamily))
  );

  const formatCurrency = (value) => {
    return Number(value).toLocaleString("es-Cl", {
      style: "currency",
      currency: "CLP",
      minimumFractionDigits: 0,
    });
  };
  useEffect(() => {
    console.log(
      "🚀 ~ Valor Acumulado Actualizado materialSheets:",
      accumatedValue
    );
  }, [accumatedValue]);

  
  // calculo de totales acumulados que estan en la cabecera en tarjetas
  const montoSubfamilia = totalBySubFamily[selectedSubfamily] || 0;
  const totalProyectado = getTotalProyectado();
  const totalRecuperable = getTotalRecuperable();
  const totalconextras = montoSubfamilia + getTotalRecuperable();
  const ahorro = totalconextras - totalProyectado;
  const porpagar = totalProyectado - accumatedValue;
  
  return (
    <div>
      <div className="text-xl text-center mt-4 font-semibold bg-white ml-3 mr-2 rounded-xl">
        <h1>HOJAS DE CONTROL</h1>
        <select
          className="ml-4 bg-blue-500 p-2 rounded-lg text-white mt-4 mb-2 shadow-xl"
          value={selectedSubfamily}
          onChange={(e) => setSelectedSubfamily(e.target.value)}>
          <option className="" value="Elegir Hoja de Control">
            Elegir Hoja de Control
          </option>
          {uniqueSubfamilies.map((subfamily) => (
            <option key={subfamily} value={subfamily}>
              {subfamily}
            </option>
          ))}
        </select>
      </div>
      <IdentificationHeader />

      <div className="mt-3 ml-4 mr-2">
        <div className="bg-white mt-2 px-4 py-4 grid grid-cols-7 rounded-lg shadow-lg">
          <div className="bg-cyan-700 ml-4 mr-8 mt-4 mb-4  p-6 rounded-xl text-white text-center shadow-xl">
            <h1 className="text-lg font-semibold  text-white">
              MONTO PROPUESTA{" "}
            </h1>
            <div>
              {Object.entries(totalBySubFamily).map(([subfamily, total]) => (
                <div key={subfamily}>
                  <h2 className="text-3xl font-semibold mt-4  ">
                  ${total.toLocaleString('es-CL', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
                  </h2>
                </div>
              ))}
            </div>
          </div>
          <div className="bg-cyan-700 ml-8 mr-8 mt-4 mb-4  p-6 rounded-xl text-center shadow-xl">
            <h1 className="text-lg font-semibold  text-white">
              MONTO CONTRATO
            </h1>
            <h1 className="text-3xl font-semibold mt-4 text-white">
              {formatCurrency(totalProyectado)}
            </h1>
          </div>

          <div className="bg-cyan-700 ml-8 mr-8 mt-4 mb-4  p-6 rounded-xl text-center shadow-xl">
            <h1 className="text-lg font-semibold  text-white">RECUPERABLE</h1>
            <h1 className="text-3xl font-semibold  text-white mt-4">
              {formatCurrency(totalRecuperable)}
            </h1>
          </div>
          <div className="bg-cyan-700 ml-8 mr-8 mt-4 mb-4  p-6 rounded-xl text-center shadow-xl">
            <h1 className="text-lg font-semibold  text-white">
              TOTAL CON EXTRAS
            </h1>
            <h1 className="text-3xl font-semibold text-white mt-4">
              {formatCurrency(totalconextras)}
            </h1>
          </div>

          <div className="bg-green-400 ml-8 mr-8 mt-4 mb-4  p-6 rounded-xl text-center shadow-xl">
            <h1 className="text-lg font-semibold  text-white">
              AHORRO (Contrato - Total c/extras)
            </h1>
            <h1 className="text-3xl font-semibold mt-4 text-white">
              {formatCurrency(ahorro)}
            </h1>
          </div>

          <div className="bg-cyan-700 ml-8 mr-8 mt-4 mb-4  p-6 rounded-xl text-center shadow-xl">
            <div className="text-lg font-semibold ">
              <h1 className="text-lg font-semibold text-white">
                PAGADO A LA FECHA <br />
                (facturas)
              
              </h1>
              <h1 className="text-3xl font-semibold mt-4 text-white">
                {formatCurrency(accumatedValue)}
              </h1>
            </div>
          </div>
          <div className="bg-cyan-700 ml-8 mr-8 mt-4 mb-4  p-6 rounded-xl text-center shadow-xl">
            <div className="text-lg font-semibold 5 text-white">
              <h1 className="text-lg font-semibold text-white">
                SALDO POR PAGAR
              </h1>
              <h1 className="text-3xl font-semibold mt-1 ">
                {formatCurrency(porpagar)}
              </h1>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-3 ml-4  grid grid-cols-2 ">
        <div className="bg-white p-6 rounded-xl shadow-xl mr-2">
          <h1 className="text-xl font-semibold ">OBSERVACIONES AL CONTRATO</h1>
          <div>
            <ContractObservations />
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-xl mr-2 ">
          <h1 className="text-xl font-semibold ">AUMENTOS Y DESCUENTOS</h1>
          <div>
            <IncreasesAndDiscounts />
          </div>
        </div>
      </div>

      <div className="bg-white p-6 mt-3 ml-4 rounded-xl ">
        <h1 className="text-xl font-semibold ">FACTURAS</h1>
        <div className="  ">
          <Invoices />
        </div>
      </div>
      <div className="bg-white p-6 mt-3 ml-4 rounded-xl ">
        <h1 className="text-xl font-semibold ">ORDENES DE COMPRA</h1>
        <div className="  ">
          <PurchaseOrderTable />
        </div>
      </div>

      <div></div>
    </div>
  );
};
export default MaterialSheetsControl;
