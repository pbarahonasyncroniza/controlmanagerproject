import { useState } from "react";
import axios from "axios";

const Exceltransform = ({ UrlEndpoint }) => {
  const [excelFile, setExcelFile] = useState(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    console.log("Selectedexce", file);
    setExcelFile(file);
  };

  const handleUpload = async () => {
    try {
      if (excelFile) {
        const formData = new FormData();
        formData.append("excelfile", excelFile);
        formData.append("formattedDate", new Date());

        const response = await axios.post(UrlEndpoint, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        console.log("responseExcel", response.data);
      }
    } catch (error) {
      console.error("Error al enviar la solicitud:", error);
    }
  };
  return (
    <div>
      <div className=" bg-white p-2 rounded-xl">
        <h2 className="text-xs mt-2 gap-2 ml-2">Cargar Datos Excel</h2>
        <input
          className="mt-2 ml-2 text-xs bg-gray-300 mr-2 rounded-lg px-1
           "
          type="file"
          accept=".xlsx"
          onChange={handleFileChange}
        />
        <button
          type="button"
          className=" text-sm mt-2 bg-blue-500 p-1 rounded-lg text-white"
          onClick={handleUpload}
        >
          Subir Excel
        </button>
      </div>
    </div>
  );
};

export default Exceltransform;
