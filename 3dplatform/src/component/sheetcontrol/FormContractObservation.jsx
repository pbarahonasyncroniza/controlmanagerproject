import { useContext, useState } from "react";
import Modal from "../Modal";
import axios from "axios";
import { ViewerContext } from "../Context";

const FormContractObservation = () => {
  const {
    projectId,
    setProjectId,
    family,
    setFamily,
    subfamily,
    setSubfamily,
    setDescription,
    description,
    isModalOpenBudget,
    isEditMode,
    setIsModalOpenBudget,
  } = useContext(ViewerContext);

  const [proyectado, setProyectado] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const contractObservationData = {
      projectId: projectId || undefined,
      family: family || undefined,
      subfamily: subfamily || undefined,
      description: description || undefined,
      proyectado: proyectado || undefined,
    };

    try {
      if (isEditMode) {
        resetForm();
        await axios.patch(
          "http://localhost:8000/contract",
          contractObservationData
        );
      } else {
        await axios.post(
          "http://localhost:8000/contract",
          contractObservationData
        );
      }
      closeModelBudget();
    } catch (err) {
      console.error("Error submit Observation Contract", err);
    }
  };

  const resetForm = () => {
    projectId("");
    family("");
    subfamily("");
    description("");
    proyectado("");
  };

  const closeModelBudget = () => {
    setIsModalOpenBudget(false);
    if (isEditMode) {
      resetForm();
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
                </label>

                <input
                  className="bg-slate-700 rounded-lg mb-2 mt-2 flex mr-2 p-2 text-white border-solid border-4 border-gray-500"
                  placeholder="ProjectId"
                  type="text"
                  value={projectId}
                  onChange={(e) => setProjectId(e.target.value)}
                />
              </div>
              <div>
                <label className="text-lg text-white font-bolt mb-2 ">
                  family
                </label>
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
              </div>
            </div>

            <label className="text-lg text-white font-bolt mb-2 ">
              subfamily
            </label>
            <input
              className="bg-slate-700 rounded-lg mb-2 mt-2 flex mr-2 p-2 text-white border-solid border-4 border-gray-500"
              placeholder="subfamilia"
              type="text"
              value={subfamily}
              onChange={(e) => setSubfamily(e.target.value)}
            />
            <label className="text-lg text-white font-bolt mb-2 ">glosa</label>
            <input
              className="bg-slate-700 rounded-lg mb-2 mt-2 flex mr-2 p-2 text-white border-solid border-4 border-gray-500"
              placeholder="glosa"
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            <label className="text-lg text-white font-bolt mb-2 ">
              proyectado
            </label>
            <input
              className="bg-slate-700 rounded-lg mb-2 mt-2 flex mr-2 p-2 text-white border-solid border-4 border-gray-500"
              placeholder="proyectado"
              type="text"
              value={proyectado}
              onChange={(e) => setProyectado(e.target.value)}
            />
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
};

export default FormContractObservation;
