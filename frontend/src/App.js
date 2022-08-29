import "./App.css";
import axios from "axios";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import React, { useState, useEffect } from "react";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

function App() {
  const [chartData, setChartData] = useState({
    datasets: [],
  });

  const [chartOptions, setChartOptions] = useState({});

  useEffect(() => {
    axios.get("/api/launches").then((response) =>
      setChartData({
        labels: response.data.map((data) => data.name),
        datasets: [
          {
            Label: "success rate",
            data: response.data.map((data) => data.success),
          },
        ],
      })
    );

    setChartOptions({
      responsive: true,
      plugins: {
        legend: {
          position: "top",
        },
        title: {
          display: true,
          text: "Rocket success",
        },
      },
    });
  }, []);

  return (
    <div className="App">
      <h1>Hello!</h1>
      <div style={{ width: 800 }}>
        <Bar options={chartOptions} data={chartData} />
      </div>
    </div>
  );
}

export default App;
