import Sidebardb from "../component/dashboard/Sidebardb";
import MaterialSheetsControl from "../component/tables/MaterialSheetsControl";
import IdentificationHeader from "../component/tables/IdentificationHeader";
import CarsInformationSheets from "../component/tables/CarsInformationSheets";
import ContractObservations from "../component/tables/ContractObservations";
import IncreasesAndDiscounts from "../component/tables/IncreasesAndDiscounts";
import Invoices from "../component/tables/Invoices";
import PurchaseOrderTable from "../component/tables/PurchaseOrderTable";

const HojadeControl = () => {
  return (
    <div className="flex bg-gradient-to-r from-cyan-700 py-4 w-600 md:w-3/4 xl:w-full">
      <Sidebardb />
      <div>
        <MaterialSheetsControl />
        <IdentificationHeader />
        <CarsInformationSheets />
        <div className="flex">
          <ContractObservations />
          <IncreasesAndDiscounts />
        </div>
        <Invoices />
        <PurchaseOrderTable />
      </div>
    </div>
  );
};

export default HojadeControl;


