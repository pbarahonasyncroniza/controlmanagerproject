import { useContext, useEffect, useState } from "react";
import { ViewerContext } from "../Context";

const MaterialSheetsControl = () => {
  const {
    projectId,
    projects,
    getDataBudget,
    selectedSubfamily,
    setSelectedSubfamily,
    selectedFamily,
    setMaterialSheets,
    accumatedValue,
    setSelectedProjectId,
    selectedProjectId,
    setTotalBySubFamily,
  } = useContext(ViewerContext);
    console.log("🚀 ~ MaterialSheetsControl ~ selectedSubfamily:", selectedSubfamily);
    console.log("🚀 ~ MaterialSheetsControl ~ selectedProjectId:", selectedProjectId);
  const [familySubfamilyMap, setFamilySubfamilyMap] = useState({});

  useEffect(() => {
    const filteredSheets = projects
      .flatMap((project) => project.sheets || [])
      .filter((sheet) => {
        const projectMatch = projectId === "" || sheet.projectId === projectId; // Nuevo filtro por projectId
        const familyMatch =
          selectedFamily === "" || sheet.family === selectedFamily;
        const subfamilyMatch =
          selectedSubfamily === "" || sheet.subfamily === selectedSubfamily;
        return projectMatch && familyMatch && subfamilyMatch; // Incluye el nuevo filtro en la condición
      });
    setMaterialSheets(filteredSheets);
  }, [projects, selectedFamily, selectedSubfamily, projectId]); // Añade projectId como dependencia

  //  selecciona un projectId una subfamily y suma de totales por subfamily que viene del budget
  useEffect(() => {
    const filteredData = getDataBudget.filter((x) => {
      const subfamilyMatch =
        selectedSubfamily === "" || x.subfamily === selectedSubfamily;
      const projectMatch = projectId === "" || x.projectId === projectId;
      return subfamilyMatch && projectMatch;
    });

    const totalsBySubfamily = {};

    filteredData.forEach((x) => {
      const subfamily = x.subfamily;
      if (totalsBySubfamily[subfamily]) {
        totalsBySubfamily[subfamily] += x.totalPrice;
      } else {
        totalsBySubfamily[subfamily] = x.totalPrice;
      }
    });

    setTotalBySubFamily(totalsBySubfamily);
  }, [getDataBudget, selectedSubfamily, projectId]); // Incluye projectId en la lista de dependencias

  useEffect(() => {
    const mapa = {};
    getDataBudget.forEach((x) => {
      if (!mapa[x.family]) {
        mapa[x.family] = new Set();
      }
      mapa[x.family].add(x.subfamily);
    });

    setFamilySubfamilyMap(mapa); // Actualiza el estado con el nuevo mapa
  }, [getDataBudget]);

  const uniqueSubfamilies = Array.from(new Set(getDataBudget.map((y) => y.subfamily))).sort();


  useEffect(() => {}, [accumatedValue]);

  return (
    <div>
      <div className="text-xl text-center mt-4 font-semibold bg-white ml-3 mr-2 rounded-xl">
        <h1 className="text-2xl">HOJAS DE CONTROL</h1>
        <div className="flex justify-center">
          <h1 className="mt-5">Elegir Proyecto</h1>
          <select
            className="ml-4 bg-blue-500 p-2 rounded-lg text-white mt-4 mb-2 shadow-xl"
            name="newProjectId"
            value={selectedProjectId} // Cambia esto para usar selectedProjectId
            onChange={(e) => {
              const newProjectId = e.target.value;
              setSelectedProjectId(newProjectId); // Actualiza el projectId en el contexto o estado
              // Aquí podrías resetear otros estados dependientes si es necesario
            }}>
            <option value="">Todos los Proyectos</option>
            {projects.map((project) => (
              <option key={project._id} value={project.id}>
                {project.projectId}
              </option>
            ))}
          </select>
        </div>
        <div>
          <div className="flex justify-center">
            <h1 className="mt-5">Elegir Hoja de Control</h1>
            <select
              className="ml-4 bg-blue-500 p-2 rounded-lg text-white mt-4 mb-2 shadow-xl"
              name="selectedSubfamily"
              value={selectedSubfamily}
              onChange={(e) => setSelectedSubfamily(e.target.value)}>
              <option className="" value="Elegir Hoja de Control">
                Elegir Hoja de Control
              </option>
              {uniqueSubfamilies.map((subfamily) => (
                <option key={subfamily} value={subfamily}>
                  {subfamily}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};
export default MaterialSheetsControl;
