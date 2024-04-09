import { useContext, useEffect, useState } from "react";
import { ViewerContext } from "./Context";

const FilterMasterPurchaseOrdres = () => {
  const {
    selectedSubfamily,
    // selectedProjectId,
    invoicesdata,
    selectedFamily,
    projectId,
    setSelectedProjectId,
  } = useContext(ViewerContext);
  const [newfilteredInvoice, setNewFilteredInvoice] = useState([]);
  const [uniqueProjectsIds, setUniqueProjectIds] = useState([]);
  const  [selectedInvoiceId, setSelectedInvoiceId] = useState("")
  useEffect(() => {
    const filteredInvoice = invoicesdata.filter((invoice) => {
      const projectMatch =
      selectedInvoiceId === "" || invoice.projectId === selectedInvoiceId;
      const familyMatch =
        selectedFamily === "" || invoice.family === selectedFamily;
      const selectedSubFamily =
        selectedSubfamily === "" || invoice.subfamily === selectedSubfamily;

      return projectMatch && familyMatch && selectedSubFamily;
    });
    setNewFilteredInvoice(filteredInvoice);
  }, [invoicesdata, selectedFamily, selectedSubfamily, selectedInvoiceId]);

  useEffect(() => {
    const projectIds = new Map();

    newfilteredInvoice.forEach((invoice) => {
      if (!projectIds.has(invoice.projectId)) {
        projectIds.set(invoice.projectId, true);
      }
    });

    const uniqueProjects = Array.from(projectIds.keys());
    setUniqueProjectIds(uniqueProjects); // Asumiendo que tienes un estado para esto
  }, [
    newfilteredInvoice,
    selectedInvoiceId,
    invoicesdata,
    selectedFamily,
    selectedSubfamily,
  ]);

  return (
    <div>
      <div className="flex">
        <select
          className="ml-4 bg-blue-500 p-2 rounded-lg text-white mt-4 mb-2 shadow-xl"
          value={selectedInvoiceId}
          onChange={(e) => {
            const newProjectId = e.target.value;
            setSelectedInvoiceId(newProjectId); // Actualiza el projectId en el contexto o estado
            // Aquí podrías resetear otros estados dependientes si es necesario
          }}>
          <option value="">Elegir Proyecto</option>
          {uniqueProjectsIds.map((projectId) => (
            <option key={projectId} value={projectId}>
              {projectId}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default FilterMasterPurchaseOrdres;
