import { useContext } from "react";
import * as OBC from "openbim-components";
import { ViewerContext } from "../Context";

const IFCLoader = () => {
  const { viewer, updateIfcLoader } = useContext(ViewerContext);

  const uploadFile = () => {
    const IfcLoader = new OBC.FragmentIfcLoader(viewer);
    updateIfcLoader(IfcLoader);

    const Toolbar = new OBC.Toolbar(viewer, {
      name: "Main Toolbar",
      position: "bottom",
    });
    viewer.ui.addToolbar(Toolbar);
    const ifcButton = IfcLoader.uiElement.get("main");
    Toolbar.addChild(ifcButton);
  };

  return (
    <div className="bg-gray-500">
      <button className="flex mt-4 gap-2" onClick={uploadFile}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6 gap-2">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9 8.25H7.5a2.25 2.25 0 00-2.25 2.25v9a2.25 2.25 0 002.25 2.25h9a2.25 2.25 0 002.25-2.25v-9a2.25 2.25 0 00-2.25-2.25H15M9 12l3 3m0 0l3-3m-3 3V2.25"
          />
        </svg>
        load
      </button>
    </div>
  );
};

export default IFCLoader;
