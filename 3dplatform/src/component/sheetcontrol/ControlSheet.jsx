import { useState, useContext } from "react";
import axios from "axios";
import Modal from "../Modal";
import { ViewerContext } from "../Context";

const ControlSheet = () => {
  const { isModalOpen, setIsMoldalOpen: updateModalOpen } =
    useContext(ViewerContext);

  const [projectId, setProjectId] = useState("");
  const [projectName, setProjectName] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  // const [isModalOpen, setIsMoldalOpen] = useState(false);

  // const openModal = () => setIsMoldalOpen(true);
  const closeModal = () => updateModalOpen(false);

  const handleUpdateProject = (e) => {
    e.preventDefault();

    axios.post("http://localhost:8000/project", {
      projectId: projectId,
      projectName: projectName,
      startDate: startDate,
      endDate: endDate,
    });
  };

  return (
    <div className="">
      <div className="">
        <div className=""></div>
        <Modal isOpen={isModalOpen}>
          <form onSubmit={handleUpdateProject}>
            <div className="   ">
              <h1 className="text-white text-xl">Crear Nuevo Projecto</h1>
              <div className=" ">
                <div className="">
                  <label className="text-lg font-semibolt ml-4 ">
                    ProjectId
                    <input
                      className="mt-1 border border-solid bg-blue-500 rounded-xl p-2 mb-2 flex  mr-2 ml-2 text-white"
                      placeholder="ProjectId"
                      type="text"
                      name="projectId"
                      value={projectId}
                      onChange={(e) => setProjectId(e.target.value)}
                    />
                  </label>
                </div>
                <div className="">
                  <label className="text-xl font-semibolt ml-4 ">
                    Project Name
                    <input
                      className="mt-1 border border-solid bg-blue-500 rounded-xl p-2 mb-2 flex  mr-2 ml-2 text-white"
                      placeholder="Project name"
                      type="text"
                      name="projectname"
                      value={projectName}
                      onChange={(e) => setProjectName(e.target.value)}
                    />
                  </label>
                </div>
                <div>
                  <label className="text-xl font-semibolt mr-4 ml-4">
                    Start Date
                  <input
                    className="mt-1 border border-solid bg-blue-500 text-white rounded-xl p-2 mb-2 flex  ml-2"
                    placeholder="Project name"
                    type="date"
                    name="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    />
                    </label>

                  <div>
                    <label className="text-xl font-semibolt mr-4 ml-4">
                      End Date
                    <input
                      className="mt-1 border border-solid bg-blue-500 text-white rounded-xl p-2 mb-2 flex  ml-2"
                      placeholder="End name"
                      type="date"
                      name="date"
                      value={endDate}
                      onChange={(e) => setEndDate(e.target.value)}
                      />
                      </label>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex justify-between">
              <button
                className="bg-green-500 rounded-lg text-white p-1 mt-2  mb-2"
                type="submit">
                Submit Tasks
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  closeModal();
                }}
                className="bg-red-500 rounded-xl text-white p-2 mt-2  mb-2">
                Close Form
              </button>
            </div>
          </form>
        </Modal>
      </div>
    </div>
  );
};

export default ControlSheet;
