import {
  GanttComponent,
  Inject,
  Edit,
  Toolbar,
  CriticalPath,
  ExcelExport,
  Selection,
} from "@syncfusion/ej2-react-gantt";

import { SwitchComponent } from "@syncfusion/ej2-react-buttons";
import { registerLicense } from "@syncfusion/ej2-base";
import "../../../src/App.css";
import axios from "axios";
import { useEffect, useState } from "react";
import Modal from "../Modal";

registerLicense(
  "Ngo9BigBOggjHTQxAR8/V1NHaF1cWWhIYVJwWmFZfVpgcF9DY1ZQQmY/P1ZhSXxQd0diXn5YdXdUQWhZUkI="
);

function GanttChart() {
  const [taskID, setTaskID] = useState("");
  const [taskname, setTaskname] = useState("");
  const [startdate, setStartdate] = useState("");
  const [duration, setDuration] = useState("");
  const [predecessor, setPredecessor] = useState("");
  const [progress, setProgress] = useState("");
  const [subtask, setSubTask] = useState("");
  const [getTaskData, setGetTaskData] = useState([]);
  const [isModalOpen, setIsMoldalOpen] = useState(false);

  let switchRef;
  function change() {
    const ganttDependencyViewContainer = document.querySelector(
      ".e-gantt-dependency-view-container"
    );
    if (switchRef.checked) {
      ganttDependencyViewContainer.style.visibility = "hidden";
    } else {
      ganttDependencyViewContainer.style.visibility = "visible";
    }
  }
  const taskFields = {
    id: "taskID",
    name: "taskname",
    startDate: "startDate",
    duration: "duration",
    progress: "progress",
    dependency: "predecessor",
    child: "subtasks",
  };
  const editSettings = {
    allowAdding: true,
    allowEditing: true,
    allowDeleting: true,
    allowTaskbarEditing: true,
    showDeleteConfirmDialog: true,
  };

  // const remoteData = new DataManager({
  //   url: "http://localhost:8000/task",
  //   adaptor: new WebApiAdaptor(),
  // });

  const handleOnSubmitTask = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:8000/task", {
        taskID,
        taskname,
        startdate,
        duration,
        predecessor: predecessor || null,
        progress,
        subtask: subtask || null,
      })
      .then((response) => {
        console.log("Respuesta del servidor:", response.data);
        setTaskID("");
        setTaskname("");
        setStartdate("");
        setDuration("");
        setPredecessor("");
        setProgress("");
        setSubTask("");
      })
      .catch((error) => {
        console.error("Error al enviar datos:", error);
      });
  };

  const reloadTaskData = async () => {
    try {
      const dataTaskResponse = await axios.get("http://localhost:8000/task");
      console.log("Respuesta del servidor:", dataTaskResponse);
      if (
        Array.isArray(dataTaskResponse.data.data) &&
        dataTaskResponse.data.data.length > 0
      ) {
        const formatData = dataTaskResponse.data.data.map((item) => ({
          taskID: item.taskID,
          taskname: item.taskname,
          startdate: item.startdate,
          duration: item.duration,
          predecessor: item.predecessor,
          progress: item.progress,
          subtask: item.subtask,
        }));
        setGetTaskData(formatData);
      } else {
        console.error(
          "Respuesta no es un arreglo o está vacío",
          dataTaskResponse.data.data
        );
      }
    } catch (error) {
      console.error("Error en la carga de datos", error);
    }
  };

  useEffect(() => {
    reloadTaskData();
  }, []);

  const openModal = () => setIsMoldalOpen(true);
  const closeModal = () => {
    setIsMoldalOpen(false);
    reloadTaskData();
  };

  let ganttInstance;
  const toolbarOptions = [
    "CriticalPath",
    "Add",
    "Edit",
    "Update",
    "Delete",
    "Cancel",
    "ExpandAll",
    "CollapseAll",
    "Indent",
    "Outdent",
    "ExcelExport",
    "CsvExport",
  ];

  function toolbarClick(args) {
    if (args.item.id === "GanttExport_excelexport") {
      ganttInstance.excelExport();
    } else if (args.item.id === "GanttExport_csvexport") {
      ganttInstance.csvExport();
    }
  }

  return (
    <div>
      <div>
        <label htmlFor="switch">Show/Hide Dependency Line</label>
        <SwitchComponent
          id="switch"
          ref={switchRef}
          checked={false}
          change={change}
        />
      </div>
      <GanttComponent
        id="GanttExport"
        dataSource={getTaskData}
        height="850px"
        toolbar={toolbarOptions}
        toolbarClick={toolbarClick}
        allowExcelExport={true}
        editSettings={editSettings}
        taskFields={taskFields}
        ref={(gantt) => (ganttInstance = gantt)}
        enableCriticalPath={true}>
        <Inject
          services={[Edit, Toolbar, CriticalPath, ExcelExport, Selection]}
        />
      </GanttComponent>
      <button
        onClick={openModal}
        className="flex absolute top-1 right-1 bg-green-500 p-3 text-white rounded-xl text-xl gap-2 ">
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
        </svg>{" "}
        Create new task
      </button>
      <Modal className="mt-5 " isOpen={isModalOpen} onClose={closeModal}>
        <form
          handleSubmit={""}
          className="mt-4 flex flex-col rounded-xl"
          onSubmit={handleOnSubmitTask}>
          <h2 className="text-2xl font-bold text-center ">NEW TASK FORM</h2>
          <div>
            <div>
              <label>Tasks ID</label>
              <input
                className="mt-1 border border-solid bg-blue-300 rounded-xl p-2 w-full mb-2 "
                placeholder="Task ID"
                type="number"
                name="TaskID"
                value={taskID}
                onChange={(e) => setTaskID(e.target.value)}
              />
            </div>
            <label className="">Task Name</label>
            <input
              className="mt-1 border border-solid bg-blue-300 rounded-xl p-2 w-full mb-2 "
              placeholder="Task name"
              type="text"
              name="TaskName"
              value={taskname}
              onChange={(e) => setTaskname(e.target.value)}
            />
          </div>
          <div>
            <label>Start Date</label>
            <input
              className="mt-1 border border-solid bg-blue-300 rounded-xl p-2 w-full mb-2"
              placeholder="Start date"
              type="date"
              name="StartDate"
              value={startdate}
              onChange={(e) => setStartdate(e.target.value)}
            />
          </div>
          <div>
            <label>Duration</label>
            <input
              className="mt-1 border border-solid bg-blue-300 rounded-xl p-2 w-full mb-2 "
              type="number"
              placeholder="Duration"
              name="Duration"
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
            />
          </div>
          <div>
            <label>Progress</label>
            <input
              className="mt-1 border border-solid bg-blue-300 rounded-xl p-2 w-full mb-2 "
              placeholder="Progress"
              type="number"
              name="Progress"
              value={progress}
              onChange={(e) => setProgress(e.target.value)}
            />
          </div>
          <div>
            <label>Predecessor</label>
            <input
              className="mt-1 border border-solid bg-blue-300 rounded-xl p-2 w-full mb-2 "
              placeholder="Progress"
              type="text"
              name="predecessor"
              value={predecessor}
              onChange={(e) => setPredecessor(e.target.value)}
            />
          </div>
          <div>
            <label>Subtask</label>
            <input
              className="mt-1 border border-solid bg-blue-300 rounded-xl p-2 w-full  mb-2"
              placeholder="Progress"
              type="text"
              name="subtask"
              value={subtask}
              onChange={(e) => setSubTask(e.target.value)}
            />
          </div>
          <button className="bg-blue-500 rounded-xl text-white p-3 mt-2 mb-2">
            Submit Tasks
          </button>
          <button
            onClick={closeModal}
            className="bg-blue-500 p-3 rounded-xl text-white mt-2">
            Close Form
          </button>
        </form>
      </Modal>
    </div>
  );
}

export default GanttChart;
