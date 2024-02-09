import { useEffect, useContext } from "react";
import { ViewerContext } from "../Context";

const ProjectInformation = () => {
  const {
    projects,
    setSelectedProject,
    selectedProject,
    selectedProjectId,
    setSelectedProjectId: updateSelectedProjectId,
    setIsMoldalOpen,
    filteredProjectId,
    totalBudget,
    getDataSheet,
  } = useContext(ViewerContext);

  const openModal = () => setIsMoldalOpen(true);

  useEffect(() => {
    const project = projects.find((p) => p.projectId === selectedProjectId);
    setSelectedProject(project);
  }, [selectedProjectId, projects]);

  // filtro del total presupuestado de cada proyecto
  const filteredDataProject = totalBudget.filter((item) => {
    const passesProjectId =
      !selectedProjectId || item.projectId === selectedProjectId;

    return passesProjectId;
  });

  // filtro del costo Actual
  const filteredDataSheet = getDataSheet.filter((item) => {
    const passesProjectId =
      !selectedProjectId || item.projectId === selectedProjectId;

    return passesProjectId;
  });

  const formatCurrency = (value) => {
    return Number(value).toLocaleString("es-Cl", {
      style: "currency",
      currency: "CLP",
      minimumFractionDigits: 0,
    });
  };

  // funcion que filtra el costo total del proyecto
  const budgetAvailableProject = () => {
    const filteredProjects = filteredDataProject.filter((item) => {
      return item.projectId === selectedProjectId;
    });

    return filteredProjects.reduce(
      (total, item) => total + Number(item.totalBudget),
      0
    );
  };

  // funcion que calcula es costo actual de las ordenes de compras
  const actualCostSheet = () => {
    const filteredSheets = filteredDataSheet.filter((item) => {
      return item.projectId === selectedProjectId;
    });
    return filteredSheets.reduce(
      (total, item) => total + Number(item.totalSum),
      0
    );
  };

  const differentBudget = budgetAvailableProject() - actualCostSheet();

  const progressBudget =
    budgetAvailableProject() !== 0
      ? (actualCostSheet() / budgetAvailableProject()) * 100
      : 0;
  const formattedProgressBudget = () => `${progressBudget.toFixed(2)}%`;

  return (
    <div>
      <div className="bg-white ml-4 mr-6 mt-2 shadow-xl rounded-lg grid grid-cols-[1fr_2fr]">
        <div className="">
          <h1 className=" text-xl font-semibold  mb-2 ml-2  ">
            INFORMACION DEL PROYECTO
          </h1>
          <div className="text-xs   ">
            <div className="col-span-4 mr-2">
              <button
                onClick={openModal}
                type="button"
                className="flex bg-blue-500 p-2 text-white rounded-lg text-lg gap-2 mt-1 ml-2">
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
                Crear Nuevo Proyecto
              </button>

              <h1 className="text-lg font-semibold ml-2 mt-2 ">
                SELECCIONAR PROYECTO
              </h1>
              <select
                className="bg-blue-500 p-2 ml-2 rounded-lg text-white text-lg"
                value={selectedProjectId}
                onChange={(e) => updateSelectedProjectId(e.target.value)}>
                <option value="">Select a Project</option>
                {projects.map((project) => (
                  <option key={project._id} value={project.projectId}>
                    {project.projectName}/{project.projectId}
                  </option>
                ))}
              </select>
              <div className=" ">
                <div className="">
                  <table className="table-auto mt-4 mb-6 border-collapse border border-slate-300 ml-2 rounded-lg">
                    <thead>
                      <tr className=" text-gray-600  px-4 text-sm ">
                        <th className="border border-slate-300 px-4 text-lg bg-cyan-700 text-white">
                          ProjectId
                        </th>
                        <th className="border border-slate-300 px-4 text-lg  bg-cyan-700 text-white ">
                          Nombre Proyecto
                        </th>
                        <th className="border border-slate-300 px-4 text-lg bg-cyan-700 text-white ">
                          Fecha Inicio
                        </th>
                        <th className="border border-slate-300 px-4 text-lg bg-cyan-700 text-white ">
                          Fecha Termino
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="border text-gray-00 border-slate-300 px-4 text-lg ">
                          {selectedProject?.projectId || "N/A"}
                        </td>
                        <td className="border border-slate-300 px-4 text-lg text-gray-500">
                          {selectedProject?.projectName || "N/A"}
                        </td>
                        <td className="border border-slate-300 px-4 text-lg text-gray-500 ">
                          {selectedProject?.startDate || "N/A"}
                        </td>
                        <td className="border border-slate-300 px-4 text-lg text-gray-500 ">
                          {selectedProject?.endDate || "N/A"}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-4 ">
          <div className="  flex justify-center mt-4 mb-4 ">
            {filteredProjectId && filteredDataProject && (
              <div className="   text-center bg-blue-500 px-10 py-2 rounded-xl shadow-xl ">
                <div className="text-xl mt-8 text-white ">Presupuesto: </div>
                <div className="text-3xl text-white mt-4">
                  {formatCurrency(budgetAvailableProject())}
                </div>
              </div>
            )}
          </div>
          <div className=" text-center bg-blue-500 px-10 py-2 rounded-xl shadow-xl mt-4 mb-4 mr-3">
            <h1 className="text-xl mt-14 text-white">
              Gastado a la Fecha (OC) :
            </h1>
            <div className="text-3xl text-white mt-4">
              {formatCurrency(actualCostSheet())}
            </div>
          </div>
          <div className=" text-center bg-blue-500 px-10 py-2 rounded-xl shadow-xl mt-4 mb-4 mr-3 ">
            <h1 className=" text-xl mt-14 text-white">Disponible:</h1>
            <div className="text-3xl text-white mt-4">
              {formatCurrency(differentBudget)}
            </div>
          </div>
          <div className=" text-center bg-blue-500 px-10 py-2 rounded-xl shadow-xl mt-4 mb-4 mr-4 ">
            <h1 className=" text-xl mt-14 text-white">% Gastado:</h1>
            <div className="text-3xl text-white mt-4 ">
              {formattedProgressBudget(progressBudget)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectInformation;
