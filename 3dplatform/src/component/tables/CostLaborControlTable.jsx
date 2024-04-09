import axios from "axios";
import { useEffect, useContext } from "react";
import { ViewerContext } from "../Context";

const CostLaborControlTable = () => {
  
  const { setDataNode } = useContext(ViewerContext);
 

  useEffect(() => {
    const fetchLabor = async () => {
      try {
        const response = await axios.get("http://localhost:8000/labor/");
        if (
          Array.isArray(response.data.data) &&
          response.data.data.length > 0
        ) {
          setDataNode({ nodes: response.data.data });
        } else {
          console.error("No se encontraron datos", response);
        }
      } catch (error) {
        console.error("Error al obtener los datos del backend", error);
      }
    };

    fetchLabor();
  }, []);

 

  return <div></div>;
};

export default CostLaborControlTable;
