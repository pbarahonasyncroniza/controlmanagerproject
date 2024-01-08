import { useEffect, useContext } from "react";
import { ViewerContext } from "../Context";
import PieChartProgress from "../charts/PieChart";

const ProjectInformation = () => {
  const {
    projects,
    setSelectedProject: updateSelectetProject,
    selectedProject,
    selectedProjectId,
    setSelectedProjectId: updateSelectedProjectId,
    setIsMoldalOpen,
    filteredProjectId,
    filterType,
    totalBudget,
    getDataSheet,
  } = useContext(ViewerContext);

  const openModal = () => setIsMoldalOpen(true);

  useEffect(() => {
    const project = projects.find((p) => p.projectId === selectedProjectId);
    updateSelectetProject(project);
    // console.log("Selected Project:", project); // Depuración
  }, [updateSelectedProjectId, projects]);

  const filteredSheets =
    selectedProject?.sheets?.filter((sheet) =>
      filterType ? sheet.type === filterType : true
    ) || [];

  const actualcost = filteredSheets.reduce(
    (acc, current) => acc + current.total,
    0
  );
  // filtro del total presupuestado de cada proyecto
  const filteredDataProject = totalBudget.filter((item) => {
    const passesProjectId =
      !filteredProjectId || item.projectId === filteredProjectId;

    return passesProjectId;
  });

  // filtro del costo Actual
  const filteredDataSheet = getDataSheet.filter((item) => {
    const passesProjectId =
      !filteredProjectId || item.projectId === filteredProjectId;

    return passesProjectId;
  });

  // console.log("filteredDataProjectPROJECTINFORMATION", filteredDataProject);

  const formatCurrency = (value) => {
    return Number(value).toLocaleString("es-Cl", {
      style: "currency",
      currency: "CLP",
      minimumFractionDigits: 2,
    });
  };

  // funcion que calcula el costo total del proyecto 
  const budgetAvailableProject = () => {
    const filteredProjects = filteredDataProject.filter(
      (item) => item.projectId === filteredProjectId
    );
    // console.log("filteredProjectsssss", filteredProjects);
    return filteredProjects.reduce(
      (total, item) => total + Number(item.totalBudget),
      0
    );
  };
// funcion que calcula es costo actual 
  const actualCostSheet = () => {
    const filteredSheets = filteredDataSheet.filter(
      (item) => item.projectId === filteredProjectId
    );
    // console.log("filteredSheets", filteredSheets);
    return filteredSheets.reduce(
      (total, item) => total + Number(item.totalSum),
      0
    );
  };

  const differentBudget = budgetAvailableProject() - actualCostSheet();


  const progressBudget =
    budgetAvailableProject() !== 0
      ? (actualCostSheet() / budgetAvailableProject()) *100
      : 0;
  const formattedProgressBudget = () => `${progressBudget.toFixed(2)}%`;

  return (
    <div className="bg-white ml-4 mr-6 mt-2 shadow-xl  rounded-lg">
      <h1 className=" text-xl font-semibold  mb-2 ml-2  ">
        PROJECT INFORMATION
      </h1>
      <div className="text-xs grid grid-cols-10  ">
        <div className="col-span-4 mr-2">
          <button
            onClick={openModal}
            type="button"
            className="flex bg-blue-500 p-2 text-white rounded-lg text-sm gap-2 mt-1 ml-2">
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
            Create new project
          </button>

          <h1 className="text-sm font-semibold ml-2 mt-2 ">SELECT A PROJECT</h1>
          <select
            className="bg-blue-500 p-2 ml-2 rounded-lg text-white"
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
                    <th className="border border-slate-300 px-4 text-xs bg-cyan-700 text-white">
                      ProjectId
                    </th>
                    <th className="border border-slate-300 px-4 text-xs  bg-cyan-700 text-white ">
                      ProjectName
                    </th>
                    <th className="border border-slate-300 px-4 text-xs bg-cyan-700 text-white ">
                      StartDate
                    </th>
                    <th className="border border-slate-300 px-4 text-xs bg-cyan-700 text-white ">
                      End date
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border text-gray-00 border-slate-300 px-4 text-xs ">
                      {selectedProject?.projectId || "N/A"}
                    </td>
                    <td className="border border-slate-300 px-4 text-xs text-gray-500">
                      {selectedProject?.projectName || "N/A"}
                    </td>
                    <td className="border border-slate-300 px-4 text-xs text-gray-500 ">
                      {selectedProject?.startDate || "N/A"}
                    </td>
                    <td className="border border-slate-300 px-4 text-xs text-gray-500 ">
                      {selectedProject?.endDate || "N/A"}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div className="bg-cyan-700 flex  rounded-lg shadow-xl mr-4 mb-4 col-span-6">
          <div className="flex mb-8 ">
            {filteredProjectId && filteredDataProject && (
              <div className=" ">
                <div className="  py-5  ml-2 rounded-lg text-center text-white flex flex-col grow min-h-full">
                  <div className=" ">
                    <div className="ml-2  text-sm text-cyan-400 ">
                      Budget {filteredProjectId}:{" "}
                    </div>
                    <div className=" ml-2 mr-2 text-xl ">
                      {formatCurrency(budgetAvailableProject())}
                    </div>
                  </div>
                </div>
              </div>
            )}
            <div className="  p-5 ml-2 rounded-lg text-center text-white flex grow flex-col text-sm  ">
              <h1 className="text-cyan-400">Actual Cost:</h1>
              <div className="text-xl"> {formatCurrency(actualCostSheet())}</div>
            </div>
            <div className="  p-5  ml-2 rounded-lg text-center text-white flex flex-col text-sm grow ">
              <h1 className="text-cyan-400">Available:</h1>
              <div className="text-xl">{formatCurrency(differentBudget)}</div>
            </div>
            <div className="  p-5  ml-2 rounded-lg text-center text-white flex flex-col text-sm mr-4 grow">
              <h1 className="text-cyan-400">Progress:</h1>
              <div className="text-xl flex grow">
                {formattedProgressBudget(progressBudget)}
              </div>
              {/* <PieChartProgress /> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectInformation;
