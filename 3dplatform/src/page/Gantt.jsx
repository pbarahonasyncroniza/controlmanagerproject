import GanttChart from "../component/charts/GanttChart";
import { Link } from "react-router-dom";


const Gantt = () => {
  return (
    <div className="">
      
      <GanttChart />
      <Link
        className="bg-blue-500 rounded-lg mt-6 px-4 text-xl text-white p-4 absolute left-2 flex gap-2 "
        to={"/dashboard"}>
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
            d="M12 9.75 14.25 12m0 0 2.25 2.25M14.25 12l2.25-2.25M14.25 12 12 14.25m-2.58 4.92-6.374-6.375a1.125 1.125 0 0 1 0-1.59L9.42 4.83c.21-.211.497-.33.795-.33H19.5a2.25 2.25 0 0 1 2.25 2.25v10.5a2.25 2.25 0 0 1-2.25 2.25h-9.284c-.298 0-.585-.119-.795-.33Z"
          />
        </svg>
        Back to Dasboard
      </Link>
    </div>
  );
};

export default Gantt;
