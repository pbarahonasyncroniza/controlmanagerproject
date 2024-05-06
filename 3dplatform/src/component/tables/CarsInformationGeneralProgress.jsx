import { useContext, useEffect, useState } from "react";
import { ViewerContext } from "../Context";
function CarsInformationGeneralProgress() {
  const { formatCurrency, combinedData,aernValueAccumalated, setEarnValueAccumulated } = useContext(ViewerContext);
 

  return (
    <div>
      <div className="mt-3 ml-4 mr-2  ">
        <div className="bg-white mt-2 px-4 py-4 grid grid-cols-7 rounded-lg shadow-lg">
          <div className="bg-cyan-700 ml-4 mr-8 mt-4 mb-4  p-6 rounded-xl text-white text-center shadow-xl">
            <h1 className="text-lg font-light  text-white">MONTO PROPUESTA</h1>
            {/* <div>
              {Object.entries("").map(([subfamily, totalProyectado]) => (
                <div key={subfamily}>
                  <h2 className="text-3xl font-semibold mt-4  ">
                    $
                    {totalProyectado.toLocaleString("es-CL", {
                      minimumFractionDigits: 0,

                      maximumFractionDigits: 0,
                    })}
                  </h2>
                </div>
              ))}
            </div> */}
          </div>
          <div className="bg-cyan-700 ml-8 mr-8 mt-4 mb-4  p-6 rounded-xl text-center shadow-xl">
            <h1 className="text-lg font-light text-white">FECHA DE CORTE</h1>
            <h1 className="text-2xl font-semibold mt-4 text-white">
              {formatCurrency("")}
            </h1>
          </div>

          <div className="bg-cyan-700 ml-8 mr-8 mt-4 mb-4  p-6 rounded-xl text-center shadow-xl">
            <h1 className="text-lg font-light  text-white">
              % AVANCE PLANIFICADO
            </h1>
            <h1 className="text-3xl font-semibold  text-white mt-4">
              {formatCurrency()}
            </h1>
          </div>
          <div className="bg-cyan-700 ml-8 mr-8 mt-4 mb-4  p-6 rounded-xl text-center shadow-xl">
            <h1 className="text-lg font-light  text-white">% AVANCE REAL</h1>
            <h1 className="text-3xl font-semibold text-white mt-4">
              {formatCurrency()}
            </h1>
          </div>

          <div className="ml-8 mr-8 mb-4 shadow-xl">
            <div className="">
              {/* <div
                style={{
                  ...baseStyle, // Aplicamos primero el estilo base
                  ...(ahorro >= 0 ? cardStylePositive : cardStyleNegative), // Luego sobreescribimos con el estilo condicional
                }}>
                <h1 className="text-lg text-center font-light mb-2  text-white">
                  {ahorro >= 0 ? "AHORRO" : "PERDIDA"}
                </h1>
                <h2 className="text-3xl text-center font-semibold ">
                  $
                  {ahorro.toLocaleString("es-CL", {
                    minimumFractionDigits: 0,
                    maximumFractionDigits: 0,
                  })}
                </h2>
              </div> */}
              {/* Otras tarjetas */}
            </div>
          </div>

          <div className="bg-cyan-700 ml-8 mr-8 mt-4 mb-4  p-6 rounded-xl text-center shadow-xl">
            <div className="text-lg font-semibold ">
              <h1 className="text-lg font-light text-white">% COSTO ACTUAL</h1>
              <h1 className="text-3xl font-semibold mt-4 text-white">
                {formatCurrency()}
              </h1>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CarsInformationGeneralProgress;
