import { useEffect, useState } from "react";
import { PureComponent } from "react";
import axios from "axios";

import { PieChart, Pie, Cell } from "recharts";

const PieChartProgress = () => {
  const [dataProgress, setDataProgress] = useState([]);
  const [sortOrder, setSortOrder] = useState("asc");

  // const sortData = (data, order) => {
  //   return [...data].sort((a, b) => {
  //     const dateA = new Date(a.date);
  //     const dateB = new Date(b.date);
  //     return order === "asc" ? dateA - dateB : dateB - dateA;
  //   });
  // };

  // useEffect(() => {
  //   const fetchProgress = async () => {
  //     try {
  //       const response = await axios.get("http://localhost:8000/admin");
  //       console.log("respuesta del servidr", response.data);
  //       if (
  //         Array.isArray(response.data.data) &&
  //         response.data.data.length > 0
  //       ) {
  //         const formatData = response.data.data.map((item) => ({
  //           date: item.date,
  //           PlanValue: item.planValue,
  //           earnValue: item.earnValue,
  //         }));
  //         const sortedData = sortData(formatData, sortOrder);
  //         setDataProgress(sortedData);
  //       } else {
  //         console.error(
  //           "Respuesta no es un arreglo o está vacío",
  //           response.data
  //         );
  //       }
  //     } catch (error) {
  //       console.error("Error en la carga de datos", error);
  //     }
  //   };
  //   fetchProgress();
  // }, [sortOrder]);
  const data01 = [
    {
      name: "Group A",
      value: 600,
    },
    {
      name: "Group B",
      value: 800,
    },
  ];

  // const data02 = [
  //   {
  //     name: "Group A",
  //     value: 400,
  //   },
  //   {
  //     name: "Group B",
  //     value: 600,
  //   },

  // ];

  const COLORS = ["#00C49F", "#FF8042"];
  return (
    <div className="mt-4 flex ">
      <PieChart width={170} height={170}>
        <Pie
          data={data01}
          dataKey="value"
          nameKey="name"
          cx="80"
          cy="80"
          innerRadius={60}
          outerRadius={80}
          paddingAngle={5}
          fill="#8884d8"
        />
        {data01.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
        ))}
      </PieChart>
    </div>
  );
};

export default PieChartProgress;
