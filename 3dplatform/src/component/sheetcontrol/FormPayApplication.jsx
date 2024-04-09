import { useContext, useState, useEffect } from "react";
import { ViewerContext } from "../Context";
import Modal from "../../component/Modal";
import axios from "axios";

const FormPayApplication = () => {
  const {
    projectId,
    setProjectId,
    family,
    setFamily,
    isModalOpenBudget,
    isEditMode,
    invoices,
    setInvoices,
    subcontractorOffers,
    setSubcontractorsOffers,
    totalInvoices,
    setTotalInvoices,
    subfamily,
    setSubfamily,
    observations,
    setObservations,
    setIsModalOpenBudget,
  } = useContext(ViewerContext);
  const [datePayApplication, setDatePayApplication] = useState("");
  const [numberpayapplication, setNumberPayApplication] = useState("");
  const [payapplication, setPayApplication] = useState("");
  const [retenciones, setRetenciones] = useState("");
  const [porcentajedsctoAnticipo, setPorcentajedsctoAnticipo] = useState("");
  const [dsctoAnticipo, setDctoAnticipo] = useState("");
  const [anticipo, setAnticipo] = useState("");
  const [porcentajeDctoRetenciones, setPorcentajeDctoRetenciones] =
    useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payApplicationData = {
      projectId: projectId || undefined,
      family: family || undefined,
      subfamily: subfamily || undefined,
      invoices: invoices || undefined,
      subcontractorOffers: subcontractorOffers,
      totalInvoices: totalInvoices || undefined,
      observations: observations || undefined,
      anticipo: anticipo || undefined,
      datepayapplication: datePayApplication || undefined,
      numberpayapplication: numberpayapplication || undefined,
      payapplication: payapplication || undefined,
      porcentajecdsctoanticipo: porcentajedsctoAnticipo || undefined,
      dsctoanticipo: dsctoAnticipo || undefined,
      porcentajedctoretenciones: porcentajeDctoRetenciones || undefined,
      retenciones: retenciones || undefined,
    };

    await axios.post(
      "http://localhost:8000/payapplication",
      payApplicationData
    );
  };
  // calculo descuento de anticipo
  useEffect(() => {
    const descuentoAnticipo = () => {
      const valorAnticipo = Number(anticipo);
      const porcentaje =
        parseFloat(porcentajedsctoAnticipo.replace("%", "")) / 100;

      if (!isNaN(valorAnticipo) && !isNaN(porcentaje)) {
        const resultadoDescuento = payapplication * porcentaje;
        setDctoAnticipo(resultadoDescuento);
      } else {
        setDctoAnticipo(0);
      }
    };

    descuentoAnticipo();
  }, [anticipo, porcentajedsctoAnticipo, payapplication]); 

  // calculo descuento Retenciones
  useEffect(() => {
    const porcentajeDsctoRetenciones = () => {
      const valorRetenciones = Number(retenciones);
      const porcentajeDsctoRet =
        parseFloat(porcentajeDctoRetenciones.replace("%", "")) / 100;
      if (!isNaN(valorRetenciones) && !isNaN(porcentajeDsctoRet)) {
        const resultadoDescuentoRetenciones =
          porcentajeDsctoRet * payapplication;
        setRetenciones(resultadoDescuentoRetenciones);
      } else {
        setRetenciones(0);
      }
    };

    porcentajeDsctoRetenciones();
  }, [payapplication, porcentajeDctoRetenciones, setRetenciones, retenciones]);

  // calculo Monto final de la factura
  useEffect(() => {
    const calculoFinalFactura = () => {
      const calculoEEPP = payapplication;


      const calculodescuentos = dsctoAnticipo + retenciones;
      const calculoFacturaFinal = calculoEEPP - calculodescuentos;

      setTotalInvoices(calculoFacturaFinal);
    };
    calculoFinalFactura();
  }, [
    payapplication,
    totalInvoices,
    dsctoAnticipo,
    retenciones,
    setTotalInvoices,
  ]);

  const closeModel = () => setIsModalOpenBudget(false);
  return (
    <div className=" ">
      <Modal className="" isOpen={isModalOpenBudget}>
        <h1 className="text-2xl font-blod mb-2 text-white">
          {isEditMode ? "Modo Editar" : "Modo Crear"}
        </h1>
        <form className="" onSubmit={handleSubmit}>
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
              <div className="flex gap-2 ">
                <div className="">
                  <label className="text-lg text-white font-bolt mb-2  ">
                    Familia
                  </label>
                  <select
                    className="text-lg  font-bolt   bg-slate-700 rounded-lg mb-2 mt-2 flex mr-2 p-2 text-white border-solid border-4 border-gray-500"
                    name="family"
                    value={family}
                    onChange={(e) => setFamily(e.target.value)}>
                    <option value="Subcontrato">Subcontrato</option>
                  </select>
                </div>
                <div className="">
                  <label className="text-lg text-white font-bolt mb-2 ">
                    Subcontrato
                  </label>
                  <select
                    className=" bg-slate-700 rounded-lg mb-2 mt-2 flex mr-2 p-2 text-white border-solid border-4 border-gray-500 w-full"
                    type="text"
                    name="SubcontractorOffers "
                    value={subfamily}
                    onChange={(e) => setSubfamily(e.target.value)}>
                    <option value="">Selecionar una Subcontrato</option>
                    <option value="Subcontrato_Fierro">
                      Subcontrato_Fierro
                    </option>
                    <option value="Subcontrato_Socalzado">
                      Subcontrato_Socalzado
                    </option>
                    <option value="Subcontrato_Instalacion_Moldaje">
                      Subcontrato_Instalacion_Moldaje
                    </option>
                    <option value="Subcontrato_Instalacion_Tabiques">
                      Subcontrato_Instalacion_Tabiques
                    </option>
                    <option value="Subcontrato_Fierro">
                      Subcontrato_Instalaciones_Electricas
                    </option>
                    <option value="Subcontrato_Movimiento_Tierra">
                      Subcontrato_Movimiento_Tierra
                    </option>
                    <option value="Subcontrato_Muebles">
                      Subcontrato_Muebles
                    </option>
                    <option value="Subcontrato_Papel_mural_revestimiento">
                      Subcontrato_Papel_mural_revestimiento
                    </option>
                    <option value="Subcontrato_Pavimentos_Ceramicas">
                      Subcontrato_Pavimentos_Ceramicas
                    </option>
                    <option value="Subcontrato_Techumbre">
                      Subcontrato_Techumbre
                    </option>
                    <option value="Subcontrato_Terminaciones">
                      Subcontrato_Terminaciones
                    </option>
                    <option value="Subcontrato_Ventanas">
                      Subcontrato_Ventanas
                    </option>
                    <option value="Subcontrato_puertas_cerraduras">
                      Subcontrato_puertas_cerraduras
                    </option>
                  </select>
                </div>
              </div>
            </div>
          </div>
          <div className="">
            <label className="text-lg text-white font-bolt mb-2 ">
              Nombre Subcontrato
            </label>
            <input
              className=" bg-slate-700 rounded-lg mb-2 mt-2 flex mr-2 p-2 text-white border-solid border-4 border-gray-500 w-full"
              placeholder="subcontrato"
              type="text"
              name="SubcontractorOffers "
              value={subcontractorOffers}
              onChange={(e) => setSubcontractorsOffers(e.target.value)}
            />
          </div>

          <div className="">
            <label className="text-lg text-white font-bolt mb-2  ">
              Monto Anticipo
            </label>
            <input
              className="  bg-slate-700 rounded-lg mb-2 mt-2 flex mr-2 p-2 text-white border-solid border-4 border-gray-500"
              placeholder="Monto Anticipo"
              type="number"
              name="type"
              value={anticipo}
              onChange={(e) => setAnticipo(e.target.value || "")}
            />
          </div>

          <div className="flex justify-between">
            <div className="">
              <label className="text-lg text-white font-bolt mb-2  ">
                Fecha
              </label>
              <input
                className="  bg-slate-700 rounded-lg mb-2 mt-2 flex mr-2 p-2 text-white border-solid border-4 border-gray-500"
                placeholder="Fecha"
                type="date"
                name="type"
                value={datePayApplication}
                onChange={(e) => setDatePayApplication(e.target.value)}
              />
            </div>
            <div className="ml-2">
              <label className="text-lg text-white font-bolt mb-2 ">
                N° Factura
              </label>
              <input
                className=" bg-slate-700 rounded-lg mb-2 mt-2 flex  mr-2 p-2 text-white border-solid border-4 border-gray-500 w-full"
                placeholder="factura"
                type="text"
                name="invoice"
                value={invoices}
                onChange={(e) => setInvoices(e.target.value || "")}
              />
            </div>
            <div className="ml-2">
              <label className="text-lg text-white font-bolt mb-2 ">
                Estado de Pago Numero
              </label>
              <input
                className=" bg-slate-700 rounded-lg mb-2 mt-2 flex mr-2 p-2 text-white border-solid border-4 border-gray-500 w-full"
                placeholder="Description"
                type="text"
                name="description"
                value={numberpayapplication}
                onChange={(e) => setNumberPayApplication(e.target.value || "")}
              />
            </div>
          </div>

          <div className="">
            <label className="text-lg text-white font-bolt mb-2 ">
              Monto EEPP
            </label>
            <input
              className=" bg-slate-700 rounded-lg mb-2 mt-2 flex mr-2 p-2 text-white border-solid border-4 border-gray-500  w-full"
              placeholder="Monto EEPP"
              type="number"
              name="payapplicationqty"
              value={payapplication}
              onChange={(e) => setPayApplication(e.target.value || "")}
            />
          </div>
          <div className="flex justify-between">
            <div>
              <label className="text-lg text-white font-bolt mb-2">%</label>
              <select
                className=" bg-slate-700 rounded-lg mb-2 mt-2 flex  mr-2 p-2 text-white border-solid border-4 border-gray-500 w-full "
                placeholder="Anticipo"
                type="number"
                name="unit"
                value={porcentajedsctoAnticipo}
                onChange={(e) =>
                  setPorcentajedsctoAnticipo(e.target.value || "")
                }>
                <option value="0%">0%</option>
                <option value="5%">5%</option>
                <option value="10%">10%</option>
                <option value="15%">15%</option>
              </select>
            </div>
            <div>
              <label className="text-lg text-white font-bolt mb-2 ">
                dcto Anticipo
              </label>
              <input
                className=" bg-slate-700 rounded-lg mb-2 mt-2 flex  mr-2 p-2 text-white border-solid border-4 border-gray-500 w-full "
                placeholder="Anticipo"
                type="number"
                name="unit"
                value={dsctoAnticipo}
                onChange={(e) => setDctoAnticipo(e.target.value || "")}
              />
            </div>

            <div>
              <label className="text-lg text-white font-bolt mb-2 ">%</label>
              <select
                className=" bg-slate-700 rounded-lg mb-2 mt-2 flex  mr-2 p-2 text-white border-solid border-4 border-gray-500 w-full "
                placeholder="retenciones"
                type="number"
                name="unit"
                value={porcentajeDctoRetenciones}
                onChange={(e) =>
                  setPorcentajeDctoRetenciones(e.target.value || "")
                }>
                <option value="0%">0%</option>
                <option value="5%">5%</option>
                <option value="10%">10%</option>
                <option value="15%">15%</option>
              </select>
            </div>
            <div>
              <label className="text-lg text-white font-bolt mb-2 ">
                Retenciones
              </label>
              <input
                className=" bg-slate-700 rounded-lg mb-2 mt-2 flex  mr-2 p-2 text-white border-solid border-4 border-gray-500 w-full "
                placeholder="retenciones"
                type="number"
                name="unit"
                value={retenciones}
                onChange={(e) => setRetenciones(e.target.value || "")}
              />
            </div>
          </div>

          <div className="">
            <label className="text-lg text-white font-bolt mb-2 ">
              Neto Factura
            </label>
            <input
              className=" bg-slate-700 rounded-lg mb-2 mt-2 flex mr-2  text-white border-solid border-4 border-gray-500 p-2"
              placeholder="Neto Factura"
              type="number"
              name="unitprice "
              value={totalInvoices}
              onChange={(e) => setTotalInvoices(e.target.value || "")}
            />
          </div>
          <div className="">
            <label className="text-lg text-white font-bolt mb-2 ">
              Observacion
            </label>
            <input
              className=" bg-slate-700 rounded-lg mb-2 mt-2 flex mr-2  text-white border-solid border-4 border-gray-500 p-2"
              placeholder="Observacion"
              type="text"
              name="observation"
              value={observations}
              onChange={(e) => setObservations(e.target.value)}
            />
          </div>

          <div className="flex justify-between">
            <button
              className="bg-green-500 font-semibold rounded-xl text-white p-3 mt-2  mb-2"
              type="submit">
              Submit Tasks
            </button>
            <button
              onClick={closeModel}
              className="bg-red-500 rounded-xl text-white font-semibold p-3 mt-2  mb-2">
              Close Form
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default FormPayApplication;
