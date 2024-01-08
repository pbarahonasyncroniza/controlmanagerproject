import { useEffect, useState } from "react";
import axios from "axios";

const IronSC = () => {
  const [getDataSheet, setGetDataSheet] = useState([]);
  useEffect(() => {
    const getSheetData = async () => {
      try {
        const dataSheetResponse = await axios.get(
          "http://localhost:8000/sheet?type=Iron"
        );
        console.log("Respuesta del servidor:", dataSheetResponse);

        if (
          Array.isArray(dataSheetResponse.data.data) &&
          dataSheetResponse.data.data.length > 0
        ) {
          const formData = dataSheetResponse.data.data.map((item) => ({
            type: item.type,
            cod: item.cod,
            description: item.description,
            qty: item.qty,
            unit: item.unit,
            unitPrice: item.unitPrice,
            budgetPrice: item.budgetPrice,
            subcontractorOffers: item.subcontractorOffers,
            total: item.total,
            proposal1: item.proposal1,
            proposal2: item.proposal2,
            proposal3: item.proposal3,
          }));
          setGetDataSheet(formData);
        } else {
          console.error("emphty array", dataSheetResponse.data.data);
        }
      } catch (error) {
        console.error("error", error);
      }
    };

    getSheetData();
  }, []);
  return (
    <div>
      <h1 className="text-2xl font-semibold mt-4 ml-2">Budget 0</h1>
      <table className="table-auto mt-4 border-collapse border border-slate-500 ml-2">
        <thead>
          <tr className="border border-slate-500 px-4 text-lg ">
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
      <h1 className="text-2xl font-semibold mt-4 ml-2">Budget on site</h1>
      <table className="table-auto mt-4 border-collapse border border-slate-500 ml-2">
        <thead>
          <tr className="border border-slate-500 px-4 text-lg ">
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
          <tr>
            <td className="border border-slate-500 px-4 text-lg ">201254</td>
            <td className="border border-slate-500 px-4 text-lg ">Iron</td>
            <td className="border border-slate-500 px-4 text-lg ">125631</td>
            <td className="border border-slate-500 px-4 text-lg ">kg</td>
            <td className="border border-slate-500 px-4 text-lg ">1.81</td>
            <td className="border border-slate-500 px-4 text-lg ">1229.76</td>
            <td className="border border-slate-500 px-4 text-lg ">
              Hormiunion
            </td>
            <td className="border border-slate-500 px-4 text-lg ">24926.55</td>
            <td className="border border-slate-500 px-4 text-lg ">
              Hormiunion
            </td>
            <td className="border border-slate-500 px-4 text-lg ">mmm</td>
            <td className="border border-slate-500 px-4 text-lg ">JJJ</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default IronSC;
