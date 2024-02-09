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
  const [filteredProjectId, setFilteredProjectId] = useState("");
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
  const [family, setFamily] = useState("");
  const [cod, setCod] = useState("");
  const [description, setDescription] = useState("");
  const [unit, setUnit] = useState("");
  const [subcontractorOffers, setSubcontractorsOffers] = useState("");
  const [qty, setQty] = useState("");
  const [unitPrice, setUnitPrice] = useState("");
  const [total, setTotal] = useState("");
  const [subfamily, setSubfamily] = useState("");
  const [curentIdInvoices, setCurentIdInvoices] = useState("");
  const [invoices, setInvoices] = useState("");
  const [dateInvoices, setDateInvoices] = useState("");
  const [totalInvoices, setTotalInvoices] = useState("");
  const [invoiceStatus, setInvoiceStatus] = useState("Pendiente");
  const [dueDate, setDueDate] = useState("");
  const [observations, setObservations] = useState("");
  const [totalBySubFamily, setTotalBySubFamily] = useState({});

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
  // formato de fecha
  const formatDateForInput = (isoDate) => {
    if (!isoDate) return ""; // Retorna una cadena vacía si no hay fecha
    return isoDate.split("T")[0]; // Extrae y retorna solo la parte de la fecha (YYYY-MM-DD)
  };

  const handleInvoiceSelect = (invoiceId) => {
    setCurentIdInvoices(invoiceId);
    // Además, aquí podrías abrir el modal de edición o realizar otras acciones necesarias
  };

  const formatCurrency = (value) => {
    return Number(value).toLocaleString("es-Cl", {
      style: "currency",
      currency: "CLP",
      minimumFractionDigits: 0,
    });
  };

  const openEditForm = (sheet) => {
    console.log("🚀 ~ openEditForm ~ sheet:", sheet);
    // Cargar los datos del registro en los campos del formulario
    setSelectedFamily(sheet.family);
    setProjectId(sheet.projectId);
    setDate(formatDateForInput(sheet.date));
    setCod(sheet.cod);
    setFamily(sheet.family);
    setDescription(sheet.description);
    setUnit(sheet.unit);
    setSubcontractorsOffers(sheet.subcontractorOffers);
    setQty(sheet.qty);
    setUnitPrice(sheet.unitPrice);
    setTotal(sheet.total);
    setSubfamily(sheet.subfamily);
    setIsEditMode(true);
    setCurrentSheetId(sheet._id);
    setIsModalOpenBudget(true);
  };

  const openFormAndCurrentInvloiceId = (invoiceId) => {
    // Encuentra la factura específica por su ID
    const invoiceToEdit = invoicesdata.find(
      (invoice) => invoice._id === invoiceId
    );

    if (invoiceToEdit) {
      console.log(
        "🚀 ~ openFormAndCurrentInvloiceId ~ invoiceToEdit:",
        invoiceToEdit
      );

      setProjectId(invoiceToEdit.projectId);
      setFamily(invoiceToEdit.family);
      setSubfamily(invoiceToEdit.subfamily);
      setInvoices(invoiceToEdit.invoices);
      setDateInvoices(invoiceToEdit.dateInvoices);
      setTotalInvoices(invoiceToEdit.totalInvoices);
      setSubcontractorsOffers(invoiceToEdit.subcontractorOffers)
      setDescription(invoiceToEdit.description);
      setDueDate(formatDateForInput(invoiceToEdit.dueDate));
      setObservations(invoiceToEdit.observations);
      setInvoiceStatus(invoiceToEdit.invoiceStatus);
      setDateInvoices(formatDateForInput(invoiceToEdit.dateInvoices));

      setIsEditMode(true); // Indica que el formulario se abre en modo edición
      setCurentIdInvoices(invoiceToEdit._id); // Guarda la ID actual de la factura que se está editando
      setIsModalOpenBudget(true); // Abre el modal del formulario
    }
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
        openEditForm,
        family,
        setFamily,
        cod,
        setCod,
        description,
        setDescription,
        unit,
        setUnit,
        subcontractorOffers,
        setSubcontractorsOffers,
        qty,
        setQty,
        unitPrice,
        setUnitPrice,
        total,
        setTotal,
        subfamily,
        setSubfamily,
        curentIdInvoices,
        setCurentIdInvoices,
        handleInvoiceSelect,
        invoices,
        setInvoices,
        dateInvoices,
        setDateInvoices,
        totalInvoices,
        setTotalInvoices,
        invoiceStatus,
        setInvoiceStatus,
        dueDate,
        setDueDate,
        observations,
        setObservations,
        openFormAndCurrentInvloiceId,
        formatCurrency,
        totalBySubFamily,
        setTotalBySubFamily,
      }}>
      {children}
    </ViewerContext.Provider>
  );
};

export default ViewerProvider;
