import { useContext, useState, useEffect } from "react";
import { ViewerContext } from "../Context";
import Sidebardb from "../dashboard/Sidebardb";

function ReportControlSheet() {
  const {
    selectedFamily,
    selectedSubfamily,
    formatCurrency,
    getDataBudget,
    selectedProjectId,
    dataIncreaseDiscount,
    dataincreaseDisccountwthitoutfilter,
    contracObservationWhitOutFilter,
  } = useContext(ViewerContext);
  console.log(
    "🚀 ~ ReportControlSheet ~ dataincreaseDisccountwthitoutfilter:",
    dataincreaseDisccountwthitoutfilter
  );
  console.log(
    "🚀 ~ ReportControlSheet ~ contracObservationWhitOutFilter:",
    contracObservationWhitOutFilter
  );

  const [summaryData, setSummaryData] = useState([]);

  const getMontoContrato = (subfamily) => {
    return contracObservationWhitOutFilter.data.data.reduce((total, item) => {
      const matchesProject =
        !selectedProjectId || item.projectId === selectedProjectId;
      const matchesFamily = !selectedFamily || item.family === selectedFamily;
      const matchesSubfamily = item.subfamily === subfamily;
      if (matchesProject && matchesFamily && matchesSubfamily) {
        return total + (Number(item.Proyectado) || 0);
      }
      return total;
    }, 0);
  };
  const getRecuperable = (subfamily) => {
    return dataincreaseDisccountwthitoutfilter.data.data.reduce(
      (total, item) => {
        const matchesProject =
          !selectedProjectId || item.projectId === selectedProjectId;
        const matchesFamily = !selectedFamily || item.family === selectedFamily;
        const matchesSubfamily = item.subfamily === subfamily;
        if (matchesProject && matchesFamily && matchesSubfamily) {
          return total + (Number(item.Recuperable) || 0);
        }
        return total;
      },
      0
    );
  };

  useEffect(() => {
    const subfamilies = [
      ...new Set(getDataBudget.map((item) => item.subfamily)),
    ];
    const newSummaryData = subfamilies.map((subfamily, index) => {
      const filteredData = getDataBudget.filter((item) => {
        const matchesProject =
          !selectedProjectId || item.projectId === selectedProjectId;
        const matchesFamily = !selectedFamily || item.family === selectedFamily;
        const matchesSubfamily = item.subfamily === subfamily;
        return matchesProject && matchesFamily && matchesSubfamily;
      });

      const montoPropuesta = filteredData.reduce(
        (total, current) => total + current.totalPrice,
        0
      );

      const montoContrato = getMontoContrato(subfamily);
      const getrecuperable = getRecuperable(subfamily);
      const totalconextras = montoContrato + getrecuperable;
      const ahorro = montoPropuesta - totalconextras;

      return {
        subfamily,
        projectId: selectedProjectId,
        montoPropuesta,
        montoContrato: montoContrato,
        recuperable: getrecuperable,
        totalconextras,
        ahorro,
        contrato: montoPropuesta,
      };
    });

    setSummaryData(newSummaryData);
  }, [
    getDataBudget,
    dataIncreaseDiscount,
    selectedProjectId,
    selectedFamily,
    selectedSubfamily,
    contracObservationWhitOutFilter,
    dataincreaseDisccountwthitoutfilter,
  ]); 

  // Aplicar clases condicionales
  const getAhorroClass = (ahorro) => {
    return ahorro >= 0 ? "positive" : "negative";
  };

  return (
    <div className="flex">
      <Sidebardb />
      <div className="ml-3 mt-3">
        <h1>Elegir Proyecto</h1>
        <table className="sticky">
          <thead>
            <tr className="sticky">
              <th className="sticky border border-slate-500 px-4 text-lg text-black ">
                ProjectId
              </th>
              <th className="sticky border border-slate-500 px-4 text-lg text-black ">
                Hoja de Control
              </th>
              <th className="sticky border border-slate-500 px-4 text-lg text-black ">
                Monto Propuesta
              </th>
              <th className="sticky border border-slate-500 px-4 text-lg text-black ">
                Monto Contrato
              </th>
              <th className="sticky border border-slate-500 px-4 text-lg text-black ">
                Recuperable
              </th>
              <th className="sticky border border-slate-500 px-4 text-lg text-black ">
                Total con Extras
              </th>
              <th className="sticky border border-slate-500 px-4 text-lg">
                Ahorro/Perdida
              </th>
            </tr>
          </thead>
          <tbody>
            {summaryData.map((item, index) => (
              <tr key={index}>
                <td className="border border-slate-500 text-center text-sm ">
                  {item.projectId}
                </td>
                <td className="border border-slate-500 text-center text-sm ">
                  {item.subfamily}
                </td>
                <td className="border border-slate-500 text-center text-sm ">
                  {formatCurrency(item.montoPropuesta)}
                </td>
                <td className="border border-slate-500 text-center text-sm ">
                  {formatCurrency(item.montoContrato)}
                </td>
                <td className="border border-slate-500 text-center text-sm ">
                  {formatCurrency(item.recuperable)}
                </td>
                <td className="border border-slate-500 text-center text-sm ">
                  {formatCurrency(item.totalconextras)}
                </td>
                <td className="border border-slate-500 text-center text-sm ">
                  {formatCurrency(item.ahorro)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ReportControlSheet;
