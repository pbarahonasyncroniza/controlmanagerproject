import { useContext } from "react";
import { ViewerContext } from "../Context";

const IdentificationHeader = () => {
  const { selectedFamily, selectedSubfamily, materialSheets , selectedProjectId} =
    useContext(ViewerContext);

  const aggregateData = (sheets) => {
    const groupedData = {};
    
    sheets = sheets.filter((sheet) => !selectedProjectId || sheet.projectId === selectedProjectId);

    sheets.forEach((sheet) => {
      if (
        (selectedFamily === "" || sheet.family === selectedFamily) &&
        (selectedSubfamily === "" || sheet.subfamily === selectedSubfamily)
      ) {
        if (!groupedData[sheet.projectId]) {
          groupedData[sheet.projectId] = {
            projectId: sheet.projectId,
            families: {},
          };
        }

        const familyKey = `${sheet.family}-${sheet.subfamily}`;
        if (!groupedData[sheet.projectId].families[familyKey]) {
          groupedData[sheet.projectId].families[familyKey] = {
            family: sheet.family,
            subfamily: sheet.subfamily,
            subcontractorOffers: new Set(),
            total: 0,
          };
        }

        groupedData[sheet.projectId].families[
          familyKey
        ].subcontractorOffers.add(sheet.subcontractorOffers);
        groupedData[sheet.projectId].families[familyKey].total += sheet.total;
      }
    });

    return Object.values(groupedData);
  };

  const aggregatedSheets = aggregateData(materialSheets);

  
  let totalGastado = 0;
  aggregatedSheets.forEach((project) => {
    Object.values(project.families)
      .filter(
        (family) =>
          selectedSubfamily === "" || family.subfamily === selectedSubfamily
      )
      .forEach((family) => {
        totalGastado += family.total;
      });
  });

  return (
    <div className="ml-4 mr-2">
      <div className="mt-4 ">
        {aggregatedSheets.map((project) => (
          <div
            key={project.projectId}
            className="bg-white shadow-lg  px-6 py-2 rounded-xl mb-4">
            <h2 className="text-center text-xl font-semibold">
              Proyecto: {project.projectId}
            </h2>

            {Object.values(project.families)
              .filter(
                (family) =>
                  selectedSubfamily === "" ||
                  family.subfamily === selectedSubfamily
              )
              .map((family, index) => (
                <div key={index}>
                  <div className="flex">
                    <p>Proveedores:</p>
                    <p className="text-lg font-semibold ml-2">
                      {[...family.subcontractorOffers].join(",")}
                    </p>
                  </div>
                  <div className="flex">
                    <h1>Familia:</h1>
                    <h1 className="text-lg font-semibold ml-2">
                      {family.family}
                    </h1>
                  </div>
                  <div className="flex">
                    <h1 className="">Subfamilia:</h1>
                    <h1 className="text-lg font-semibold ml-2">
                      {family.subfamily}
                    </h1>
                  </div>
                </div>
              ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default IdentificationHeader;
