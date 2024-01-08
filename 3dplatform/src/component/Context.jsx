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
  const [filteredProjectId, setFilteredProjectId] = useState("A-601");
  const [isModalOpen, setIsMoldalOpen] = useState(false);
  const [isModalOpenBudget, setIsModalOpenBudget] = useState(false);
  const [getDataSheet, setGetDataSheet] = useState([]);
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
        updategetDataSheet
      }}>
      {children}
    </ViewerContext.Provider>
  );
};

export default ViewerProvider;
