import { useEffect, useContext } from "react";
import axios from "axios";
import { ViewerContext } from "../Context";
import Exceltransform from "../Exceltransform";

const ProjectData = () => {
  const {
    projects,
    setProjectId,
    setProjects,
    selectedProject,
    setSelectedProject: updateSelectedProject,
    selectedProjectId,
    filterType,
    setFilterType,
    isModalOpenBudget,
    setIsModalOpenBudget,
    setDate,
    setCurrentSheetId,
    updateisModalOpenBudget,
    setIsEditMode,
  } = useContext(ViewerContext);
  console.log("🚀 ~ ProjectData ~ selectedProject:", selectedProject);

  const openModal = () => setIsModalOpenBudget(true);

  useEffect(() => {
    // Función para obtener proyectos junto con las sheets
    const fetchProjects = async () => {
      try {
        const response = await axios.get("http://localhost:8000/project/");
        console.log("🚀 ~ fetchProjects ~ response:", response);

        if (
          Array.isArray(response.data.data) &&
          response.data.data.length > 0
        ) {
          setProjects(response.data.data); // Actualiza el estado de proyectos
        } else {
          console.error("Empty array of projects", response);
        }
        console.log(
          "🚀 ~ fetchProjects ~ response.data.data:",
          response.data.data
        );
      } catch (error) {
        console.error("Error fetching projects", error);
      }
    };

    fetchProjects();
  }, [setProjects, isModalOpenBudget]);

  const handleDeleteOC = async (sheetid) => {
    try {
      const response = await axios.delete(
        `http://localhost:8000/sheet/${sheetid}`
      );
      if (response.status === 200) {
        updateSelectedProject((prevSelectedProject) => {
          // Crear una copia del objeto selectedProject
          const updatedProject = { ...prevSelectedProject };

          // Filtrar el array sheets para remover el elemento eliminado
          updatedProject.sheets = updatedProject.sheets.filter(
            (sheet) => sheet._id !== sheetid
          );
          // Devolver el proyecto actualizado
          return updatedProject;
        });
      }
    } catch (err) {
      console.error("Error deleting task:", err);
    }
  };

  useEffect(() => {
    // Encuentra el proyecto seleccionado basado en el ID
    const project = projects.find((p) => p.projectId === selectedProjectId);
    updateSelectedProject(project); // Actualiza el estado del proyecto seleccionado
    // console.log("Selected Project:", project);
  }, [selectedProjectId, projects]);

  // filtro de Actual Cost
  const filteredSheets =
    selectedProject?.sheets?.filter((sheet) =>
      filterType
        ? sheet.family.toLowerCase().includes(filterType.toLowerCase())
        : true
    ) || [];

  // Formato de moneda
  const formatCurrency = (value) => {
    return Number(value).toLocaleString("es-Cl", {
      style: "currency",
      currency: "CLP",
      minimumFractionDigits: 0,
    });
  };

  // formato de fecha
  const formatedDate = (isoDate) => {
    if (!isoDate) return "Fecha no disponible";

    // Crear la fecha en base al isoDate
    const date = new Date(isoDate);

    // Usar getUTC* en lugar de get* para obtener la fecha en UTC
    const day = date.getUTCDate();
    const month = date.getUTCMonth() + 1; // getUTCMonth() devuelve un índice basado en cero (0-11)
    const year = date.getUTCFullYear();

    // Formatea el día y el mes para asegurar que tengan dos dígitos
    const formattedDay = String(day).padStart(2, "0");
    const formattedMonth = String(month).padStart(2, "0");

    // Retorna la fecha formateada como "día/mes/año"
    return `${formattedDay}/${formattedMonth}/${year}`;
  };
  const openEditForm = (sheet) => {
    // Cargar los datos del registro en los campos del formulario
    setProjectId(sheet.projectId);
    setDate(sheet.date);
    // ... y así con el resto de los campos
    setIsEditMode(true);
    setCurrentSheetId(sheet._id);
    updateisModalOpenBudget(true);
  };

  return (
    <div className="bg-white ml-2 mr-6   shadow-xl  rounded-xl overflow-y-auto">
      <div className="">
        <div className="bg-gray-300 "></div>
        <h1 className="text-xl ml-2 font-semibold">
          MAESTRO DE COMPRAS
          <Exceltransform UrlEndpoint="http://localhost:8000/sheet/" />
        </h1>
        <div className="flex grow">
          <div className="ml-2 text-lg bg-blue-500 text-white p-1 mt-2 w-50 rounded-lg ">
            <div>
              <label className="text-xs p-1" htmlFor="filterType">
                Filter Type
              </label>
              <input
                placeholder=" Filter by Family"
                className=""
                type="text"
                value={filterType}
                name="filter"
                onChange={(e) => setFilterType(e.target.value)}></input>
            </div>
          </div>
          <div className="">
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
              </svg>
              Create new register
            </button>
          </div>
        </div>
        <div className="max-h-[600px] overflow-y-auto mb-6 b-4">
          <table className="table-auto mt-4 border-collapse border border-slate-500 ml-2 mr-2  ">
            <thead className="sticky top-0 bg-cyan-700 text-white -z-3">
              <tr className="border border-slate-500 px-4 text-xl ">
                <th className="border border-slate-500 px-4 text-base  ">
                  ProjectId
                </th>
                <th className="border border-slate-500 px-4 text-base  ">
                  Fecha
                </th>
                <th className="border border-slate-500 px-4 text-base  ">
                  Familia
                </th>
                <th className="border border-slate-500 px-4  text-base ">OC</th>
                <th className="border border-slate-500 px-4  text-base">
                  {" "}
                  Description
                </th>
                <th className="border border-slate-500 px-4 text-base  ">
                  Qty
                </th>
                <th className="border border-slate-500 px-4  text-base ">
                  Unit
                </th>
                <th className="border border-slate-500 px-4  text-base ">
                  Precio Unitario
                </th>

                <th className="border border-slate-500 px-4  text-base ">
                  Subcontrato/Proveedor
                </th>
                <th className="border border-slate-500 px-4  text-base ">
                  Total
                </th>
                <th className="border border-slate-500 px-4  text-base ">
                  Hoja Control
                </th>
                <th className="border border-slate-500 px-4  text-base ">
                  Borrar
                </th>
                <th className="border border-slate-500 px-4  text-base ">
                  Editar
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredSheets.map((item, z) => (
                <tr key={z}>
                  <td className="border border-slate-500 px-4 text-base ">
                    {item.projectId}
                  </td>
                  <td className="border border-slate-500 px-4 text-base ">
                    {formatedDate(item.date)}
                  </td>
                  <td className="border border-slate-500 px-4 text-base ">
                    {item.family}
                  </td>
                  <td className="border border-slate-500 px-4 text-base ">
                    {item.cod}
                  </td>
                  <td className="border border-slate-500 px-4 text-base ">
                    {item.description}
                  </td>
                  <td className="border border-slate-500 px-4 text-base ">
                    {item.qty}
                  </td>
                  <td className="border border-slate-500 px-4 text-base ">
                    {item.unit}
                  </td>
                  <td className="border border-slate-500 px-4 text-base ">
                    {formatCurrency(item.unitPrice)}
                  </td>
                  <td className="border border-slate-500 px-4 text-base ">
                    {item.subcontractorOffers}
                  </td>
                  <td className="border border-slate-500 px-4 text-base ">
                    {formatCurrency(item.total)}
                  </td>
                  <td className="border border-slate-500 px-4 text-base ">
                    {item.subfamily}
                  </td>

                  <td className="flex justify-center">
                    <button
                      className=" bg-red-500   p-1 text-white rounded-lg text-sm "
                      onClick={() => handleDeleteOC(item._id || item.id)}>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-5 h-5 ">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                        />
                      </svg>
                    </button>
                  </td>
                  <td className="">
                    <button
                      onClick={() => openEditForm(item)}
                      className=" flex justify-center bg-green-500  p-1 text-white rounded-lg text-sm  ">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-5 h-5">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125"
                        />
                      </svg>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ProjectData;
