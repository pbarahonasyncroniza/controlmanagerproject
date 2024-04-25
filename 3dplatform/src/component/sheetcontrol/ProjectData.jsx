import { useEffect, useContext, useState } from "react";
import axios from "axios";
import { ViewerContext } from "../Context";
import Exceltransform from "../Exceltransform";
import Sidebardb from "../dashboard/Sidebardb";
import FormBudget from "./FormBudget";

const ProjectData = () => {
  const {
    setProjects,
    setSelectedProject,
    filterType,
    setFilterType,
    isModalOpenBudget,
    setIsModalOpenBudget,
    setIsEditMode,
    openEditForm,
    formatCurrency,
    projects,
    formatedDate,
  } = useContext(ViewerContext);

  const [allSheets, setAllSheets] = useState([]);
  const openModal = () => {
    setIsModalOpenBudget(true);
    setIsEditMode(false);
  };

  const comparateDates = (date1, date2) => {
    return new Date(date1) - new Date(date2);
  };

  useEffect(() => {
    // Función para obtener proyectos junto con las sheets .. sheets viene anodado en projects
    const fetchProjects = async () => {
      try {
        const response = await axios.get("http://localhost:8000/project/");

        if (
          Array.isArray(response.data.data) &&
          response.data.data.length > 0
        ) {
          setProjects(response.data.data); // Actualiza el estado de proyectos
        } else {
          console.error("Empty array of projects", response);
        }
      } catch (error) {
        console.error("Error fetching projects", error);
      }
    };

    fetchProjects();
  }, [setProjects, isModalOpenBudget]);

  const handleDeleteOC = async (sheetid) => {
    console.log("🚀 ~ handleDeleteOC ~ sheetid:", sheetid);
    const isConfirmed = window.confirm("¿Está seguro de que quiere borrar?");

    if (!isConfirmed) {
      return;
    }
    try {
      const response = await axios.delete(
        `http://localhost:8000/sheet/${sheetid}`
      );
      if (response.status === 200) {
        setSelectedProject((prevSelectedProject) => {
          const updatedProject = { ...prevSelectedProject };

          // Filtrar el array sheets para remover el elemento eliminado
          updatedProject.sheets = updatedProject?.sheets?.filter(
            (sheet) => sheet._id !== sheetid
          );

          return updatedProject;
        });
      }
    } catch (err) {
      console.error("Error deleting task:", err);
    }
  };

  // Encuentra el proyecto seleccionado basado en el ID
  // useEffect(() => {
  //   const project = projects.find((p) => p.projectId === selectedProjectId);
  //   setSelectedProject(project); // Actualiza el estado del proyecto seleccionado
  // }, [setSelectedProject, projects]);

  // filtro de Actual Cost
  // const filteredSheets =
  //   selectedProject?.sheets?.filter((sheet) =>
  //     filterType
  //       ? sheet.family.toLowerCase().includes(filterType.toLowerCase())
  //       : true
  //   ) || [];

  useEffect(() => {
    // Crear un nuevo arreglo para almacenar todas las sheets de todos los proyectos
    let allSheets = [];
    projects.forEach((project) => {
      // Concatenar las sheets de cada proyecto al arreglo allSheets
      allSheets = allSheets.concat(project.sheets);
    });
    allSheets.sort((a, b) => comparateDates(a.date, b.date));
    // Aquí suponemos que tienes un estado para almacenar todas las sheets recopiladas
    setAllSheets(allSheets); // Asegúrate de tener un estado llamado allSheets definido para esto
  }, [projects]); // Este efecto se ejecutará cada vez que el arreglo de proyectos cambie

  return (
    <div className=" ml-2 mr-6 mt-4 shadow-xl rounded-xl flex ">
      <Sidebardb />
      <FormBudget />
      <div className="bg-white rounded-xl ml-4 mt-5 mb-6">
        <h1 className="text-xl ml-8 font-semibold mt-4 text-center ">
          MAESTRO DE COMPRAS
        </h1>
        <div className="flex grow">
          <div className="ml-10 mt-4 text-lg bg-blue-500 text-white p-1  w-50 rounded-lg ">
            <div>
              <label className="text-xs p-1" htmlFor="filterType">
                Filter Type
                <input
                  placeholder=" Filter by Family"
                  id="filterType"
                  type="text"
                  value={filterType}
                  onChange={(e) => setFilterType(e.target.value)}></input>
              </label>
            </div>
          </div>
          <div className="">
            <button
              onClick={openModal}
              className="flex  bg-blue-500 mt-4 ml-4 p-2 text-white rounded-lg text-sm gap-2 ">
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
        <div className=" overflow-y-auto mb-4 ">
          <Exceltransform UrlEndpoint="http://localhost:8000/sheet/" />
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
              {allSheets.map((item, z) => (
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
