const Kpis = () => {
  return (
    <div>
      <div className="flex gap-4 ml-4 mr-4 mt-2 text-white ">
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
            d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25zM6.75 12h.008v.008H6.75V12zm0 3h.008v.008H6.75V15zm0 3h.008v.008H6.75V18z"
          />
        </svg>
        Key Performance Indicator (KPI)
      </div>
      <div className="mt-2">
        <div className="bg-white ml-20 mr-20 mt-2 rounded-xl text-center">
          <h2>(SV)</h2>
          <h2>EV-PV</h2>
          <h2>0.95</h2>
        </div>
        <div className="bg-white ml-20 mr-20 mt-2 rounded-xl text-center">
          <h2>(CV)</h2>
          <h2>EV-AC</h2>
          <h2>0.95</h2>
        </div>
        <div className="bg-white ml-20 mr-20 mt-2 rounded-xl text-center">
          <h2>(SPI)</h2>
          <h2>EV/PV</h2>
          <h2>0.95</h2>
        </div>
        <div className="bg-white ml-20 mr-20 mt-2 rounded-xl text-center">
          <h2>(CPI)</h2>
          <h2>EV/AC</h2>
          <h2>0.95</h2>
        </div>
        <div className="bg-white ml-20 mr-20 mt-2 rounded-xl text-center">
          <h2>(SV)</h2>
          <h2>PV-EV</h2>
          <h2>0.95</h2>
        </div>
      </div>
    </div>
  );
};

export default Kpis;
