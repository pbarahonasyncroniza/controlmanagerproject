import { useEffect, useState, useContext } from "react";
import { ViewerContext } from "../Context";
import axios from "axios";
import Exceltransform from "../Exceltransform";
import FormAreaChart from "../sheetcontrol/FormAreaChart";
import ActualCostTable from "../tables/ActualCostTable";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

const MainAreaChart = () => {
  const {
    totalByWeek,
    formatCurrency,
    setProjectId,
    setIsEditMode,
    setIsModalOpenProgress,
    setCurrentIdProgress,
    combinedData,
    setCombinedData,
    aernValueAccumalated,
    setEarnValueAccumulated,
    totalPlanValue,
    setTotalPlanValue,
    projectDuration,
  } = useContext(ViewerContext);
  console.log(
    "🚀 ~ MainAreaChart ~ aernValueAccumalated:",
    aernValueAccumalated
  );
  console.log("🚀 ~ MainAreaChart ~ combinedData:", combinedData);

  const [dataProgress, setDataProgress] = useState([]);

  const [totalEarnValue, setTotalEarnValue] = useState("");
  console.log("🚀 ~ MainAreaChart ~ totalEarnValue:", totalEarnValue);
  console.log("🚀 ~ MainAreaChart ~ totalPlanValue:", totalPlanValue);

  // const openModal = () => setIsModalOpenProgress(true);

  //---------------------Open and  Update Form ----------------------//
  const openFormAndCurrentProgressId = (progressId) => {
    // Encuentra el contrato específico por su ID
    const progressToEdit = dataProgress.find(
      (progress) => progress._id === progressId
    );
    if (progressToEdit) {
      setProjectId(progressToEdit.projectId);
      setCurrentIdProgress(progressToEdit._id);
      setIsEditMode(true);
      setIsModalOpenProgress(true);
    }
  };
  //---------------------------------------------------------------------------//

  useEffect(() => {
    const fetchProgress = async () => {
      try {
        const response = await axios.get("http://localhost:8000/progress/");

        if (
          Array.isArray(response.data.data) &&
          response.data.data.length > 0
        ) {
          const formatData = response.data.data.map((item) => ({
            _id: item._id,
            projectId: item.projectId,
            week: item.week,
            dateStart: new Date(item.dateStart),
            finishdate: new Date(item.finishdate),
            planValue: item.planValue,
            earnValue: item.earnValue,
            actualCost: item.actualCost,
          }));

          // Ordenar las fechas por dateStart de manera ascendente
          formatData.sort((a, b) => a.dateStart - b.dateStart);
          setDataProgress(formatData);
        } else {
          console.error(
            "Respuesta no es un arreglo o está vacío",
            response.data
          );
        }
      } catch (error) {
        console.error("Error en la carga de datos", error);
      }
    };
    fetchProgress();
  }, []);
  //------------------------------Combine Data --------------------------------//
  useEffect(() => {
    // Combinar los datos de dataProgress y totalByWeek en la estructura necesaria
    const combinedData = dataProgress.map((item) => ({
      _id: item._id,
      projectId: item.projectId,
      dateStart: item.dateStart,
      finishdate: item.finishdate,
      week: item.week,
      planValue: item.planValue,
      totalByWeekValue: totalByWeek[item.week] || 0,
      earnValue: item.earnValue,
    }));

    setCombinedData(combinedData);
  }, [dataProgress, totalByWeek]);

  //--------------------- Calculo de Acumulados  --------------------------------------/

  useEffect(() => {
    let acumuladoEarn = 0;
    let acumuladoActualCost = 0;
    let acumuladoPlanValue = 0;

    // Calcula el total de EarnValue
    const totalEarnValue = combinedData.reduce(
      (acc, item) => acc + (item.earnValue || 0),
      0
    );
    setTotalEarnValue(totalEarnValue);

    // Calcula el total de planValue
    const totalPlanValue = combinedData.reduce(
      (acc, item) => acc + (item.planValue || 0),
      0
    );
    setTotalPlanValue(totalPlanValue);

    const newArray = combinedData.map((item) => {
      acumuladoEarn += item.earnValue || 0;
      acumuladoActualCost += totalByWeek[item.week] || 0;
      acumuladoPlanValue += item.planValue || 0;

      return {
        ...item,
        acumuladoEarn,
        acumuladoActualCost,
        acumuladoPlanValue,
      };
    });

    setEarnValueAccumulated(newArray);
  }, [combinedData, totalByWeek]);
  //--------------------- Date transformation format ------------------------------//

  const newArray = dataProgress.map((item) => {
    // Obtenemos la fecha dateStart del objeto actual
    const dateStart = new Date(item.dateStart);

    // Obtenemos el número de semana del año
    const weekOfYear = getWeekNumber(dateStart);

    // Creamos un nuevo objeto con la semana del año y el planValue
    return {
      semana: weekOfYear,
      planValue: item.planValue,
    };
  });

  // Función para obtener el número de semana del año
  function getWeekNumber(date) {
    const oneJan = new Date(date.getFullYear(), 0, 1);
    const timeDiff = date - oneJan;
    const dayOfYear = Math.ceil(timeDiff / 86400000);
    return Math.ceil(dayOfYear / 7);
  }

  // El nuevo arreglo con la información requerida
  console.log(newArray);

  // ---------------------------------------------------------------------------------------------------------//

  const formatedDate = (isoDate) => {
    if (!isoDate) return "";

    const date = new Date(isoDate);
    const day = date.getUTCDate();
    const month = date.getUTCMonth() + 1;
    const year = date.getUTCFullYear();

    const formattedDay = String(day).padStart(2, "0");
    const formattedMonth = String(month).padStart(2, "0");

    return `${formattedDay}/${formattedMonth}/${year}`;
  };
  //---------------------------------------SPI---------------------

  return (
    <div className=" mt-10 ml-10">
      <FormAreaChart />
      <h2 className="text-indigo-800 font-bold text-2xl">
        Planed Value vs Earn Value
      </h2>
      <LineChart
        width={1800}
        height={800}
        data={aernValueAccumalated}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}>
        <CartesianGrid strokeDasharray="5 5" />
        <XAxis dataKey="dateStart" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="acumuladoPlanValue" stroke="#8884d8" />
        <Line type="monotone" dataKey="acumuladoActualCost" stroke="#e4122e" />
        <Line type="monotone" dataKey="acumuladoEarn" stroke="#82ca9d" />
      </LineChart>

      <div>
        <Exceltransform UrlEndpoint="http://localhost:8000/progress/" />
      </div>

      <div className="ml-5 overflow-y-scroll max-h-[500px] sticky">
        <h1 className="text-2xl text-blue-800 font-bold mt-4 ">
          Progress Information
        </h1>
        <table className="sticky">
          <thead>
            <tr className="sticky">
              <th className="sticky border border-slate-500 px-4 text-lg text-black ">
                ProjectId
              </th>
              <th className="sticky border border-slate-500 px-4 text-lg text-black ">
                Project Week
              </th>
              <th className="sticky border border-slate-500 px-4 text-lg text-black ">
                Start Date
              </th>
              <th className="sticky border border-slate-500 px-4 text-lg text-black ">
                Finish Date
              </th>
              <th className="sticky border border-slate-500 px-4 text-lg">
                Plan Value
              </th>
              <th className="sticky border border-slate-500 px-4 text-lg">
                Plan Value Accumulated
              </th>
              <th className="sticky border border-slate-500 px-4 text-lg">
                % Plan Value
              </th>
              <th className="sticky border border-slate-500 px-4 text-lg">
                Earn Value
              </th>
              <th className="sticky border border-slate-500 px-4 text-lg">
                Earn Value Accumulated
              </th>
              <th className="sticky border border-slate-500 px-4 text-lg">
                % Earn Value
              </th>
              <th className="sticky border border-slate-500 px-4 text-lg">
                Actual Cost
              </th>
              <th className="sticky border border-slate-500 px-4 text-lg">
                Actual Cost Accumulated
              </th>
              <th className="sticky border border-slate-500 px-4 text-lg">
                % Actual Cost Accumulated
              </th>
              <th className="sticky border border-slate-500 px-4 text-lg">
                SPI (EV/PV)
              </th>
              <th className="sticky border border-slate-500 px-4 text-lg">
                EAC (Estimacion a termino)días
              </th>
            </tr>
          </thead>
          <tbody>
            {aernValueAccumalated.map((progress) => (
              <tr key={progress._id}>
                <td className="border border-slate-500 text-center text-sm ">
                  {progress.projectId}
                </td>
                <td className="border border-slate-500 text-center text-sm ">
                  {progress.week}
                </td>
                <td className="border border-slate-500 text-center text-sm ">
                  {formatedDate(progress.dateStart)}
                </td>
                <td className="border border-slate-500 text-center text-sm ">
                  {formatedDate(progress.finishdate)}
                </td>
                <td className="border border-slate-500 text-center text-sm ">
                  {formatCurrency(progress.planValue)}
                </td>
                <td className="border border-slate-500 text-center text-sm ">
                  {formatCurrency(progress.acumuladoPlanValue)}
                </td>
                <td className="border border-slate-500 text-center text-sm ">
                  {(
                    (progress.acumuladoPlanValue / totalPlanValue) *
                    100
                  ).toFixed(2)}
                  %
                </td>
                <td className="border border-slate-500 text-center text-sm grid grid-cols-2 ">
                  {formatCurrency(progress.earnValue)}
                  <button
                    className="bg-green-500 p-1 ml-3 mr-3 text-white rounded-lg text-sm flex justify-center"
                    onClick={() => openFormAndCurrentProgressId(progress._id)}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-3 h-3 ">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125"
                      />
                    </svg>
                  </button>
                </td>
                <td className="border border-slate-500 text-center text-sm">
                  {formatCurrency(progress.acumuladoEarn)}
                </td>
                <td className="border border-slate-500 text-center text-sm">
                  {((progress.acumuladoEarn / totalPlanValue) * 100).toFixed(2)}
                  %
                </td>
                <td className="border border-slate-500 text-center text-sm">
                  {formatCurrency(progress.totalByWeekValue)}
                </td>
                <td className="border border-slate-500 text-center text-sm">
                  {formatCurrency(progress.acumuladoActualCost)}
                </td>
                <td className="border border-slate-500 text-center text-sm">
                  {(
                    (progress.acumuladoActualCost / totalPlanValue) *
                    100
                  ).toFixed(2)}
                  %
                </td>
                <td className="border border-slate-500 text-center text-sm">
                  {(
                    progress.acumuladoEarn / progress.acumuladoPlanValue
                  ).toFixed(2)}
                </td>
                <td className="border border-slate-500 text-center text-sm">
                  {(
                    projectDuration /
                    (progress.acumuladoEarn / progress.acumuladoPlanValue)
                  ).toFixed(2)}
                </td>
                <td>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* <ActualCostTable /> */}
    </div>
  );
};

export default MainAreaChart;
