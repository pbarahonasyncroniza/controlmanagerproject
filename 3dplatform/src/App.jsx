import IFCViewer from "./component/ifcviewer/IFCViewer";
import SideBar from "./component/SideBar";
// import Gantt from "./page/Gantt";
import ControlSheet from "./page/ControlSheet";
import Dashboard from "./page/Dashboard";
import LaborCostControl from "./page/LaborCostControl";
import ViewerProvider from "./component/Context";
import HojadeControl from "./page/HojadeControl";
import InvicesMasterTable from "./component/tables/InvicesMasterTable";
import MainPurchaseOrdes from "./page/MainPurchaseOrdes";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import PayApplication from "./page/PayApplication";
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
          <Route path="oc" element={<MainPurchaseOrdes />} />
          <Route path="eepp" element={<PayApplication />} />
        </Routes>
      </ViewerProvider>
    </BrowserRouter>
  );
}

export default App;
