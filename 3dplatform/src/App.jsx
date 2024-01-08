import IFCViewer from "./component/ifcviewer/IFCViewer";
import SideBar from "./component/SideBar";
import Gantt from "./page/Gantt";
import ControlSheet from "./page/ControlSheet";
import ViewerProvider from "./component/Context";
import Dashboard from "./page/Dashboard";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <ViewerProvider>
        <Routes>
          <Route
            path="/"
            element={
              <div className="flex h-min-screen">
                <SideBar />
                <IFCViewer />
              </div>
            }
          />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/gantt" element={<Gantt />} />
          <Route path="/controlsheet" element={<ControlSheet />} />
        </Routes>
      </ViewerProvider>
    </BrowserRouter>
  );
}

export default App;
