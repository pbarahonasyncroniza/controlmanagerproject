import { useState, useContext } from "react";
import Modal from "../Modal";
import axios from "axios";
import { ViewerContext } from "../Context";

const FormInvoices = () => {
  const {
    isModalOpenBudget,
    updateisModalOpenBudget,
    projectId,
    setProjectId,
    setFormSubmitted,
  } = useContext(ViewerContext);

  const [family, setFamily] = useState("");
  const [subfamily, setSubfamily] = useState("");
  const [invoices, setInvoices] = useState("");
  const [dateInvoices, setDateInvoices] = useState("");
  const [subcontractorOffers, setSubcontractorsOffers] = useState("");
  const [description, setDescription] = useState("");
  const [totalInvoices, setTotalInvoices] = useState("");
  const [invoiceStatus, setInvoiceStatus] = useState("Pendiente");
  const [dueDate, setDueDate] = useState("");
  const [observations, setObservations] = useState("");

  const closeModelInvoices = () => updateisModalOpenBudget(false);

  const handleSubmitSheet = async (e) => {
    e.preventDefault();
    const sheetData = {
      projectId: projectId || undefined,
      family: family || undefined,
      subfamily: subfamily || undefined,
      invoices: invoices || undefined,
      dateInvoices: dateInvoices || undefined,
      subcontractorOffers: subcontractorOffers || undefined,
      description: description || undefined,
      totalInvoices: totalInvoices || undefined,
      invoiceStatus: invoiceStatus || undefined,
      dueDate: dueDate || undefined,
      observations: observations || undefined,
    };
    try {
      const response = await axios.post(
        "http://localhost:8000/invoices/",
        sheetData
      );
      console.log("🚀 ~ handleSubmitSheet ~ response:", response);
      setFormSubmitted(true); // Establece formSubmitted a true
    } catch (error) {
      console.error("Error submitting sheet:", error);
    }
  };

  // limpia formulario
  const resetForm = () => {
    projectId("");
    family("");
    subfamily("");
    invoices("");
    dateInvoices("");
    subcontractorOffers(1);
    description("");
    totalInvoices("");
    invoiceStatus("");
    dueDate("");
    observations("");
  };

  const closeModalInvoices = () => {
    updateisModalOpenBudget(false);
    resetForm();
  };

  return (
    <div className=" ">
      <Modal
        className=""
        isOpen={isModalOpenBudget}
        onClose={closeModelInvoices}>
        <h1 className="text-2xl font-blod mb-2 text-white">
          Ingreso de Facturas
        </h1>
        <form className="" onSubmit={handleSubmitSheet}>
          <div className="bg-slate-900 ">
            <div className="flex gap-2 ">
              <div className="">
                <label className="text-lg text-white font-bolt mb-2 ">
                  ProjectId
                </label>
                <input
                  className="  bg-slate-700 rounded-lg mb-2 mt-2 flex mr-2 p-2 text-white border-solid border-4 border-gray-500  "
                  placeholder="ProjectId"
                  type="text"
                  name="ProjectId"
                  value={projectId}
                  onChange={(e) => setProjectId(e.target.value)}
                />
              </div>
            </div>

            <div className="">
              <label className="text-lg text-white font-bolt mb-2  ">
                Familia
              </label>
              <select
                className="text-lg  font-bolt   bg-slate-700 rounded-lg mb-2 mt-2 flex mr-2 p-2 text-white border-solid border-4 border-gray-500"
                name="family"
                value={family}
                onChange={(e) => setFamily(e.target.value)}>
                <option value="">Selecionar una Familia</option>
                <option value="Subcontrato">Subcontrato</option>
                <option value="Material">Material</option>
                <option value="Arriendos">Arriendos</option>
                <option value="Mano_Obra">Mano_Obra</option>
                <option value="Otros">Otros</option>
                <option value="GG">GG</option>
              </select>
            </div>
            <div className="">
              <select
                className=" bg-slate-700 rounded-lg mb-2 mt-2 flex mr-2 p-2 text-white border-solid border-4 border-gray-500 w-full"
                type="text"
                name="SubcontractorOffers "
                value={subfamily}
                onChange={(e) => setSubfamily(e.target.value)}>
                <option value="">Selecionar una HC</option>
                <option value="Aridos_cemento_Morteros_Afinado _andamios ">
                  Aridos_cemento_Morteros_Afinado _andamios
                </option>
                <option value="Cerrajeria">Cerrajeria</option>
                <option value="Desbaste_yeso_Cornizas">
                  Desbaste_yeso_Cornizas
                </option>
                <option value="Fierro">Fierro</option>
                <option value="Hormigones">Hormigones</option>
                <option value="Inst_faena">Inst_faena</option>
                <option value="Inst_Sanitarias ">Inst_Sanitarias</option>
                <option value="Instalacion_Moldaje">
                  Instalacion_Moldaje{" "}
                </option>
                <option value="Instalacion_Tabiques">
                  Instalacion_Tabiques
                </option>
                <option value="Instalaciones_Electricas">
                  {" "}
                  Instalaciones_Electricas
                </option>
                <option value="Madera_Fijaciones_varios ">
                  Madera_Fijaciones_varios
                </option>
                <option value="Moldaje">Moldaje</option>
                <option value="Arriendo_Moldaje">Arriendo_Moldaje</option>
                <option value="Mano_obra">Mano_Obra</option>
                <option value="Movimiento_Tierra">Movimiento_Tierra</option>
                <option value="Muebles">Muebles</option>
                <option value="Otros">Otros</option>
                <option value="Papel_mural_revestimiento">
                  Papel_mural_revestimiento
                </option>
                <option value="Pavimentos-Ceramicas">
                  Pavimentos-Ceramicas
                </option>
                <option value="Pintura">Pintura</option>
                <option value="puertas_cerraduras">puertas_cerraduras</option>
                <option
                  value="Socalzado
                  ">
                  Socalzado
                </option>
                <option
                  value="Tabiqueria
                  ">
                  Tabiqueria
                </option>
                <option
                  value="Terminaciones
                  ">
                  Terminaciones
                </option>
                <option
                  value="Subcontrato_Fierro
                  ">
                  Subcontrato_Fierro
                </option>
                <option
                  value="Ventanas
                  ">
                  Ventanas
                </option>
              </select>
            </div>
            <div className="">
              <label className="text-lg text-white font-bolt mb-2 ">
                N° Factura
              </label>
              <input
                className=" bg-slate-700 rounded-lg mb-2 mt-2 flex  mr-2 p-2 text-white border-solid border-4 border-gray-500 w-full"
                placeholder="factura"
                type="text"
                name="invoice"
                value={invoices}
                onChange={(e) => setInvoices(e.target.value)}
              />
            </div>
          </div>
          <div>
            <label className="text-lg text-white font-bolt mb-2 ">
              Proveedor
            </label>
            <input
              className=" bg-slate-700 rounded-lg mb-2 mt-2 flex mr-2 p-2 text-white border-solid border-4 border-gray-500 w-full"
              placeholder="Proveedor"
              type="text"
              name="subcontractorOffers"
              value={subcontractorOffers}
              onChange={(e) => setSubcontractorsOffers(e.target.value)}
            />
          </div>
          <div className="">
            <div className="flex">
              <div className="">
                <label className="text-lg text-white font-bolt mb-2 ">
                  Glosa
                </label>
                <input
                  className=" bg-slate-700 rounded-lg mb-2 mt-2 flex mr-2 p-2 text-white border-solid border-4 border-gray-500  w-full"
                  placeholder="Glosa"
                  type="text"
                  name="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>
              <div className="">
                <label className="text-lg text-white font-bolt mb-2 ">
                  Valor Neto Factura
                </label>
                <input
                  className=" bg-slate-700 rounded-lg mb-2 mt-2 flex mr-2 p-2 text-white border-solid border-4 border-gray-500  w-full"
                  placeholder="Neto Factura"
                  type="number"
                  name="totalInvoices"
                  value={totalInvoices}
                  onChange={(e) => setTotalInvoices(e.target.value)}
                />
              </div>
              <div className="">
                <label className="text-lg text-white font-bolt mb-2 ">
                  Fecha emision
                </label>
                <input
                  className=" bg-slate-700 rounded-lg mb-2 mt-2 flex mr-2 p-2 text-white border-solid border-4 border-gray-500  w-full"
                  placeholder="Fecha emision"
                  type="date"
                  name="dataInvoices"
                  value={dateInvoices}
                  onChange={(e) => setDateInvoices(e.target.value)}
                />
              </div>
              <div className="">
                <label className="text-lg text-white font-bolt mb-2 ">
                  Fecha Pago
                </label>
                <input
                  className=" bg-slate-700 rounded-lg mb-2 mt-2 flex mr-2 p-2 text-white border-solid border-4 border-gray-500  w-full"
                  placeholder="Neto Factura"
                  type="date"
                  name="invoiceStatus"
                  value={dueDate}
                  onChange={(e) => setDueDate(e.target.value)}
                />
              </div>
            </div>

              <div className="">
                <label className="text-lg text-white font-bolt mb-2 ">
                  estado factura
                </label>
                <select
                  className=" bg-slate-700 rounded-lg mb-2 mt-2 flex mr-2 p-2 text-white border-solid border-4 border-gray-500  w-full"
                  placeholder="Neto Factura"
                  type="checkbox"
                  name="invoiceStatus"
                  value={invoiceStatus}
                  onChange={(e) => setInvoiceStatus(e.target.value)}>
                  <option value="Pendiente">Pendiente</option>
                  <option value="Pagado">Pagado</option>
                </select>
              </div>
            

            <div className="">
              <label className="text-lg text-white font-bolt mb-2 ">
                Observaciones
              </label>
              <input
                className=" bg-slate-700 rounded-lg mb-2 mt-2 flex mr-2 p-2 text-white border-solid border-4 border-gray-500"
                placeholder="Observaciones"
                type="text"
                name="observations"
                value={observations}
                onChange={(e) => setObservations(e.target.value)}
              />
            </div>
          </div>

          <div className="flex justify-between">
            <button className="bg-green-500 font-semibold rounded-xl text-white p-3 mt-2  mb-2">
              Grabar
            </button>
            <button
              onClick={closeModalInvoices}
              className="bg-red-500 rounded-xl text-white font-semibold p-3 mt-2  mb-2">
              Cerrar
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default FormInvoices;
