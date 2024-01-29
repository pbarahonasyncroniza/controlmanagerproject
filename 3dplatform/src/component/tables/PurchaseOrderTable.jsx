import { useContext } from "react";
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
import { useTheme } from "@table-library/react-table-library/theme";

const PurchaseOrderTable = () => {
  const { dataNode, materialSheets } = useContext(ViewerContext);
  console.log("🚀 ~ PurchaseOrderTable ~ materialSheets:", materialSheets);
  console.log("🚀 ~ PurchaseOrderTable ~ dataNode:", dataNode);

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
  const formatCurrency = (value) => {
    return Number(value).toLocaleString("es-Cl", {
      style: "currency",
      currency: "CLP",
      minimumFractionDigits: 0,
    });
  };
  return (
    <div>
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
                {materialSheets.map((x) => (
                  <Row key={x._id} x={x}>
                    <Cell>{x.projectId}</Cell>
                    <Cell>{x.cod}</Cell>
                    <Cell>{new Date(x.date).toLocaleDateString()}</Cell>
                    <Cell>{x.description}</Cell>
                    <Cell>{x.subcontractorOffers}</Cell>
                    <Cell>{formatCurrency(x.total)}</Cell>
                    <Cell>{x.acumulado}</Cell>
                    <Cell>{x.subfamily}</Cell>
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
