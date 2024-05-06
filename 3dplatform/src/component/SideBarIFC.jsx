import IFCTree from "./ifcviewer/IFCTree";
import PlantsComponent from "./ifcviewer/PlantsComponent";
import FragmentHider from "./ifcviewer/FragmentHider";
import SimpliClipper from "./ifcviewer/SimpliClipper";
import Dimensions from "./ifcviewer/Dimensions";
import { Link } from "react-router-dom";

const SideBar = () => {
  return (
    <div className="bg-slate-500">
      <nav className="text-2xl mr-20 text-white ">
        ConstructionProject
        <IFCTree />
        <FragmentHider />
        <SimpliClipper />
        <Dimensions />
        <PlantsComponent />
        <Link className="ml-2 flex mt-2 mr-2 gap-2" to={"/"}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25"
            />
          </svg>
          Volve a Panel Central 
        </Link>
      </nav>
    </div>
  );
};

export default SideBar;
