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

const MonthCostaLaborTable = () => {
  const { dataNode, projects } = useContext(ViewerContext);

  const [totalsWithAccumulated, setTotalsWithAccumulated] = useState([]);

  const [monthlyCosts, setMonthlyCosts] = useState([]);

  // filtrar mano de obra y agrupar por mes
  useEffect(() => {
    const allSheets = projects.flatMap((project) => project.sheets);

    const manoobraData = allSheets.filter(
      (sheet) => sheet.family === "Mano_Obra"
    );

    manoobraData.sort((a, b) => new Date(a.date) - new Date(b.date));
    const groupedByMonth = {};

    manoobraData?.forEach((sheet) => {
      console.log("🚀 ~ manoobraData?.forEach ~ sheet:", sheet);
      const date = new Date(sheet.date);
      console.log("🚀 ~ manoobraData?.forEach ~ sheet.date:", sheet.date);
      const monthYear = `${date.getMonth() + 1}-${date.getFullYear()}`;

      if (!groupedByMonth[monthYear]) {
        groupedByMonth[monthYear] = {
          realCost: 0,
          plannedCost: 0, // Aquí debes calcular el costo planificado para el mes
        };
      }

      groupedByMonth[monthYear].realCost += sheet.total;
    });

    let acumuladoReal = 0;
    const monthlyData = Object.keys(groupedByMonth).map((monthYear) => {
      const [month, year] = monthYear.split("-");
      const formattedMonthYear = `${month.padStart(2, "0")}-${year}`;

      acumuladoReal += groupedByMonth[monthYear].realCost;

      return {
        monthYear: formattedMonthYear,
        realCost: groupedByMonth[monthYear].realCost,
        plannedCost: groupedByMonth[monthYear].plannedCost,
        accumulatedReal: acumuladoReal,
      };
    });
    console.log("🚀 ~ monthlyData ~ monthlyData:", monthlyData);

    setMonthlyCosts(monthlyData);
  }, [projects]);

  // filtra la mano de obra proyectada por mes

  useEffect(() => {
    const groupedByMonth = {};

    dataNode.nodes.forEach((item) => {
      // Verifica que deadline exista y no sea null o undefined
      if (item.deadline) {
        const date = new Date(item.deadline);
        const month = (date.getMonth() + 1).toString().padStart(2, "0"); // getMonth() es 0-indexado
        const year = date.getFullYear();
        const monthYear = `${month}-${year}`;
        const projectId = item.projectId;

        if (!groupedByMonth[monthYear]) {
          groupedByMonth[monthYear] = { items: [], projectId };
        }

        groupedByMonth[monthYear].items.push(item);
      }
    });
    const totalsByMonth = Object.keys(groupedByMonth).map((monthYear) => {
      console.log("🚀 ~ totalsByMonth ~ groupedByMonth:", groupedByMonth);

      const { items, projectId } = groupedByMonth[monthYear];

      const totalLabor = items.reduce((sum, item) => {
        const value = Number(item.total || 0);
        return sum + value;
      }, 0);

      // console.log("🚀 ~ totalsByMonth ~ totalLabor:", totalLabor);

      return {
        period: monthYear,
        totalLabor,
        projectId,
      };
    });

    totalsByMonth.sort((a, b) => {
      const [monthA, yearA] = a.period.split("-").map(Number);
      const [monthB, yearB] = b.period.split("-").map(Number);
      return new Date(yearA, monthA - 1) - new Date(yearB, monthB - 1);
    });

    // calculo de acumulados
    let acumulados = 0;
    const totalsWithAccumulated = totalsByMonth.map((item) => {
      acumulados += item.totalLabor;
      return {
        ...item,
        accumulated: acumulados,
      };
    });

    setTotalsWithAccumulated(totalsWithAccumulated);
  }, [dataNode]);
  // console.log("🚀 ~ useEffect ~ totalsWithAccumulated:", totalsWithAccumulated);

  const combinedData = [];

  // Asumiendo que 'dataNode' y 'projects' ya están procesados en tus estados como 'totalsWithAccumulated' y 'monthlyCosts' respectivamente

  totalsWithAccumulated.forEach((item) => {
    const monthlyCost = monthlyCosts.find((cost) => {
      // console.log("🚀 ~ totalsWithAccumulated.forEach ~ cost:", cost);
      return cost.monthYear === item.period;
    });

    combinedData.push({
      month: item.period,
      projectedAccumulated: item.accumulated, // o la propiedad correspondiente de 'dataNode'
      realAccumulated: monthlyCost ? monthlyCost.accumulatedReal : 0, // o un valor por defecto si no hay datos
    });
  });

  const formatCurrency = (value) => {
    return Number(value).toLocaleString("es-Cl", {
      style: "currency",
      currency: "CLP",
      minimumFractionDigits: 0,
    });
  };
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
        {/* <div className="bg-white mt-2 p-6 rounded-xl grid grid-cols-4">
          <div>
            <h1 className="text-lg bg-cyan-700 p-6 rounded-xl mr-2">Disponible</h1>
          </div>
          <div>
            <h1 className="text-lg bg-cyan-700 p-6 rounded-xl">Gastado a la Fecha</h1>
          </div>
          <div>
            <h1 className="text-lg bg-cyan-700 p-6 rounded-xl ml-2">Por Gastar</h1>
          </div>
          <div>
            <h1 className="text-lg bg-cyan-700 p-6 rounded-xl ml-2">% Gastado</h1>
          </div>
        </div> */}

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
                {totalsWithAccumulated.map((total, y) => {
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
