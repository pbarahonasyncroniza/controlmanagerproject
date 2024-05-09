import {  useContext } from "react";
import { ViewerContext } from "../Context";
import FormAreaChart from "../sheetcontrol/FormAreaChart";
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
  
    aernValueAccumalated,

  } = useContext(ViewerContext);


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
        }}
        style={{ backgroundColor: 'rgba(255, 255, 255, 0.8)' }} // Cambia el color de fondo del canvas del gráfico
        
        >
        <CartesianGrid strokeDasharray="3 3" stroke="#ccc" />
        <XAxis
          dataKey="dateStart"
          tick={{ fontSize: "12px" }}
          stroke="#8884d8"
          tickFormatter={(date) => new Date(date).toLocaleDateString()}
        />
        <YAxis
          tick={{ fontSize: "10px" }} 
          stroke="#8884d8"// Tamaño de la fuente en el eje Y
          tickFormatter={(value) =>
            value.toLocaleString("es-CL", {
              style: "currency",
              currency: "CLP",
            })
          } // Personaliza el formato de los valores del eje Y
          tickCount={10} // Controla la cantidad de marcas en el eje Y
        />
        <Tooltip
          contentStyle={{
            backgroundColor: "rgba(255, 255, 255, 0.8)",
            boxShadow: "10px 10px 10px rgba(0, 0, 0, 0.1)", // Añade una sombra al tooltip
          }}
          labelFormatter={(date) => new Date(date).toLocaleDateString()} // Personaliza el formato de la fecha en el tooltip
          formatter={(value, name, props) => {
            // Personaliza el contenido del tooltip
            return [
              
              `${name}: ${value.toLocaleString("es-CL", {
                style: "currency",
                currency: "CLP",
              })}`, // Formato de moneda
            ];
          }}
        />
        <Legend />
        <Line
          type="monotone"
          dataKey="acumuladoPlanValue"
          stroke="#8884d8"
          name="PlanValue"
        />
        <Line
          type="monotone"
          dataKey="acumuladoActualCost"
          stroke="#e4122e"
          name="ActualCost"
        />
        <Line
          type="monotone"
          dataKey="acumuladoEarn"
          stroke="#82ca9d"
          name="EarnValue"
        />
      </LineChart>

     </div>
  );
};

export default MainAreaChart;
