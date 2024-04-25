import { useContext, useEffect } from "react";
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
    isModalOpenContract,
    isEditMode,
    setIsEditMode,
    setIsModalOpenContract,
    glosa,
    setGlosa,
    proyectado,
    setProyectado,
    data,
    currentContractId,
  } = useContext(ViewerContext);
  console.log("🚀 ~ FormContractObservation ~ data:", data);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const contractObservationData = {
      projectId: projectId || undefined,
      family: family || undefined,
      subfamily: subfamily || undefined,
      Descripcion: description || undefined,
      Proyectado: proyectado || undefined,
      Glosa: glosa || undefined,
    };

    try {
      if (isEditMode) {
        resetForm();
        await axios.patch(
          `http://localhost:8000/contract/${currentContractId}`,
          contractObservationData
        );
      } else {
        await axios.post(
          "http://localhost:8000/contract",
          contractObservationData
        );
      }
      closeModelContrat();
    } catch (err) {
      console.error("Error submit Observation Contract", err);
    }
  };

  useEffect(() => {
    if (isEditMode) {
      setGlosa(data.Glosa || "");
      setDescription(data.Descripcion || "");
      setProyectado(data.Proyectado || "");
    }
  }, [isEditMode, data]);

  const resetForm = () => {
    setProjectId("");
    setFamily("");
    setSubfamily("");
    setDescription("");
    setGlosa("");
    setProyectado("");
  };

  const closeModelContrat = () => {
    setIsModalOpenContract(false);
    if (isEditMode) {
      resetForm();
      setIsEditMode(false);
    }
  };

  return (
    <div>
      <Modal isOpen={isModalOpenContract}>
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
                    name="projectId"
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
                    name="family"
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
                name="subfamily"
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

            <label className="text-lg text-white font-bolt mb-2 ">glosa</label>
            <input
              className="bg-slate-700 rounded-lg mb-2 mt-2 flex mr-2 p-2 text-white border-solid border-4 border-gray-500"
              placeholder="glosa"
              type="text"
              name="glosa"
              value={glosa}
              onChange={(e) => setGlosa(e.target.value)}
            />

            <label className="text-lg text-white font-bolt mb-2 ">
              descripcion
              <input
                className="bg-slate-700 rounded-lg mb-2 mt-2 flex mr-2 p-2 text-white border-solid border-4 border-gray-500"
                placeholder="description"
                name="description"
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </label>
              <label className="text-lg text-white font-bolt mb-2 ">
                proyectado
            <input
              className="bg-slate-700 rounded-lg mb-2 mt-2 flex mr-2 p-2 text-white border-solid border-4 border-gray-500"
              placeholder="proyectado"
              type="text"
              name="proyectado"
              value={proyectado}
              onChange={(e) => setProyectado(e.target.value)}
              />
              </label>
            <div className="flex justify-between">
              <button
                className="bg-green-500 font-semibold rounded-xl text-white p-3 mt-2  mb-2"
                type="submit">
                Submit Tasks
              </button>
              <button
                onClick={closeModelContrat}
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
