import { useContext, useEffect, useState } from "react";
import { ViewerContext } from "../Context";
import {
  Table,
  Header,
  HeaderRow,
  HeaderCell,
  Row,
  Body,
  Cell,
} from "@table-library/react-table-library/table";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

import { useTheme } from "@table-library/react-table-library/theme";
import Exceltransform from "../Exceltransform";

const MonthCostaLaborTable = () => {
  const { dataNode, projects, formatCurrency } = useContext(ViewerContext);
  const [totalsWithAccumulated, setTotalsWithAccumulated] = useState([]);
  const [monthlyCosts, setMonthlyCosts] = useState([]);
  const [selectedByProjectId, setSelectedByProjectId] = useState("");
  const [combinedData, setCombinedData] = useState("");
  // filtra la mano de obra proyectada por mes
  useEffect(() => {
    let filteredSheets = projects
      .flatMap((project) => project.sheets)
      .filter(
        (sheet) =>
          sheet.family === "Mano_Obra" &&
          (!selectedByProjectId || sheet.projectId === selectedByProjectId)
      );

    const manoobraData = filteredSheets.sort(
      (a, b) => new Date(a.date) - new Date(b.date)
    );
    const groupedByMonth = manoobraData.reduce((acc, sheet) => {
      const monthYear = `${new Date(sheet.date).getMonth() + 1}-${new Date(
        sheet.date
      ).getFullYear()}`;
      if (!acc[monthYear]) {
        acc[monthYear] = {
          realCost: 0,
          plannedCost: 0,
          accumulatedReal: 0,
        };
      }
      acc[monthYear].realCost += sheet.total;
      return acc;
    }, {});

    // Reinicia acumuladoReal para cada proyecto
    let acumuladoReal = 0;
    const monthlyData = Object.entries(groupedByMonth).map(
      ([monthYear, data]) => {
        acumuladoReal += data.realCost;
        return {
          monthYear,
          realCost: data.realCost,
          plannedCost: data.plannedCost, // Asume este valor ya está calculado o agregado
          accumulatedReal: acumuladoReal,
        };
      }
    );

    setMonthlyCosts(monthlyData);
  }, [projects, selectedByProjectId]);

  // Filtra los acumulados por proyecto separadamente

  useEffect(() => {
    // Agrupar dataNode.nodes por projectId
    const groupedByProject = dataNode.nodes.reduce((acc, item) => {
      const { projectId } = item;
      if (!acc[projectId]) {
        acc[projectId] = [];
      }
      acc[projectId].push(item);
      return acc;
    }, {});

    // Aquí, cada 'items' es un arreglo de nodos para un projectId específico
    const totalsByProject = Object.entries(groupedByProject)
      .map(([projectId, items]) => {
        // Ahora agrupa y calcula por monthYear dentro de cada proyecto
        const groupedByMonth = items.reduce((acc, item) => {
          const monthYear = `${
            new Date(item.deadline).getMonth() + 1
          }-${new Date(item.deadline).getFullYear()}`;
          if (!acc[monthYear]) {
            acc[monthYear] = { totalLabor: 0, items: [] };
          }
          acc[monthYear].totalLabor += Number(item.total || 0);
          acc[monthYear].items.push(item);
          return acc;
        }, {});
        // Ordenar las entradas de groupedByMonth por fecha (monthYear)
        const sortedEntries = Object.entries(groupedByMonth).sort((a, b) => {
          const dateA = new Date(a[0].split("-")[1], a[0].split("-")[0] - 1); // Convierte 'monthYear' a Date
          const dateB = new Date(b[0].split("-")[1], b[0].split("-")[0] - 1);
          return dateA - dateB;
        });
        // Calcula acumulados para cada proyecto de manera independiente
        let accumulated = 0;
        return sortedEntries.map(([period, data]) => {
          accumulated += data.totalLabor;
          return {
            period,
            totalLabor: data.totalLabor,
            projectId,
            accumulated,
          };
        });
      })
      .flat(); // Aplanar el arreglo resultante para no tener un arreglo de arreglos

    setTotalsWithAccumulated(totalsByProject);
  }, [dataNode, selectedByProjectId]);

  //combinacion de Data para que el grafico muestre el correspondiente projectId
  useEffect(() => {
    const filteredTotalsWithAccumulated = totalsWithAccumulated.filter(
      (item) => item.projectId === selectedByProjectId
    );

    const newCombinedData = filteredTotalsWithAccumulated.map((twaItem) => {
      const monthlyCostItem = monthlyCosts.find(
        (mcItem) => mcItem.monthYear === twaItem.period
      );
      return {
        month: twaItem.period,
        projectedAccumulated: twaItem.accumulated,
        realAccumulated: monthlyCostItem ? monthlyCostItem.accumulatedReal : 0,
      };
    });

    setCombinedData(newCombinedData);
  }, [totalsWithAccumulated, monthlyCosts, selectedByProjectId]);

  // generar lsita con Ids unicos para filtrado por projectId
  const projectIds = projects.map((project) => project.projectId);

  const theme = useTheme({
    HeaderRow: `
        background-color: #eaf5fd;
      `,
    Row: `
        &:nth-of-type(odd) {
          background-color: #d2e9fb;
        }

        &:nth-of-type(even) {
          background-color: #eaf5fd;
        }
      `,
  });

  return (
    <div className=" mt-4 p-2 py-2 rounded-tr-xl flex">
      <div className="p-4">
        <div className="bg-white text-xl font-semibold rounded-xl text-center">
          <h1>Control Mano de Obra (Proyectado vs Real)</h1>
          <h1>Proyecto Pedro Torres</h1>
        </div>
        <div>
          <div>
            {/* <h1 className="text-lg bg-cyan-700 p-6 rounded-xl mr-2">
              Disponible
            </h1> */}
          </div>
          <div>
            {/* <h1 className="text-lg bg-cyan-700 p-6 rounded-xl">
              Gastado a la Fecha
            </h1> */}
          </div>
          <div>
            {/* <h1 className="text-lg bg-cyan-700 p-6 rounded-xl ml-2">
              Por Gastar
            </h1> */}
          </div>
          <div>
            {/* <h1 className="text-lg bg-cyan-700 p-6 rounded-xl ml-2">
              % Gastado
            </h1> */}
          </div>
        </div>
        <select
          className="ml-4 bg-blue-500 p-2 rounded-lg text-white mt-4 mb-2 shadow-xl"
          value={selectedByProjectId}
          onChange={(e) => setSelectedByProjectId(e.target.value)}>
          <option value="">Selecciona un Proyecto</option>
          {projectIds.map((id) => (
            <option key={id} value={id}>
              {id}
            </option>
          ))}
        </select>
        <Exceltransform UrlEndpoint="http://localhost:8000/labor/" />
        <div className="mt-4 ml-4"></div>
        <Table
          data={dataNode}
          theme={theme}
          layout={{
            custom: false,
            horizontalScroll: false,
            fixedHeader: false,
          }}>
          {() => (
            <>
              <Header>
                <HeaderRow>
                  <HeaderCell>ProjectId</HeaderCell>
                  <HeaderCell>Item</HeaderCell>
                  <HeaderCell>Periodo</HeaderCell>
                  <HeaderCell>Mensual</HeaderCell>
                  <HeaderCell>Acumulado </HeaderCell>
                  <HeaderCell>Mensual Real</HeaderCell>
                  <HeaderCell>Acumulado Real </HeaderCell>
                </HeaderRow>
              </Header>
              <Body>
                {totalsWithAccumulated
                  .filter((total) => total.projectId === selectedByProjectId)
                  .map((total, y) => {
                    const monthlyCost = monthlyCosts.find(
                      (cost) => cost.monthYear === total.period
                    );

                    return (
                      <Row key={y}>
                        <Cell className="text-xl">{total.projectId}</Cell>
                        <Cell className="text-xl">{y + 1}</Cell>
                        <Cell>{total.period}</Cell>
                        <Cell>{formatCurrency(total.totalLabor)}</Cell>
                        <Cell>{formatCurrency(total.accumulated)}</Cell>
                        <Cell>
                          {monthlyCost
                            ? formatCurrency(monthlyCost.realCost)
                            : "No disponible"}
                        </Cell>
                        <Cell>
                          {monthlyCost
                            ? formatCurrency(monthlyCost.accumulatedReal)
                            : "No disponible"}
                        </Cell>
                      </Row>
                    );
                  })}
              </Body>
            </>
          )}
        </Table>
      </div>
      <div className="mt-4 ml-4 bg-white">
        <LineChart
          width={800}
          height={500}
          data={combinedData}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line
            type="monotone"
            dataKey="projectedAccumulated"
            stroke="#8884d8"
          />
          <Line type="monotone" dataKey="realAccumulated" stroke="#82ca9d" />
        </LineChart>
      </div>
    </div>
  );
};

export default MonthCostaLaborTable;
