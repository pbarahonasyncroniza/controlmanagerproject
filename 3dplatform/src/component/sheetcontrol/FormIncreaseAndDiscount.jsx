import { useContext, useState } from "react";
import Modal from "../Modal";
import axios from "axios";
import { ViewerContext } from "../Context";

function FormIncreaseAndDiscount() {
  const {
    projectId,
    setProjectId,
    family,
    setFamily,
    subfamily,
    setSubfamily,
    isModalOpenBudget,
    isEditMode,
    setIsModalOpenBudget,
    setIsEditMode,
    currentIdIncreaseDiscount,
  } = useContext(ViewerContext);
  const [detalle, setDetalle] = useState("");
  const [aumentodisminucion, setAumentoDisminucion] = useState("");
  const [real, setReal] = useState("");
  const [recuperable, setRecuperable] = useState("");
  const [observaciones, setObservaciones] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const increaseAndDiscountData = {
      projectId: projectId || undefined,
      family: family || undefined,
      subfamily: subfamily || undefined,
      Detalle: detalle || undefined,
      Aumentodisminucion: aumentodisminucion || undefined,
      Real: real || undefined,
      Recuperable: recuperable || undefined,
      Observaciones: observaciones || undefined,
    };

    try {
      if (isEditMode) {
        resetForm();
        await axios.patch(
          `http://localhost:8000/increasediscount/${currentIdIncreaseDiscount}`,
          increaseAndDiscountData
        );
      } else {
        await axios.post(
          "http://localhost:8000/increasediscount",
          increaseAndDiscountData
        );
      }
      closeModelBudget();
    } catch (err) {
      console.error("Error submit Observation Contract", err);
    }
  };
  const resetForm = () => {
    setProjectId("");
    setFamily("");
    setSubfamily("");
  };

  const closeModelBudget = () => {
    setIsModalOpenBudget(false);
    if (isEditMode) {
      resetForm();
      setIsEditMode(false);
    }
  };

  return (
    <div>
      <Modal isOpen={isModalOpenBudget}>
        <h1 className="text-2xl font-blod mb-2 text-white">
          {isEditMode ? "Modo Editar" : "Modo Crear"}
        </h1>
        <div className="bg-slate-900 ">
          <form onSubmit={handleSubmit}>
            <div className="flex">
              <div>
                <label className="text-lg text-white font-bolt mb-2 ">
                  ProjectId
                  <select
                    className="bg-slate-700 rounded-lg mb-2 mt-2 flex mr-2 p-2 text-white border-solid border-4 border-gray-500"
                    placeholder="ProjectId"
                    type="text"
                    value={projectId}
                    onChange={(e) => setProjectId(e.target.value)}>
                    <option value="PT-101">PT-101</option>
                    <option value="TR-222">TR-222</option>
                  </select>
                </label>
              </div>
              <div>
                <label className="text-lg text-white font-bolt mb-2 ">
                  family
                  <select
                    className="bg-slate-700 rounded-lg mb-2 mt-2 flex mr-2 p-2 text-white border-solid border-4 border-gray-500"
                    placeholder="familia"
                    type="text"
                    value={family}
                    onChange={(e) => setFamily(e.target.value)}>
                    <option value="Elegir Familia">Elegir Familia</option>
                    <option value="Subcontrato">Subcontrato</option>
                    <option value="Material">Material</option>
                    <option value="Arriendos">Arriendos</option>
                    <option value="Mano_Obra">Mano_Obra</option>
                    <option value="Otros">Otros</option>
                    <option value="GG">GG</option>
                  </select>
                </label>
              </div>
            </div>

            <label className="text-lg text-white font-bolt mb-2 ">
              subfamily
              <select
                className="bg-slate-700 rounded-lg mb-2 mt-2 flex mr-2 p-2 text-white border-solid border-4 border-gray-500"
                placeholder="subfamilia"
                type="text"
                value={subfamily}
                onChange={(e) => setSubfamily(e.target.value)}>
                {" "}
                <option value="Elegir Familia">Elegir SubFamilia</option>
                <option value="Arriendo_Moldaje">Arriendo_Moldaje</option>
                <option value="Fierro">Fierro</option>
                <option value="Hormigones">Hormigones</option>
                <option value="Mano_Obra">Mano_Obra</option>
                <option value="Subcontrato_Tabiqueria">
                  Subcontrato_Tabiqueria
                </option>
                <option value="GG">GG</option>
              </select>
            </label>
            <label className="text-lg text-white font-bolt mb-2 ">
              Detalle
              <input
                className="bg-slate-700 rounded-lg mb-2 mt-2 flex mr-2 p-2 text-white border-solid border-4 border-gray-500"
                placeholder="detalle"
                type="text"
                value={detalle}
                onChange={(e) => setDetalle(e.target.value)}
              />
            </label>

            <label className="text-lg text-white font-bolt mb-2 ">
              Aumento/Disminucion
              <select
                className="bg-slate-700 rounded-lg mb-2 mt-2 flex mr-2 p-2 text-white border-solid border-4 border-gray-500"
                placeholder="aumentodisminucion"
                type="text"
                name="aumentodisminucion"
                value={aumentodisminucion}
                onChange={(e) => setAumentoDisminucion(e.target.value)}>
                <option value="Aumento">Aumento</option>
                <option value="Disminucion">Disminucion</option>
              </select>
              <label className="text-lg text-white font-bolt mb-2 ">Real</label>
              <input
                className="bg-slate-700 rounded-lg mb-2 mt-2 flex mr-2 p-2 text-white border-solid border-4 border-gray-500"
                placeholder="real"
                type="text"
                value={real}
                onChange={(e) => setReal(e.target.value)}
              />
            </label>
            <label className="text-lg text-white font-bolt mb-2 ">
              Recuperable
            </label>
            <input
              className="bg-slate-700 rounded-lg mb-2 mt-2 flex mr-2 p-2 text-white border-solid border-4 border-gray-500"
              placeholder="recuperable"
              type="text"
              name="recuperable"
              value={recuperable}
              onChange={(e) => setRecuperable(e.target.value)}
            />
            <label className="text-lg text-white font-bolt mb-2 ">
              Observaciones
              <input
                className="bg-slate-700 rounded-lg mb-2 mt-2 flex mr-2 p-2 text-white border-solid border-4 border-gray-500"
                placeholder="observaciones"
                name="observaciones"
                type="text"
                value={observaciones}
                onChange={(e) => setObservaciones(e.target.value)}
              />
            </label>
            <div className="flex justify-between">
              <button
                className="bg-green-500 font-semibold rounded-xl text-white p-3 mt-2  mb-2"
                type="submit">
                Submit Tasks
              </button>
              <button
                onClick={closeModelBudget}
                className="bg-red-500 rounded-xl text-white font-semibold p-3 mt-2  mb-2">
                Close Form
              </button>
            </div>
          </form>
        </div>
      </Modal>
    </div>
  );
}

export default FormIncreaseAndDiscount;
