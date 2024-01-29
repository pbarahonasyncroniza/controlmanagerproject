import { createContext, useState } from "react";

export const ViewerContext = createContext();

const ViewerProvider = ({ children }) => {
  const [viewer, setViewer] = useState(null);
  const [IfcLoader, setIfcLoader] = useState(null);
  const [model, setModel] = useState(null);
  const [viewerContainer, setViewerContainer] = useState(null);
  const [highlighter, setHighlighter] = useState(null);
  const [totalSum, setTotalSum] = useState(0);
  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);
  const [selectedProjectId, setSelectedProjectId] = useState("");
  const [filterType, setFilterType] = useState("");
  const [getDataBudget, setGetDataBudget] = useState([]);
  const [totalBudget, setTotalBudget] = useState([]);
  const [filteredProjectId, setFilteredProjectId] = useState("PT-101");
  const [isModalOpen, setIsMoldalOpen] = useState(false);
  const [isModalOpenBudget, setIsModalOpenBudget] = useState(false);
  const [getDataSheet, setGetDataSheet] = useState([]);
  const [dataNode, setDataNode] = useState({ nodes: [] });
  const [selectedSubfamily, setSelectedSubfamily] = useState(
    "Elegir Hoja de Control"
  );
  const [data, setData] = useState({ nodes: [] });
  const [acumuladoTotal, setAcumuladoTotal] = useState(0);
  const [selectedFamily, setSelectedFamily] = useState("");
  const [materialSheets, setMaterialSheets] = useState([]);
  const [projectId, setProjectId] = useState("");
  const [date, setDate] = useState("");
  const [acumuladoActualTotal, setAcumuladoActualTotal] = useState(0);
  const [isEditMode, setIsEditMode] = useState(false);
  const [currentSheetId, setCurrentSheetId] = useState(null);
  const [formSubmitted, setFormSubmitted] = useState({});
  const [invoicesdata, setInvoicesData] = useState([]);
  const [accumatedValue, setAccumatedValue] = useState(0);

  const [dataIncreaseDiscount, setDataIncreaseDiscount] = useState({
    nodes: [],
  });

  const [filters, setFilters] = useState({
    projectId: "",
    cod: "",
    taskName: "",
    unit: "",
    Qty: "",
    unitPrice: "",
    totalPrice: "",
    family: "",
  });

  const updateIfcLoader = (newLoader) => {
    setIfcLoader(newLoader);
  };

  const updateModel = (newmodel) => {
    setModel(newmodel);
  };

  const updateViewerContainer = (newcontainer) => {
    setViewerContainer(newcontainer);
  };
  const updatehighliter = (newhighliter) => {
    setHighlighter(newhighliter);
  };

  const updateTotalSum = (newTotal) => {
    if (typeof newTotal === "number" && newTotal >= 0) {
      setTotalSum(newTotal);
    } else {
      console.error("Invalid totalSum: ", newTotal);
    }
  };

  const updateDataProject = (newDataProject) => {
    setProjects(newDataProject);
  };

  const updateSelectetProject = (newSelectedProject) => {
    setSelectedProject(newSelectedProject);
  };

  const updateSelectedProjectId = (newSelectedProjectId) => {
    setSelectedProjectId(newSelectedProjectId);
  };

  const updatefilterType = (newFilterType) => {
    setFilterType(newFilterType);
  };

  const updateOpenModal = (newUpdateOpenModal) => {
    setIsMoldalOpen(newUpdateOpenModal);
  };

  const updateGetDataBudget = (newUpdaDataBudget) => {
    setGetDataBudget(newUpdaDataBudget);
  };

  const updateFilters = (newUpdateFilters) => {
    setFilters(newUpdateFilters);
  };
  const updatesetTotalBudget = (newUpdateTotalBudget) => {
    setTotalBudget(newUpdateTotalBudget);
  };
  const updatefilteredProjectId = (newUpdatefilteredProjectId) => {
    setFilteredProjectId(newUpdatefilteredProjectId);
  };
  const updateisModalOpenBudget = (newUpdateisModalOpenBudget) => {
    setIsModalOpenBudget(newUpdateisModalOpenBudget);
  };
  const updategetDataSheet = (newUpdategetDataSheet) => {
    setGetDataSheet(newUpdategetDataSheet);
  };
  const updateDataNode = (newUpdaDataNode) => {
    setDataNode(newUpdaDataNode);
  };

  const getTotalProyectado = () => {
    return data.nodes.reduce((total, node) => {
      return total + (Number(node.Proyectado) || 0);
    }, 0);
  };

  const getTotalRecuperable = () => {
    return dataIncreaseDiscount.nodes.reduce((total, node) => {
      return total + (Number(node.Recuperable) || 0);
    }, 0);
  };

  return (
    <ViewerContext.Provider
      value={{
        updateTotalSum,
        totalSum,
        setTotalSum,
        viewer,
        setViewer,
        IfcLoader,
        updateIfcLoader,
        model,
        updateModel,
        viewerContainer,
        updateViewerContainer,
        highlighter,
        updatehighliter,
        projects,
        setProjects,
        updateDataProject,
        selectedProject,
        setSelectedProject,
        updateSelectetProject,
        selectedProjectId,
        setSelectedProjectId,
        updateSelectedProjectId,
        filterType,
        setFilterType,
        updatefilterType,
        isModalOpen,
        setIsMoldalOpen,
        updateOpenModal,
        updateGetDataBudget,
        setGetDataBudget,
        getDataBudget,
        filters,
        updateFilters,
        setFilters,
        updatesetTotalBudget,
        setTotalBudget,
        totalBudget,
        updatefilteredProjectId,
        setFilteredProjectId,
        filteredProjectId,
        updateisModalOpenBudget,
        setIsModalOpenBudget,
        isModalOpenBudget,
        getDataSheet,
        updategetDataSheet,
        dataNode,
        setDataNode,
        updateDataNode,
        selectedSubfamily,
        setSelectedSubfamily,
        getTotalProyectado,
        data,
        setData,
        getTotalRecuperable,
        dataIncreaseDiscount,
        setDataIncreaseDiscount,
        acumuladoTotal,
        setAcumuladoTotal,
        selectedFamily,
        setSelectedFamily,
        materialSheets,
        setMaterialSheets,
        acumuladoActualTotal,
        setAcumuladoActualTotal,
        projectId,
        setProjectId,
        date,
        setDate,
        isEditMode,
        setIsEditMode,
        currentSheetId,
        setCurrentSheetId,
        formSubmitted,
        setFormSubmitted,
        invoicesdata,
        setInvoicesData,
        accumatedValue,
        setAccumatedValue,
      }}>
      {children}
    </ViewerContext.Provider>
  );
};

export default ViewerProvider;
