import { useEffect, useState } from "react";
import axios from "axios";

import {
  AreaChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Area,
  ResponsiveContainer,
} from "recharts";

const MainAreaChart = () => {
  const [dataProgress, setDataProgress] = useState([]);
  const [sortOrder, setSortOrder] = useState("asc");

  const sortData = (data, order) => {
    return [...data].sort((a, b) => {
      const dateA = new Date(a.date);
      const dateB = new Date(b.date);
      return order === "asc" ? dateA - dateB : dateB - dateA;
    });
  };

  useEffect(() => {
    const fetchProgress = async () => {
      try {
        const response = await axios.get("http://localhost:8000/admin");
        // console.log("respuesta del servidr", response.data);
        if (
          Array.isArray(response.data.data) &&
          response.data.data.length > 0
        ) {
          const formatData = response.data.data.map((item) => ({
            date: item.date,
            PlanValue: item.planValue,
            earnValue: item.earnValue,
          }));
          const sortedData = sortData(formatData, sortOrder);
          setDataProgress(sortedData);
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
  }, [sortOrder]);

  return (
    <div className="mt-10 flex ">
      <ResponsiveContainer width="70%" height={500}>
        <h2 className="text-indigo-800 font-bold text-2xl">
          Planed Value vs Earn Value
        </h2>
        <AreaChart
          data={dataProgress}
          margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
          <defs>
            <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#82ca9d" stopOpacity={0} />
            </linearGradient>
          </defs>
          <XAxis dataKey="date" />
          <YAxis />
          <CartesianGrid strokeDasharray="3 3" />
          <Tooltip />
          <Area
            type="monotone"
            dataKey="PlanValue"
            stroke="#8884d8"
            fillOpacity={1}
            fill="url(#colorUv)"
          />
          <Area
            type="monotone"
            dataKey="earnValue"
            stroke="#82ca9d"
            fillOpacity={1}
            fill="url(#colorPv)"
          />
          {/* <Area
            type="monotone"
            dataKey="amt"
            stroke="#dc2626"
            fillOpacity={1}
            fill="url(#colorPv)"
          /> */}
        </AreaChart>
      </ResponsiveContainer>
      <div className="ml-5 ">
        <h1 className="text-2xl text-blue-800 font-bold mt-4 ">
          Progress Information
        </h1>
        <table className="table-auto mt-4 border-collapse border border-slate-500 ml-2">
          <thead>
            <tr>
              <th className="border border-slate-500 px-4 text-lg ">Date</th>
              <th className="border border-slate-500 px-4 text-lg">
                Earn Value
              </th>
              <th className="border border-slate-500 px-4 text-lg">
                Plan Value
              </th>
              <th className="border border-slate-500 px-4 text-lg">SV</th>
              <th className="border border-slate-500 px-4 text-lg">SPI</th>
            </tr>
          </thead>
          <tbody>
            {dataProgress.map((item, index) => (
              <tr key={index}>
                <td className="border border-slate-500 text-center text-sm ">
                  {item.date}
                </td>
                <td className="border border-slate-500 text-center text-sm ">
                  
                  {item.PlanValue}
                </td>
                <td className="border border-slate-500 text-center text-sm">
                  {item.earnValue}
                </td>
                <td className="border border-slate-500 text-center text-sm">
                  {parseFloat(item.earnValue) - parseFloat(item.PlanValue)}
                </td>
                <td className="border border-slate-500 text-center text-sm">
                  {(
                    parseFloat(item.earnValue) / parseFloat(item.PlanValue)
                  ).toFixed(2)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MainAreaChart;
