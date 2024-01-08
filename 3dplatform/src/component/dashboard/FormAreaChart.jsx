import { useState } from "react";
import axios from "axios";
import Modal from "../Modal";

const FormAreaChart = () => {
  // const [projectName, setProjectName] = useState("");
  const [date, setDate] = useState("");
  const [planValue, setPlanValue] = useState("");
  const [earnValue, setEarnValue] = useState("");
  // const [actualCost, setActualCost] = useState("");
  const [isModalOpen, setIsMoldalOpen] = useState(false);

  const handleOnSubmit = (e) => {
    e.preventDefault();

    axios
      .post("http://localhost:8000/admin", {
        date,
        planValue,
        earnValue,
      })
      .then((response) => {
        console.log("Respuesta del servidor:", response.data);
        setDate("");
        setPlanValue("");
        setEarnValue("");
      })
      .catch((error) => {
        console.error("Error al enviar datos:", error);
      });
  };

  const openModal = () => setIsMoldalOpen(true);
  const closeModal = () => setIsMoldalOpen(false);

  return (
    <div className="flex">
      <div className="mt-4 ml-4 ">
       
        <button
          onClick={openModal}
          className="flex  bg-green-500 p-3 text-white rounded-xl text-xl gap-2 absolute top-40 ">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            dataSlot="icon"
            className="w-6 h-6">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 4.5v15m7.5-7.5h-15"
            />
          </svg>
          Create new input
        </button>
        <Modal isOpen={isModalOpen} onClose={closeModal}>
          <form className="mt-4 flex flex-col rounded-xl"onSubmit={handleOnSubmit}>
            <h2 className="text-center text-2xl font-bold">Create new Data</h2>
            <div>
              {/* <div>
            <label>Project Name</label>
            <input
              className="ml-4 mt-3 border border-solid bg-blue-300 rounded-xl p-2"
              placeholder="Project name"
              type="text"
              name="date"
              value={projectName}
              onChange={(e) => setProjectName(e.target.value)}
            />
            </div> */}
              <label>Date</label>
              <input
                className="mt-1 border border-solid bg-blue-300 rounded-xl p-2 w-full mb-2"
                placeholder="date"
                type="date"
                name="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
            </div>
            <div>
              <label>PV</label>
              <input
                className="mt-1 border border-solid bg-blue-300 rounded-xl p-2 w-full mb-2"
                type="text"
                name="pv"
                value={planValue}
                onChange={(e) => setPlanValue(e.target.value)}
              />
            </div>
            <div>
              <label>EV</label>
              <input
                className="mt-1 border border-solid bg-blue-300 rounded-xl p-2 w-full mb-2"
                type="text"
                name="EV"
                value={earnValue}
                onChange={(e) => setEarnValue(e.target.value)}
              />
            </div>
            {/* <div>
            <label>AC</label>
            <input
              className="ml-4 mt-3 bg-blue-300 rounded-xl p-2"
              type="text"
              name="AC"
              value={actualCost}
              onChange={(e) => setActualCost(e.target.value)}
            />
          </div> */}
            <button className="bg-blue-500 rounded-xl text-white p-3 mt-2">
              Submit
            </button>
            <button
              onClick={closeModal}
              className="bg-blue-500 p-3 rounded-xl text-white mt-2">
              Close Form
            </button>
          </form>
        </Modal>
      </div>
    </div>
  );
};

export default FormAreaChart;
