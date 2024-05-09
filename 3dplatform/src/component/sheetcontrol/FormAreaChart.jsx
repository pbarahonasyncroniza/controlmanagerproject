import { useState, useContext } from "react";
import { ViewerContext } from "../Context";
import axios from "axios";
import Modal from "../Modal";

const FormAreaChart = () => {
  const {
    projectId,
    setProjectId,
    isModalOpenProgress,
    setIsModalOpenProgress,
    currentProgressId,
    isEditMode,
  } = useContext(ViewerContext);
  const [dateStart, setDateStart] = useState("");
  const [finishdate, setFinishDate] = useState("");
  const [planValue, setPlanValue] = useState("");
  const [earnValue, setEarnValue] = useState("");
  const [actualCost, setActualCost] = useState("");
  const [week, setWeek] = useState("");

  const handleOnSubmit = async (e) => {
    e.preventDefault();

    const progressData = {
      projectId: projectId || undefined,
      week: week || undefined,
      dateStart: dateStart || undefined,
      finishdate: finishdate || undefined,
      planValue: planValue || undefined,
      earnValue: earnValue || undefined,
      actualCost: actualCost || undefined,
    };

    try {
      if (isEditMode) {
        resetForm();
        await axios.patch(
          `http://localhost:8000/progress/${currentProgressId}`,
          progressData
        );
      } else {
        await axios.post("http://localhost:8000/progress/", progressData);
      }
      closeModal();
    } catch (err) {
      console.error("Error submit Observation Contract", err);
    }
  };
  const resetForm = () => {
    setProjectId("");
  };
  const closeModal = () => {
    setProjectId("");
    setWeek("");
    setDateStart("");
    setFinishDate("");
    setPlanValue("");
    setEarnValue(""); 
    setActualCost("");
    setIsModalOpenProgress(false);
  };

  return (
    <div className="flex">
      <div className="mt-4 ml-4 ">
        <Modal isOpen={isModalOpenProgress}>
          <h1 className="text-2xl font-blod mb-2 text-white">
            {isEditMode ? "Modo Editar" : "Modo Crear"}
          </h1>
          <form
            className="mt-4 flex flex-col rounded-xl"
            onSubmit={handleOnSubmit}>
            <h2 className="text-center text-2xl  text-white font-light">
              Add new Data
            </h2>
            <div>
              <div>
                <label className="text-white">
                  ProjectId
                  <input
                    className="mt-1 border border-solid  rounded-xl p-2 w-full mb-2"
                    placeholder="ProjectId"
                    type="text"
                    name="ProjectId"
                    value={projectId}
                    onChange={(e) => setProjectId(e.target.value)}
                    disabled 
                  />
                </label>
                <label className="text-white">
                  Week number
                  <input
                    className="mt-1 border border-solid  rounded-xl p-2 w-full mb-2"
                    placeholder="week number"
                    type="number"
                    name="week"
                    value={week}
                    onChange={(e) => setWeek(e.target.value)}
                    disabled 
                  />
                </label>
              </div>{" "}
              <label className="text-white">
                DateStart
                <input
                  className="mt-1 border  border-solid rounded-xl p-2 w-full mb-2"
                  placeholder="dateStart"
                  type="date"
                  name="dateStart"
                  value={dateStart}
                  onChange={(e) => setDateStart(e.target.value)}
                  disabled 
                />
              </label>
              <label className="text-white">
                FinishDate
                <input
                  className="mt-1 border border-solid rounded-xl p-2 w-full mb-2"
                  type="date"
                  name="date"
                  value={finishdate}
                  onChange={(e) => setFinishDate(e.target.value)}
                  disabled 
                />
              </label>
            </div>
            <div>
              <label className="text-white">
                Valor Planificado
                <input
                  className="mt-1 border border-solid  rounded-xl p-2 w-full mb-2"
                  placeholder="planValue"
                  type="text"
                  name="planValue"
                  value={planValue}
                  onChange={(e) => setPlanValue(e.target.value)}
                  disabled 
                />
              </label>
            </div>
            <div>
              <label className="text-white">
                Valor Ganado
                <input
                  className="mt-1 border border-solid rounded-xl p-2 w-full mb-2"
                  placeholder="earnValue"
                  type="text"
                  name="earnValue"
                  value={earnValue}
                  onChange={(e) => setEarnValue(e.target.value)}
                />
              </label>
            </div>
            <div>
              <label className="text-white">
                Valor Actual
                <input
                  className="mt-1 border border-solid rounded-xl p-2 w-full mb-2"
                  placeholder="valor Actual"
                  type="text"
                  name="actualCost"
                  value={actualCost}
                  onChange={(e) => setActualCost(e.target.value)}
                  disabled 
                />
              </label>
            </div>{" "}
            <button
              className="bg-green-500 rounded-xl text-white p-3 mt-2"
              type="submit">
              Submit
            </button>
            <button
              onClick={closeModal}
              className="bg-red-500 p-3 rounded-xl text-white mt-2">
              Close Form
            </button>
          </form>
        </Modal>
      </div>
    </div>
  );
};

export default FormAreaChart;
