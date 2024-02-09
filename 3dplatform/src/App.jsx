import IFCViewer from "./component/ifcviewer/IFCViewer";
import SideBar from "./component/SideBar";
// import Gantt from "./page/Gantt";
import ControlSheet from "./page/ControlSheet";
import Dashboard from "./page/Dashboard";
import LaborCostControl from "./page/LaborCostControl";
import ViewerProvider from "./component/Context";
import HojadeControl from "./page/HojadeControl";
import InvicesMasterTable from "./component/tables/InvicesMasterTable";
import ProjectData from "./page/ProjectData";

import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <ViewerProvider>
        <Routes>
          <Route
            path="/ifcviewer"
            element={
              <div className="flex h-min-screen">
                <SideBar />
                <IFCViewer />
              </div>
            }
          />
          <Route path="/dashboard" element={<Dashboard />} />
          {/* <Route path="/gantt" element={<Gantt />} /> */}
          <Route path="/" element={<ControlSheet />} />
          <Route path="/Manodeobra" element={<LaborCostControl />} />
          <Route path="hojadecontrol" element={<HojadeControl />} />
          <Route path="masterfacturas" element={<InvicesMasterTable />} />
          <Route path="oc" element={<ProjectData />} />
        </Routes>
      </ViewerProvider>
    </BrowserRouter>
  );
}

export default App;
