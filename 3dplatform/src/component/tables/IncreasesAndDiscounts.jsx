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
  const { selectedSubfamily, dataIncreaseDiscount, setDataIncreaseDiscount } =
    useContext(ViewerContext);
  const [editingRows, setEditingRows] = useState("");

  //   const theme = useTheme(getTheme());

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

  useEffect(() => {
    const fetchContract = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8000/increasediscount/"
        );
        if (
          Array.isArray(response.data.data) &&
          response.data.data.length > 0
        ) {
          const filteredData = response.data.data.filter(
            (item) =>
              selectedSubfamily === "" || item.subfamily === selectedSubfamily
          );
          setDataIncreaseDiscount({ nodes: filteredData });
         
        } else {
          console.error("No se encontraron datos", response);
        }
      } catch (error) {
        console.error("Error al obtener los datos del backend", error);
      }
    };

    fetchContract();
  }, [selectedSubfamily]);

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

  const getTotalReal = () => {
    return dataIncreaseDiscount.nodes.reduce((total, node) => {
      return total + (Number(node.Real) || 0);
    }, 0);
  };
  const getTotalRecuperable = () => {
    return dataIncreaseDiscount.nodes.reduce((total, node) => {
      return total + (Number(node.Recuperable) || 0);
    }, 0);
  };

  return (
    <div>
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
                <HeaderCell>family</HeaderCell>
                <HeaderCell>subfamily</HeaderCell>
                <HeaderCell>Detalle</HeaderCell>
                <HeaderCell>Aumentodisminuciones</HeaderCell>
                <HeaderCell>Real</HeaderCell>
                <HeaderCell>Recuperable</HeaderCell>
                <HeaderCell>Observaciones</HeaderCell>
              </HeaderRow>
            </Header>

            <Body>
              {tableList.map((mapa) => (
                <Row key={mapa.id} item={mapa}>
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
                        value={mapa.Real}
                        onChange={(event) =>
                          handleUpdate(event.target.value, mapa.id, "Real")
                        }
                        onBlur={() => setEditingRows(null)}
                      />
                    ) : (
                      <span>{formatCurrency(mapa.Real)}</span>
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
                        value={mapa.Recuperable}
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
                      <span>{formatCurrency(mapa.Recuperable)}</span>
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
                </Row>
              ))}
            </Body>
          </>
        )}
      </Table>
      <div className="flex justify-end mr-48 mt-4">
        <h1 className="text-xl font-semibold text-right mr-20">
          {formatCurrency(getTotalReal())}
        </h1>
        <h1 className="text-xl font-semibold text-right mr-20">
          {formatCurrency(getTotalRecuperable())}
        </h1>
      </div>
    </div>
  );
};

export default IncreasesAndDiscounts;
