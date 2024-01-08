import { useEffect, useState } from "react";
import axios from "axios";

const ConcreteSC = () => {
 
  const [totalSum, setTotalSum] = useState(0);
  const [getDataSheet, setGetDataSheet] = useState([]);

  
  useEffect(() => {
    const dataSheet = async () => {
      const dataresponseSheet = await axios.get("http://localhost:8000/sheet");
      console.log("responseSheets", dataresponseSheet);

      if (
        Array.isArray(dataresponseSheet.data.data) &&
        dataresponseSheet.data.data.length > 0
      ) {
        const dataSheet = dataresponseSheet.data.data.map((item) => ({
          projectId: item.projectId,
          type: item.type,
          cod: item.cod,
          description: item.description,
          qty: item.qty,
          unit: item.unit,
          unitPrice: item.unitPrice,
          budget: item.budget,
          subcontratorOffers: item.subcontratorOffers,
          total: item.total,
          proposal1: item.proposal1,
          proposal2: item.proposal2,
          proposal3: item.proposal3,
        }));
        setGetDataSheet(dataSheet);
        
      } else {
        console.error("enphty array sheet", dataresponseSheet.data);
      }
    };

    dataSheet();
  }, []);

  return (
    <div>
     
      <div className="text-2xl bg-blue-500 "></div>
      <h1 className="text-2xl font-semibold mt-4 ml-2">Planned</h1>
      <h2 className="text-2xl w-60 bg-blue-500 p-4 ml-2 rounded-xl text-white text-center">
        Total$ 21588
      </h2>
      <h1 className="text-2xl font-semibold mt-4 ml-2">Actual Cost</h1>
      <h2 className="text-2xl w-60 bg-blue-500 p-4 ml-2 rounded-xl text-white text-center">
        Total$ {totalSum}
      </h2>
      <table className="table-auto mt-4 border-collapse border border-slate-500 ml-2">
        <thead>
          <tr className="border border-slate-500 px-4 text-lg ">
            <th className="border border-slate-500 px-4 text-lg ">ProjectId</th>
            <th className="border border-slate-500 px-4 text-lg ">Type</th>
            <th className="border border-slate-500 px-4 text-lg ">Cod</th>
            <th className="border border-slate-500 px-4 text-lg ">
              Description
            </th>
            <th className="border border-slate-500 px-4 text-lg ">Qty</th>
            <th className="border border-slate-500 px-4 text-lg ">Unit</th>
            <th className="border border-slate-500 px-4 text-lg ">
              Unit Price (UF)
            </th>
            <th className="border border-slate-500 px-4 text-lg ">
              Budget Price
            </th>
            <th className="border border-slate-500 px-4 text-lg ">
              Subcontractors Offers
            </th>
            <th className="border border-slate-500 px-4 text-lg ">Total</th>
            <th className="border border-slate-500 px-4 text-lg ">
              Proposal 1
            </th>
            <th className="border border-slate-500 px-4 text-lg ">
              Proposal 2
            </th>
            <th className="border border-slate-500 px-4 text-lg ">
              Proposal 3
            </th>
          </tr>
        </thead>
        <tbody>
          {getDataSheet.map((item, index) => (
            <tr key={index}>
              <td className="border border-slate-500 px-4 text-lg ">
                {item.projectId}
              </td>
              <td className="border border-slate-500 px-4 text-lg ">
                {item.type}
              </td>
              <td className="border border-slate-500 px-4 text-lg ">
                {item.cod}
              </td>
              <td className="border border-slate-500 px-4 text-lg ">
                {item.description}
              </td>
              <td className="border border-slate-500 px-4 text-lg ">
                {item.qty}
              </td>
              <td className="border border-slate-500 px-4 text-lg ">
                {item.unit}
              </td>
              <td className="border border-slate-500 px-4 text-lg ">
                {item.unitPrice}
              </td>
              <td className="border border-slate-500 px-4 text-lg ">
                {item.budgetPrice}
              </td>
              <td className="border border-slate-500 px-4 text-lg ">
                {item.subcontractorOffers}
              </td>
              <td className="border border-slate-500 px-4 text-lg ">
                {item.total}
              </td>
              <td className="border border-slate-500 px-4 text-lg ">
                {item.proposal1}
              </td>
              <td className="border border-slate-500 px-4 text-lg ">
                {item.proposal2}
              </td>
              <td className="border border-slate-500 px-4 text-lg ">
                {item.proposal3}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ConcreteSC;
