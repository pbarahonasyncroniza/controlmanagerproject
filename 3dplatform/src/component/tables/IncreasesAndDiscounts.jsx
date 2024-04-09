import { useState, useEffect, useContext } from "react";
import { ViewerContext } from "../Context";
import axios from "axios";
import { useTheme } from "@table-library/react-table-library/theme";
import { v4 as uuidv4 } from "uuid";

import {
  Table,
  Header,
  HeaderRow,
  Body,
  Row,
  HeaderCell,
  Cell,
} from "@table-library/react-table-library/table";

const IncreasesAndDiscounts = () => {
  const {
    selectedSubfamily,
    dataIncreaseDiscount,
    setDataIncreaseDiscount,
    formatCurrency,
    selectedProjectId,
    setIsModalOpenBudget,
  } = useContext(ViewerContext);
  const [editingRows, setEditingRows] = useState("");
  const [editFormData, setEditFormData] = useState({});
  const [editingId, setEditingId] = useState(null);
  const openModal = () => setIsModalOpenBudget(true);

  const handleUpdate = (value, id, property) => {
    setDataIncreaseDiscount((state) => ({
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

  const handleAddRow = () => {
    const family = subfamilyToFamilyMapping[selectedSubfamily] || "";
    const newRow = {
      id: uuidv4(),
      family: family,
      subfamily: selectedSubfamily,
    };
    setDataIncreaseDiscount((prevData) => ({
      ...prevData,
      nodes: [...prevData.nodes, newRow],
    }));
  };

  const handleSubmitIncreaseDiscount = async () => {
    const senddataincreasediscount = await axios.post(
      "http://localhost:8000/increasediscount/",

      dataIncreaseDiscount.nodes
    );
    console.log(senddataincreasediscount);
  };

  // useEffect(() => {
  const fetchContract = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8000/increasediscount/"
      );
      if (Array.isArray(response.data.data) && response.data.data.length > 0) {
        const filteredData = response.data.data.filter(
          (item) =>
            (!selectedProjectId || item.projectId === selectedProjectId) &&
            (!selectedSubfamily === "" || item.subfamily === selectedSubfamily)
        );
        setDataIncreaseDiscount({ nodes: filteredData });
      } else {
        console.error("No se encontraron datos", response);
      }
    } catch (error) {
      console.error("Error al obtener los datos del backend", error);
    }
  };

  // }, [selectedSubfamily]);

  useEffect(() => {
    fetchContract();
  }, [selectedSubfamily, selectedProjectId]);

  const handleDelete = async (increasediscountid) => {
    const isConfirmed = window.confirm("¿Está seguro de que desea borrar?");
    if (!isConfirmed) {
      return;
    }
    try {
      await axios.delete(
        `http://localhost:8000/increasediscount/${increasediscountid}`
      );
      console.log("Elemento eliminado:", increasediscountid);
      // Actualiza el estado para reflejar la eliminación
      setDataIncreaseDiscount((prevState) => {
        return {
          ...prevState,
          nodes: prevState.nodes.filter(
            (node) => node._id !== increasediscountid
          ),
        };
      });
    } catch (error) {
      console.error("Error al eliminar:", error);
    }
  };

  const handleSaveClick = async (editingId) => {
    try {
      const response = await axios.patch(
        `http://localhost:8000/increasediscount/${editingId}`,
        editFormData
      );
      console.log("Update response:", response.data);
      // Actualiza el estado global o realiza otra llamada fetch para obtener los datos actualizados
      // Esto es solo un ejemplo, ajusta según la estructura de tus datos
      setDataIncreaseDiscount((prev) => ({
        ...prev,
        nodes: prev.nodes.map((node) =>
          node._id === editingId ? { ...node, ...editFormData } : node
        ),
      }));
      setEditingId(null); // Salir del modo de edición
    } catch (error) {
      console.error("Error updating data:", error);
    }
  };

  // formato de tabla
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
    <div className="bg-white p-3 ml-3 mt-3 rounded-xl">
      <h1 className="text-xl font-semibold ">AUMENTOS Y DESCUENTOS</h1>
      <div className="flex ">
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
      </div>
    
      <div className="flex rounded-xl shadow-xl mr-2">
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
          onClick={handleSubmitIncreaseDiscount}
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

      <Table data={dataIncreaseDiscount} theme={theme}>
        {(tableList) => (
          <>
            <Header>
              <HeaderRow>
                <HeaderCell>ProjectId</HeaderCell>
                <HeaderCell>family</HeaderCell>
                <HeaderCell>subfamily</HeaderCell>
                <HeaderCell>Detalle</HeaderCell>
                <HeaderCell>Aumentodisminuciones</HeaderCell>
                <HeaderCell>Real</HeaderCell>
                <HeaderCell>Recuperable</HeaderCell>
                <HeaderCell>Observaciones</HeaderCell>
                <HeaderCell>Borrar</HeaderCell>
                <HeaderCell>Editar</HeaderCell>
              </HeaderRow>
            </Header>

            <Body>
              {tableList.map((mapa) => (
                <Row key={mapa._id} item={mapa}>
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
                      value={mapa.projectId}
                      onChange={(event) =>
                        handleUpdate(event.target.value, mapa.id, "projectId")
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
                      value={mapa.family}
                      onChange={(event) =>
                        handleUpdate(event.target.value, mapa.id, "family")
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
                      value={mapa.subfamily}
                      onChange={(event) =>
                        handleUpdate(event.target.value, mapa.id, "subfamily")
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
                      value={mapa.Detalle}
                      onChange={(event) =>
                        handleUpdate(event.target.value, mapa.id, "Detalle")
                      }
                    />
                  </Cell>

                  <Cell>
                    <select
                      style={{
                        width: "100%",
                        border: "none",
                        fontSize: "1rem",
                        padding: 0,
                        margin: 0,
                      }}
                      value={mapa.Aumentodisminuciones}
                      onChange={(event) =>
                        handleUpdate(
                          event.target.value,
                          mapa.id,
                          "Aumentodisminuciones"
                        )
                      }>
                      <option
                        value="Seleccionar Opcion"
                        className="text-sm text-gray-400">
                        Seleccionar Opcion
                      </option>
                      <option value="Adicional">Adicional</option>
                      <option value="Disminucion">Disminucion</option>
                    </select>
                  </Cell>

                  <Cell onClick={() => setEditingRows(mapa.id)}>
                    {editingRows === mapa.id ? (
                      <input
                        type="number"
                        style={{
                          width: "100%",
                          border: "none",
                          fontSize: "1rem",
                          padding: 0,
                          margin: 0,
                        }}
                        value={mapa.Real || ""}
                        onChange={(event) =>
                          handleUpdate(event.target.value, mapa.id, "Real")
                        }
                        onBlur={() => setEditingRows(null)}
                      />
                    ) : (
                      <span>{mapa.Real ? formatCurrency(mapa.Real) : ""}</span>
                    )}
                  </Cell>

                  <Cell onClick={() => setEditingRows(mapa.id)}>
                    {editingRows === mapa.id ? (
                      <input
                        type="number"
                        style={{
                          width: "100%",
                          border: "none",
                          fontSize: "1rem",
                          padding: 0,
                          margin: 0,
                        }}
                        value={mapa.Recuperable || "0"}
                        onChange={(event) =>
                          handleUpdate(
                            event.target.value,
                            mapa.id,
                            "Recuperable"
                          )
                        }
                        onBlur={() => setEditingRows(null)}
                      />
                    ) : (
                      <span>
                        {mapa.Recuperable
                          ? formatCurrency(mapa.Recuperable)
                          : "0"}
                      </span>
                    )}
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
                      value={mapa.Observaciones}
                      onChange={(event) =>
                        handleUpdate(
                          event.target.value,
                          mapa.id,
                          "Observaciones"
                        )
                      }
                    />
                  </Cell>
                  <Cell>
                    <button
                      type="text"
                      style={{
                        width: "100%",
                        border: "none",
                        fontSize: "1rem",
                        padding: 0,
                        margin: 0,
                      }}
                      value={mapa.Borrar}
                      onClick={() => handleDelete(mapa._id || mapa.id)}>
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
                          d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                        />
                      </svg>
                    </button>
                  </Cell>
                  <Cell>
                    <button
                      type="text"
                      style={{
                        width: "100%",
                        border: "none",
                        fontSize: "1rem",
                        padding: 0,
                        margin: 0,
                      }}
                      value={mapa.Editar}
                      onClick={() => handleSaveClick(mapa._id || mapa.id)}>
                      editar
                    </button>
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

export default IncreasesAndDiscounts;
