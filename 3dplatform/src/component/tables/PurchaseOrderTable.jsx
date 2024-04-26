import { ViewerContext } from "../Context";
import { useContext, useEffect, useState } from "react";
import {
  Table,
  Header,
  HeaderRow,
  HeaderCell,
  Row,
  Body,
  Cell,
} from "@table-library/react-table-library/table";
import { useTheme } from "@table-library/react-table-library/theme";

const PurchaseOrderTable = () => {
  const {
    dataNode,
    materialSheets,
    selectedSubfamily,
    selectedProjectId,
    selectedFamily,
    formatCurrency,
    setTotalPurchaseOrders,
  } = useContext(ViewerContext);
  const [newfilteredMaterialSheets, setNewFilteredMaterialSheets] = useState(
    []
  );
  const [newAccumulatedPurchaseOrders, setNewAccumulatedPurchaseOrders] =
    useState([]);

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

  // Filtrar materialSheets según el proyecto, familia y subfamilia seleccionados
  useEffect(() => {
    const filteredMaterialSheet = materialSheets.filter((sheet) => {
      const projectMatch =
        !selectedProjectId || sheet.projectId === selectedProjectId;
      const familyMatch = !selectedFamily || sheet.family === selectedFamily;
      const subfamilyMatch =
        !selectedSubfamily || sheet.subfamily === selectedSubfamily;
      return projectMatch && familyMatch && subfamilyMatch;
    });
    let acumulado = 0;
    const MaterialSheetAccumulated = filteredMaterialSheet.map((sheet) => {
      acumulado += parseFloat(sheet.total) || 0;
      return { ...sheet, acumulado };
    });

    setNewFilteredMaterialSheets(MaterialSheetAccumulated);
    setNewAccumulatedPurchaseOrders(acumulado);
  }, [materialSheets, selectedProjectId, selectedFamily, selectedSubfamily]);

  useEffect(() => {
    let total = 0;

    newfilteredMaterialSheets.forEach((sheet) => {
      total += parseFloat(sheet.total) || 0;
    });

    setTotalPurchaseOrders(total);
  }, [newfilteredMaterialSheets]);
  return (
    <div className="bg-white p-3 rounded-xl ml-3 flex flex-col">
      <div className="flex justify-end p-4 ">
        <h1 className="bg-cyan-700 text-3xl text-white p-6 rounded-xl ">
          {formatCurrency(newAccumulatedPurchaseOrders)}
        </h1>
      </div>
      <h1 className="text-xl font-semibold ">ORDENES DE COMPRA</h1>
      <div>
        <Table data={dataNode} theme={theme}>
          {() => (
            <>
              <Header>
                <HeaderRow>
                  <HeaderCell>ProjectId</HeaderCell>
                  <HeaderCell>OC</HeaderCell>
                  <HeaderCell>Fecha Emision </HeaderCell>
                  <HeaderCell>Descripcion </HeaderCell>
                  <HeaderCell>Proveedor</HeaderCell>
                  <HeaderCell>Monto neto</HeaderCell>
                  <HeaderCell>Acumulado </HeaderCell>
                  <HeaderCell>Hoja de Control </HeaderCell>
                </HeaderRow>
              </Header>

              <Body>
                {newfilteredMaterialSheets.map((sheet) => (
                  <Row key={sheet._id}>
                    <Cell>{sheet.projectId}</Cell>
                    <Cell>{sheet.cod}</Cell>
                    <Cell>{new Date(sheet.date).toLocaleDateString()}</Cell>
                    <Cell>{sheet.description}</Cell>
                    <Cell>{sheet.subcontractorOffers}</Cell>
                    <Cell>{formatCurrency(sheet.total)}</Cell>
                    <Cell>{formatCurrency(sheet.acumulado)}</Cell>
                    <Cell>{sheet.subfamily}</Cell>
                  </Row>
                ))}
              </Body>
            </>
          )}
        </Table>
      </div>
    </div>
  );
};

export default PurchaseOrderTable;
