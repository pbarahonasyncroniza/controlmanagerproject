import Sidebardb from "../component/dashboard/Sidebardb";
import CarsInformationGeneralProgress from "../component/tables/CarsInformationGeneralProgress";
import EarnValeuManagementTable from "../component/tables/EarnValeuManagementTable";
import { Link, Outlet } from "react-router-dom";

function Informegerencial() {
  return (
    <div className="flex">
      <Sidebardb />
      <div>
        <div className="grid grid-cols-5">
          <Link to={"/informe/informeHC"}>
            <h1 className="flex justify-center ml-6 mt-6 bg-blue-500 rounded-xl p-2 text-white">
              INFORME HOJAS DE CONTROL
            </h1>
          </Link>
          <Link to={"/informe/informeFacturas"}>
            <h1 className="flex justify-center ml-6 mt-6 bg-blue-500 rounded-xl p-2 text-white">
              INFORME FACTURAS
            </h1>
          </Link>
          <Link to={"/informe/informeOC"}>
            <h1 className="flex justify-center ml-6 mt-6 bg-blue-500 rounded-xl p-2 text-white">
              INFORME ORDENES DE COMPRA
            </h1>
          </Link>
          <Link to={"/informe/estadoResultado"}>
            <h1 className="flex justify-center ml-6 mt-6 bg-blue-500 rounded-xl p-2 text-white">
              ESTADO RESULTADO
            </h1>
          </Link>
          <Link to={"/informe/dispobible"}>
            <h1 className="flex justify-center ml-6 mt-6 mr-2 bg-blue-500 rounded-xl p-2 text-white">
              DISPONIBLE
            </h1>
          </Link>
        </div>
        <Outlet />
     
         <CarsInformationGeneralProgress />
        <EarnValeuManagementTable /> 
      </div>
    </div>
  );
}

export default Informegerencial;
