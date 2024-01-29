import {
  Table,
  Header,
  HeaderRow,
  HeaderCell,
  Row,
  Body,
  Cell,
} from "@table-library/react-table-library/table";

import { useSort } from "@table-library/react-table-library/sort";

import axios from "axios";
import { useTheme } from "@table-library/react-table-library/theme";
import { useEffect, useState, useContext } from "react";
import { ViewerContext } from "../Context";
import Exceltransform from "../Exceltransform";
import MonthCostaLaborTable from "./MonthCostaLaborTable";

const CostLaborControlTable = () => {
  // const nodes = { nodes };
  // console.log(nodes);

  const { dataNode, setDataNode } = useContext(ViewerContext);
  console.log("🚀 ~ CostLaborControlTable ~ dataNode:", dataNode);

  const [search, setSearch] = useState("");
 

  const handleSubmitLaborCost = async () => {
    const senddatalabor = await axios.post(
      "http://localhost:8000/labor/",

      dataNode.nodes
    );
    console.log(senddatalabor);
  };

  useEffect(() => {
    const fetchLabor = async () => {
      try {
        const response = await axios.get("http://localhost:8000/labor/");
        if (
          Array.isArray(response.data.data) &&
          response.data.data.length > 0
        ) {
          setDataNode({ nodes: response.data.data });
          // console.log("🚀 ~ fetchLabor ~ response.data.data:", response.data.data)
        } else {
          console.error("No se encontraron datos", response);
        }
      } catch (error) {
        console.error("Error al obtener los datos del backend", error);
      }
    };

    fetchLabor();
  }, []);

  const filteredData = {
    nodes:
      dataNode.nodes?.filter((item) =>
        item?.name?.toLowerCase().includes(search.toLowerCase())
      ) || [],
  };
  // console.log("🚀 ~ CostLaborControlTable ~ dataNode:", dataNode);

  // console.log("filteredData", filteredData);

  //   const resize = { resizerHighlight: "#dde2eb", resizerWidth: 10 };
  //   const resize = { maxWidth: "10px" };
  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  const handleUpdate = (value, id, property) => {
    setDataNode((state) => {
      // console.log(state);
      if (!Array.isArray(state.nodes)) {
        console.error("state.nodes no es un arreglo", state.nodes);
        return state;
      }

      return {
        ...state,
        nodes: state.nodes.map((node) => {
          console.log("🚀 ~ nodes:state.nodes.map ~ node:", node);
          if (node.id === id) {
            return { ...node, [property]: value };
          }
          return node;
        }),
      };
    });
  };

  const handleAddRow = () => {
    const newRow = {
      projectId: "",
      id: "",
      name: "",
      MonthsProj: "",
      Monthscost: "",
      compensation: "",
      deadline: new Date(),
      total: "",
    };
    setDataNode((prevData) => ({
      ...prevData,
      nodes: [...prevData.nodes, newRow],
    }));
  };
  // cambia formato de fecha a dd/mm/yy
  const formatDateToDDMMYY = (isoDate) => {
    const date = new Date(isoDate);
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0"); // getMonth() devuelve un índice basado en cero
    const year = date.getFullYear().toString().substr(2);
    return `${day}/${month}/${year}`;
  };

  const sort = useSort(
    filteredData,
    {
      onChange: onSortChange,
    },
    {
      sortIcon: {
        iconDefault: null,
        iconUp: null,
        iconDown: null,
      },
      sortFns: {
        id: (array) => array.sort((a, b) => a.name.localeCompare(b.name)),
        // DEADLINE: (array) => array.sort((a, b) => a.deadline - b.deadline),
        // TYPE: (array) => array.sort((a, b) => a.type.localeCompare(b.type)),
        // COMPLETE: (array) => array.sort((a, b) => a.isComplete - b.isComplete),
        // TASKS: (array) =>
        //   array.sort((a, b) => (a.nodes || []).length - (b.nodes || []).length),
      },
    }
  );

  function onSortChange(action, state) {
    console.log(action, state);
  }

  const theme = useTheme({
    HeaderRow: `
            background-color: #eaf5fd;
            .th {
                border-bottom: 1px solid #a0a8ae;
              }
          `,

    Row: `
            &:nth-of-type(odd) {
              background-color: #d2e9fb;
            }
    
            &:nth-of-type(even) {
              background-color: #eaf5fd;
            }
          `,
    Table: `
        //   --data-table-library_grid-template-columns:  25% 25% 25% 25% minmax(50px, 1fr);
      `,
    BaseCell: `
      &:nth-of-type(1) {
        left: 0px;border-right: 1px solid #a0a8ae;
      }

      &:nth-of-type(5) {
        right: 0px;
      }
    `,
    HeaderCell: `
    padding-right: 0px;
    width:10px

    & > div {
    // display: flex;
    //   justify-content: space-between;
    }
  `,
  });

  return (
    <div>
      {/* <div className="mt-4 ml-4  " style={{ height: "300px", width: "1200px" }}>
        <label htmlFor="search">
          Search by Rol:&nbsp;
          <input
            className="bg-blue-500 rounded-lg mb-4 p-2"
            placeholder="Search by Rol"
            id="search"
            type="text"
            value={search}
            onChange={handleSearch}
          />
        </label>
        <br />
        <div className="flex">
          <button className="flex mb-2 gap-2" onClick={handleAddRow}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
              />
            </svg>
            Agregar Fila
          </button>
          <button onClick={handleSubmitLaborCost} className="flex ml-4 gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 16.5V9.75m0 0 3 3m-3-3-3 3M6.75 19.5a4.5 4.5 0 0 1-1.41-8.775 5.25 5.25 0 0 1 10.233-2.33 3 3 0 0 1 3.758 3.848A3.752 3.752 0 0 1 18 19.5H6.75Z"
              />
            </svg>
            Save
          </button>
        </div>
        <Exceltransform UrlEndpoint="http://localhost:8000/labor/" />
        <div className="max-h-[300px] overflow-y-auto border-b-4">
          <Table
            data={filteredData}
            theme={theme}
            sort={sort}
            layout={{
              custom: false,
              horizontalScroll: false,
              fixedHeader: false,
            }}>
            {(tableList) => (
              <>
                <Header>
                  <HeaderRow>
                    <HeaderCell>ProjectId</HeaderCell>
                    <HeaderCell sortkey="id">Id</HeaderCell>
                    <HeaderCell>Rol</HeaderCell>
                    <HeaderCell>Mes</HeaderCell>
                    <HeaderCell>M/Proy</HeaderCell>
                    <HeaderCell>Costo Mes</HeaderCell>
                    <HeaderCell>Finiquito</HeaderCell>
                    <HeaderCell>Total</HeaderCell>
                  </HeaderRow>
                </Header>

                <Body>
                  {tableList.map((item) => (
                    <Row key={item.id} item={item}>
                      <Cell>
                        <input
                          type="text"
                          style={{
                            width: "90%",
                            border: "none",
                            fontSize: "1rem",
                            padding: 0,
                            margin: 0,
                          }}
                          value={item.projectId}
                          onChange={(event) =>
                            handleUpdate(
                              event.target.value,
                              item.id,
                              "projectId"
                            )
                          }
                        />
                      </Cell>
                      <Cell>
                        <input
                          type="text"
                          style={{
                            width: "90%",
                            border: "none",
                            fontSize: "1rem",
                            padding: 0,
                            margin: 0,
                          }}
                          value={item.id}
                          onChange={(event) =>
                            handleUpdate(event.target.value, item.id, "id")
                          }
                        />
                      </Cell>

                      <Cell>{item.name}</Cell>
                      <Cell>{formatDateToDDMMYY(item.deadline)}</Cell>

                      <Cell>
                        <input
                          type="number"
                          style={{
                            width: "90%",
                            border: "none",
                            fontSize: "1rem",
                            padding: 0,
                            margin: 0,
                          }}
                          value={item.MonthsProj}
                          onChange={(event) =>
                            handleUpdate(
                              event.target.value,
                              item.id,
                              "MonthsProj"
                            )
                          }
                        />
                      </Cell>

                      <Cell>
                        <input
                          type="number"
                          style={{
                            width: "90%",
                            border: "none",
                            fontSize: "1rem",
                            padding: 0,
                            margin: 0,
                          }}
                          value={item.Monthscost}
                          onChange={(event) =>
                            handleUpdate(
                              event.target.value,
                              item.id,
                              "Monthscost"
                            )
                          }
                        />
                      </Cell>

                      <Cell>
                        <input
                          type="number"
                          style={{
                            width: "90%",
                            border: "none",
                            fontSize: "1rem",
                            padding: 0,
                            margin: 0,
                          }}
                          value={item.compensation}
                          onChange={(event) =>
                            handleUpdate(
                              event.target.value,
                              item.id,
                              "compensation"
                            )
                          }
                        />
                      </Cell>

                      <Cell>
                        <input
                          type="number"
                          style={{
                            width: "90%",
                            border: "none",
                            fontSize: "1rem",
                            padding: 0,
                            margin: 0,
                          }}
                          value={item.total}
                          onChange={(event) =>
                            handleUpdate(event.target.value, item.id, "total")
                          }
                        />
                      </Cell>
                    </Row>
                  ))}
                </Body>
              </>
            )}
          </Table>
        </div>
      </div> */}
    </div>
  );
};

export default CostLaborControlTable;
