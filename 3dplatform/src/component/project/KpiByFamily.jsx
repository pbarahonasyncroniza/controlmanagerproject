import { useContext, useState, useEffect } from "react";
import { ViewerContext } from "../Context";

const KpiByFamily = () => {
  const { getDataBudget, projects } = useContext(ViewerContext);
  console.log("🚀 ~ KpiByFamily ~ getDataBudget:", getDataBudget);
  const [totalsByFamily, setTotalsByFamily] = useState({});
  console.log("🚀 ~ KpiByFamily ~ totalsByFamily:", totalsByFamily);
  const [actualcostByFamily, setActualCostByFamily] = useState({});
  console.log("🚀 ~ KpiByFamily ~ actualcostByFamily:", actualcostByFamily);

  // calcula el valor actuar por familia
  useEffect(() => {
    const actualCostByFamily = {};

    // Iterar sobre cada proyecto
    projects.forEach((project) => {
      // Asegurarse de que cada proyecto tiene 'sheets'
      if (project.sheets && project.sheets.length > 0) {
        // Iterar sobre cada 'sheet' en el proyecto
        project.sheets.forEach((sheet) => {
          const { family, total } = sheet;
          if (actualCostByFamily[family]) {
            actualCostByFamily[family] += Number(total);
          } else {
            actualCostByFamily[family] = Number(total);
          }
        });
      }
    });

    setActualCostByFamily(actualCostByFamily);
  }, [projects]);

  // calcula el valor de presupuesto por familia
  useEffect(() => {
    const totals = {};

    getDataBudget.forEach((item) => {
      const { family, totalPrice } = item;

      if (totals[family]) {
        totals[family] += Number(totalPrice);
      } else {
        totals[family] = Number(totalPrice);
      }
    });

    setTotalsByFamily(totals);
  }, [getDataBudget]);

  // function calculateSPI(actualCosts, plannedValues) {
  //   let spiByFamily = {};
  //   // Iterar a través de las claves en plannedValues (presupuesto planificado)
  //   if (plannedValues === undefined) {
  //     plannedValues = {};
  //   } else {
  //     Object.keys(plannedValues).forEach((family) => {
  //       console.log("🚀 ~ Object.keys ~ plannedValues:", plannedValues);
  //       if (totalsByFamily[family] === undefined) {
  //         totalsByFamily[family] = 0;
  //       }
  //       const pv = plannedValues[family]; // Presupuesto planificado para la familia
  //       const ac = actualCosts[family] || 0; // Costo actual para la familia, si no hay, se usa 0

  //       spiByFamily[family] = pv > 0 ? ac / pv : 0; // Calcular el SPI, evitando la división por cero
  //     });

  //     return spiByFamily;
  //   }
  // }

  // const spiByFamily = calculateSPI(actualcostByFamily, totalsByFamily);
  // console.log("SPI por familia:", spiByFamily);
  function calculateSPI(actualCosts, plannedValues) {
    let spiByFamily = {};

    // Si plannedValues es undefined, retorna un objeto vacío
    if (plannedValues === undefined) {
      return spiByFamily;
    }

    // Iterar a través de las claves en plannedValues (presupuesto planificado)
    Object.keys(plannedValues).forEach((family) => {
      console.log(
        "🚀 ~ Object.keys ~  Object.keys(plannedValues):",
        Object.keys(plannedValues)
      );
      const pv = plannedValues[family]; // Presupuesto planificado para la familia
      const ac = actualCosts[family] || 0; // Costo actual para la familia, si no hay, se usa 0

      spiByFamily[family] = pv > 0 ? ac / pv : 0; // Calcular el SPI, evitando la división por cero
    });

    return spiByFamily;
  }

  const spiByFamily = calculateSPI(actualcostByFamily, totalsByFamily);
  console.log("SPI por familia:", spiByFamily);

  const conditionalSPIColor = (spi) =>{
  if (spi ===0){
    return "yellow"
  }else if(spi >1 ){
    return "red"
  }else{
    {
      return "black"
    }
  }

  }


  return (
    <div className="ml-4 mt-4  bg-white p-2 rounded-lg mr-6 shadow-lg">
  <h1 className="text-xl font-semibold">VALORES POR FAMILIA</h1>
  <div className="grid grid-cols-6 gap-4 mr-2">
    {Object.entries(totalsByFamily).map(([family, total]) => {
      const spiColor = conditionalSPIColor(spiByFamily[family]);
      
      return (
        <div
          key={family}
          className="bg-blue-500 p-2 rounded-lg text-white shadow-lg">
          <p className="text-center text-xl shadow-xl">{family}</p>
          <div className="text-center text-xl mt-2">
            Total: ${total.toLocaleString()}
          </div>
          <div className="text-center mt-2 text-2xl">
            Actual: $
            {actualcostByFamily[family]
              ? actualcostByFamily[family].toLocaleString()
              : "No disponible"}
          </div>
          <div className="text-center mt-2 text-2xl" style={{ color: spiColor }}>
            SPI: 
            {spiByFamily[family] !== undefined 
              ? spiByFamily[family].toFixed(2)
              : "No disponible"}
          </div>
        </div>
      );
    })}
  </div>
</div>
  );
};

export default KpiByFamily;
