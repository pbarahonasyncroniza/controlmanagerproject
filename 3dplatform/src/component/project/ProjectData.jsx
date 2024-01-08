import { useEffect, useContext } from "react";
import axios from "axios";
import { ViewerContext } from "../Context";

const ProjectData = () => {
  const {
    projects,
    setProjects: updateDataProject,
    selectedProject,
    setSelectedProject: updateSelectedProject,
    selectedProjectId,
    filterType,
    setFilterType,
    isModalOpenBudget,
    setIsModalOpenBudget,
  } = useContext(ViewerContext);

  const openModal = () => setIsModalOpenBudget(true);

  useEffect(() => {
    // Función para obtener proyectos junto con las sheets
    const fetchProjects = async () => {
      try {
        const response = await axios.get("http://localhost:8000/project/");
        // console.log("responseProject", response);

        if (
          Array.isArray(response.data.data) &&
          response.data.data.length > 0
        ) {
          updateDataProject(response.data.data); // Actualiza el estado de proyectos
        } else {
          console.error("Empty array of projects", response);
        }
      } catch (error) {
        console.error("Error fetching projects", error);
      }
    };

    fetchProjects();
  }, [updateDataProject, isModalOpenBudget]);

  useEffect(() => {
    // Encuentra el proyecto seleccionado basado en el ID
    const project = projects.find((p) => p.projectId === selectedProjectId);
    updateSelectedProject(project); // Actualiza el estado del proyecto seleccionado
    // console.log("Selected Project:", project);
  }, [selectedProjectId, projects]);

  //elimina espacos vacios
  // if (!filterType || filterType.trim() === "") {
  //   console.log("actualCost", 0);
  //   return;
  // }

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
      minimumFractionDigits: 2,
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

  return (
    <div className="bg-white ml-2 mr-6  shadow-xl  rounded-xl overflow-y-auto">
      <div className="mb-10">
        <div className="bg-gray-300 "></div>
        <h1 className="text-lg ml-2 font-semibold">
          CONTROL SHEET ACTUAL COST
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
              </svg>{" "}
              Create new register
            </button>
          </div>
        </div>
        <div className="max-h-[200px] overflow-y-auto b-4">
          <table className="table-auto mt-4 border-collapse border border-slate-500 ml-2 mr-2 ">
            <thead className="sticky top-0 bg-cyan-700 text-white -z-3">
              <tr className="border border-slate-500 px-4 text-xl ">
                <th className="border border-slate-500 px-4 text-xs  ">
                  ProjectId
                </th>
                <th className="border border-slate-500 px-4 text-xs  ">Date</th>
                <th className="border border-slate-500 px-4 text-xs  ">
                  Family
                </th>
                <th className="border border-slate-500 px-4  text-xs ">
                  Product Cod
                </th>
                <th className="border border-slate-500 px-4  text-xs">
                  {" "}
                  Description
                </th>
                <th className="border border-slate-500 px-4 text-xs  ">Qty</th>
                <th className="border border-slate-500 px-4  text-xs ">Unit</th>
                <th className="border border-slate-500 px-4  text-xs ">
                  Unit Price (UF)
                </th>
                {/* <th className="border border-slate-500 px-4  text-xs ">
                  Budget Price
                </th> */}
                <th className="border border-slate-500 px-4  text-xs ">
                  Subcontractors Offers
                </th>
                <th className="border border-slate-500 px-4  text-xs ">
                  Total
                </th>
                {/* <th className="border border-slate-500 px-4  text-xs ">
                  Proposal 1
                </th>
                <th className="border border-slate-500 px-4  text-xs ">
                  Proposal 2
                </th>
                <th className="border border-slate-500 px-4  text-xs ">
                  Proposal 3
                </th> */}
              </tr>
            </thead>
            <tbody>
              {filteredSheets.map((item, index) => (
                <tr key={index}>
                  <td className="border border-slate-500 px-4 text-xs ">
                    {item.projectId}
                  </td>
                  <td className="border border-slate-500 px-4 text-xs ">
                    {formatedDate(item.date)}
                  </td>
                  <td className="border border-slate-500 px-4 text-xs ">
                    {item.family}
                  </td>
                  <td className="border border-slate-500 px-4 text-xs ">
                    {item.cod}
                  </td>
                  <td className="border border-slate-500 px-4 text-xs ">
                    {item.description}
                  </td>
                  <td className="border border-slate-500 px-4 text-xs ">
                    {item.qty}
                  </td>
                  <td className="border border-slate-500 px-4 text-xs ">
                    {item.unit}
                  </td>
                  <td className="border border-slate-500 px-4 text-xs ">
                    {formatCurrency(item.unitPrice)}
                  </td>
                  {/* <td className="border border-slate-500 px-4 text-xs ">
                    {formatCurrency(item.budgetPrice)}
                  </td> */}
                  <td className="border border-slate-500 px-4 text-xs ">
                    {item.subcontractorOffers}
                  </td>
                  <td className="border border-slate-500 px-4 text-xs ">
                    {formatCurrency(item.total)}
                  </td>
                  {/* <td className="border border-slate-500 px-4 text-xs ">
                    {item.proposal1}
                  </td>
                  <td className="border border-slate-500 px-4 text-xs ">
                    {item.proposal2}
                  </td>
                  <td className="border border-slate-500 px-4 text-xs ">
                    {item.proposal3}
                  </td> */}
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
