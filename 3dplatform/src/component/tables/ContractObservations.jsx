import { useState, useEffect, useContext } from "react";
import { ViewerContext } from "../Context";
import axios from "axios";
import { useTheme } from "@table-library/react-table-library/theme";
import { v4 as uuidv4 } from "uuid";
import FormContractObservation from "../sheetcontrol/FormContractObservation";

import {
  Table,
  Header,
  HeaderRow,
  Body,
  Row,
  HeaderCell,
  Cell,
} from "@table-library/react-table-library/table";

const ContractObservations = () => {
  const {
    selectedSubfamily,
    data,
    setData,
    formatCurrency,
    selectedProjectId,
    setIsModalOpenBudget,
  } = useContext(ViewerContext);
  
  const [editingRow, setEditingRow] = useState(null);

  const openModal = () => setIsModalOpenBudget(true);

  const handleUpdate = (value, id, property) => {
    setData((state) => ({
      ...state,
      nodes: state.nodes.map((node) => {
        if (node.id === id) {
          return { ...node, [property]: value };
        } else {
          return node;
        }
      }),
    }));
  };

  const subfamilyToFamilyMapping = {
    Moldaje: "Material",
    Aridos_cemento_Morteros_Afinado_andamios: "Material",
    Cerrajeria: "Material",
    Desbaste_yeso_Cornizas: "Material",
    Fierro: "Material",
    Hormigones: "Material",
    Impermeabilizacion: "Material",
    Inst_faena: "Material",
    Inst_Sanitarias: "Material",
    Instalaciones_Electricas: "Material",
    Madera_Fijaciones_varios: "Material",
    Movimiento_Tierra: "Material",
    Muebles: "Material",
    Otros: "Material",
    Papel_mural_revestimiento: "Material",
    Pavimentos_Ceramicas: "Material",
    Pintura: "Material",
    puertas_cerraduras: "Material",
    Tabiqueria: "Material",
    Ventanas: "Material",
    Techumbre: "Material",
    Terminaciones: "Material",
    Arriendo_Andamios: "Arriendos",
    Arriendo_Moldaje: "Arriendo",
    Subcontrato_Instalacion_Moldaje: "Subcontrato",
  };

  // agrega nuevas filas con un unico ID random
  const handleAddRow = () => {
    const family = subfamilyToFamilyMapping[selectedSubfamily] || ""; // Usa un valor por defecto si no hay coincidencia

    const newRow = {
      id: uuidv4(), // esta id es para agregar filas es unica
      family: family,
      subfamily: selectedSubfamily,
    };

    setData((prevData) => ({
      ...prevData,
      nodes: [...prevData.nodes, newRow],
    }));
  };

  const handleSubmitContractObservation = async () => {
    await axios.post(
      "http://localhost:8000/contract/",

      data.nodes
    );
  };

  useEffect(() => {
    const fetchContract = async () => {
      try {
        const response = await axios.get("http://localhost:8000/contract/");
        if (
          Array.isArray(response.data.data) &&
          response.data.data.length > 0
        ) {
          const filteredData = response.data.data.filter(
            (item) =>
              (!selectedProjectId || item.projectId === selectedProjectId) &&
              (!selectedSubfamily === "" ||
                item.subfamily === selectedSubfamily)
          );
          setData({ nodes: filteredData });
        } else {
          console.error("No se encontraron datos", response);
        }
      } catch (error) {
        console.error("Error al obtener los datos del backend", error);
      }
    };

    fetchContract();
  }, [selectedSubfamily, selectedProjectId, setData]);

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
    <div className="bg-white mt-3 ml-3 p-3 rounded-xl">
      <FormContractObservation />
      <div className="flex">
        <button
          onClick={openModal}
          className="flex  bg-blue-500 mt-2 ml-2 p-2 text-white rounded-lg text-sm gap-2 ">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            dataslot="icon"
            className="w-4 h-4">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 4.5v15m7.5-7.5h-15"
            />
          </svg>{" "}
          Nuevo Registro
        </button>
        <h1 className="text-xl font-semibold ">OBSERVACIONES AL CONTRATO</h1>
        <div className="mt-3 ml-4  grid grid-cols-2 "></div>
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
        <button
          onClick={handleSubmitContractObservation}
          className="flex ml-4 gap-2">
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
      <Table data={data} theme={theme}>
        {(tableList) => (
          <>
            <Header>
              <HeaderRow>
                <HeaderCell>ProjectId</HeaderCell>
                <HeaderCell>family</HeaderCell>
                <HeaderCell>subfamily</HeaderCell>
                <HeaderCell>Glosa</HeaderCell>
                <HeaderCell>Descripcion</HeaderCell>
                <HeaderCell>Proyectado</HeaderCell>
              </HeaderRow>
            </Header>

            <Body>
              {tableList.map((unic) => (
                <Row key={unic._id} item={unic}>
                  <Cell>
                    <input
                      type="text"
                      style={{
                        width: "100%",
                        border: "none",
                        fontSize: "1rem",
                        padding: 0,
                        margin: 0,
                      }}
                      value={unic.projectId}
                      onChange={(event) =>
                        handleUpdate(event.target.value, unic.id, "projectId")
                      }
                    />
                  </Cell>
                  <Cell>
                    <input
                      type="text"
                      style={{
                        width: "100%",
                        border: "none",
                        fontSize: "1rem",
                        padding: 0,
                        margin: 0,
                      }}
                      value={unic.family}
                      onChange={(event) =>
                        handleUpdate(event.target.value, unic.id, "family")
                      }
                    />
                  </Cell>
                  <Cell>
                    <input
                      type="text"
                      style={{
                        width: "100%",
                        border: "none",
                        fontSize: "1rem",
                        padding: 0,
                        margin: 0,
                      }}
                      value={unic.subfamily}
                      onChange={(event) =>
                        handleUpdate(event.target.value, unic.id, "subfamily")
                      }
                    />
                  </Cell>
                  <Cell>
                    <input
                      type="text"
                      style={{
                        width: "100%",
                        border: "none",
                        fontSize: "1rem",
                        padding: 0,
                        margin: 0,
                      }}
                      value={unic.Glosa}
                      onChange={(event) =>
                        handleUpdate(event.target.value, unic.id, "Glosa")
                      }
                    />
                  </Cell>
                  <Cell>
                    <input
                      type="text"
                      style={{
                        width: "100%",
                        border: "none",
                        fontSize: "1rem",
                        padding: 0,
                        margin: 0,
                      }}
                      value={unic.Descripcion}
                      onChange={(event) =>
                        handleUpdate(event.target.value, unic.id, "Descripcion")
                      }
                    />
                  </Cell>
                  <Cell onClick={() => setEditingRow(unic.id)}>
                    {editingRow === unic.id ? (
                      <input
                        type="number"
                        style={{
                          width: "100%",
                          border: "none",
                          fontSize: "1rem",
                          padding: 0,
                          margin: 0,
                        }}
                        value={unic.Proyectado}
                        onChange={(event) =>
                          handleUpdate(
                            event.target.value,
                            unic.id,
                            "Proyectado"
                          )
                        }
                        onBlur={() => setEditingRow(null)}
                      />
                    ) : (
                      <span>{formatCurrency(unic.Proyectado)}</span>
                    )}
                  </Cell>
                </Row>
              ))}
            </Body>
          </>
        )}
      </Table>
    </div>
  );
};

export default ContractObservations;
