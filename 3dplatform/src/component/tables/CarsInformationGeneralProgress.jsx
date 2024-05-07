import { useContext, useEffect, useState } from "react";
import { ViewerContext } from "../Context";

function CarsInformationGeneralProgress() {
  const { aernValueAccumalated, totalPlanValue,projectDuration, setProjectDuration } = useContext(ViewerContext);
  console.log("🚀 ~ CarsInformationGeneralProgress ~ aernValueAccumalated:", aernValueAccumalated);

  const [selectedWeek, setSelectedWeek] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  console.log("🚀 ~ CarsInformationGeneralProgress ~ projectDuration:", projectDuration);

  useEffect(() => {
    if (!selectedWeek) return;

    const filtered = aernValueAccumalated.filter((data) => {
      return data.week === selectedWeek;
    });

    setFilteredData(filtered);

    // Calcular la duración del proyecto en días corridos
    if (aernValueAccumalated.length > 0) {
      const startDate = new Date(aernValueAccumalated[0].dateStart); // Primera fecha de inicio del proyecto
      console.log("🚀 ~ useEffect ~ startDate:", startDate);
      const endDate = new Date(aernValueAccumalated[aernValueAccumalated.length - 1].finishdate); // Última fecha de fin del proyecto
      console.log("🚀 ~ useEffect ~ endDate:", endDate);
     
      const days = calculateDays(startDate, endDate); // Calcular la duración en días corridos
      setProjectDuration(days);
    }
  }, [selectedWeek, aernValueAccumalated]);

  const calculatePercentage = (value, total) => {
    return total !== 0 ? ((value / total) * 100).toFixed(2) : 0;
  };

  const currentPlanValue =
    filteredData.length > 0 ? filteredData[0].acumuladoPlanValue : 0;

  const totalEarnValue =
    filteredData.length > 0 ? filteredData[0].acumuladoEarn : 0;

  const totalActualCost =
    filteredData.length > 0 ? filteredData[0].acumuladoActualCost : 0;

  const SPI = totalEarnValue / currentPlanValue;

  // Función para calcular la duración en días corridos
  function calculateDays(startDate, endDate) {
    let currentDate = new Date(startDate);
    const end = new Date(endDate);
    let count = 0;
    
    while (currentDate <= end) {
      const dayOfWeek = currentDate.getDay();
      if (dayOfWeek !== "" && dayOfWeek !== "") {
        count++;
      }
      currentDate.setDate(currentDate.getDate() + 1);
    }
    
    return count;
  }

  return (
    <div>
      <div className="mt-3 ml-4 mr-2">
        <select
          className="rounded-lg p-2 bg-blue-500"
          value={selectedWeek}
          onChange={(e) => setSelectedWeek(e.target.value)}>
          <option value="">Seleccione una semana</option>
          {aernValueAccumalated.map((data) => (
            <option className="text-white" key={data.week} value={data.week}>
              {data.week}
            </option>
          ))}
        </select>
        {selectedWeek && (
          <div className="bg-white mt-2 px-4 py-4 grid grid-cols-7 rounded-lg shadow-lg">
            <div className="bg-cyan-700 ml-8 mr-8 mt-4 mb-4 p-6 rounded-xl text-center shadow-xl">
              <h1 className="text-lg font-light text-white">
                SEMANA DEL PROYECTO
              </h1>
              <h1 className="text-2xl font-semibold mt-4 text-white">
                {selectedWeek}
              </h1>
            </div>
            <div className="bg-cyan-700 ml-8 mr-8 mt-4 mb-4 p-6 rounded-xl text-center shadow-xl">
              <h1 className="text-lg font-light text-white">
                % AVANCE PLANIFICADO
              </h1>
              <h1 className="text-3xl font-semibold text-white mt-4">
                {((currentPlanValue / totalPlanValue) * 100).toFixed(2)} %
              </h1>
            </div>
            <div className="bg-cyan-700 ml-8 mr-8 mt-4 mb-4 p-6 rounded-xl text-center shadow-xl">
              <h1 className="text-lg font-light text-white">% AVANCE REAL</h1>
              <h1 className="text-3xl font-semibold text-white mt-4">
                {calculatePercentage(totalEarnValue, totalPlanValue)} %
              </h1>
            </div>
            <div className="bg-cyan-700 ml-8 mr-8 mt-4 mb-4 p-6 rounded-xl text-center shadow-xl">
              <h1 className="text-lg font-light text-white">% COSTO ACTUAL</h1>
              <h1 className="text-3xl font-semibold text-white mt-4">
                {calculatePercentage(totalActualCost, totalPlanValue)} %
              </h1>
            </div>
            <div className="bg-cyan-700 ml-8 mr-8 mt-4 mb-4 p-6 rounded-xl text-center shadow-xl">
              <h1 className="text-lg font-light text-white">SPI</h1>
              <h1 className="text-3xl font-semibold text-white mt-4">
                {SPI.toFixed(2)} %
              </h1>
            </div>
            <div className="bg-cyan-700 ml-8 mr-8 mt-4 mb-4 p-6 rounded-xl text-center shadow-xl">
              <h1 className="text-lg font-light text-white">
                Duración del Proyecto
              </h1>
              <h1 className="text-3xl font-semibold text-white mt-4">
                {projectDuration} días corridos
              </h1>
            </div>
            <div className="bg-cyan-700 ml-8 mr-8 mt-4 mb-4 p-6 rounded-xl text-center shadow-xl">
              <h1 className="text-lg font-light text-white">
                Proyeccion a termino
              </h1>
              <h1 className="text-3xl font-semibold text-white mt-4">
                {((projectDuration/SPI).toFixed(0))} días corridos
              </h1>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default CarsInformationGeneralProgress;
