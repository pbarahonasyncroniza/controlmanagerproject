import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  Tooltip,
  CategoryScale,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { useEffect, useState } from "react";

ChartJS.register(LineElement, PointElement, CategoryScale, Tooltip, Legend);

const LineChart = () => {
  const [chart, setChart] = useState([]);

  const baseUrl = "https://api.coinranking.com/v2/coins/?limit=15";
  const proxyUrl = " https://cors-anywhere.herokuapp.com/";
  const apiKey = "coinranking8a66b35cccb6a954163cd86dca6726ca1a466cc9a280d938";

  useEffect(() => {
    const fetchCoins = async () => {
      await fetch(`${proxyUrl}${baseUrl}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "x-access-token": apiKey,
          "Access-Control-Allow-Origin": "*",
        },
      })
        .then((response) => {
          response.json().then((json) => {
            console.log(json);
            setChart(json.data);
          });
        })
        .catch((error) => {
          console.log(error);
        });
    };

    fetchCoins();
  }, [baseUrl, proxyUrl, apiKey]);

  let data = {
    labels: chart?.coins?.map((x) => x.name),
    datasets: [
      {
        label: "Progress",
        data: chart?.coins?.map((x) => x.price),
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(255, 159, 64, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };
  let options = {
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true,
      },
    },
    legend: {
      fontSize: 26,
    },
  };

  return (
    <div>
      <div>
        <Line data={data} height={100} options={options} />
      </div>
    </div>
  );
};

export default LineChart;
