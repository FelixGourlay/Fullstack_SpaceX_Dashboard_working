import "./App.css";
import axios from "axios";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar, Line } from "react-chartjs-2";
import React, { useState, useEffect } from "react";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

function App() {
  const [barChartData, setBarChartData] = useState({
    datasets: [],
  });
  const [lineChartData, setLineChartData] = useState({
    datasets: [],
  });
  const [launchesData, setLaunchesData] = useState([]);

  const [barChartOptions, setBarChartOptions] = useState({});
  const [LineChartOptions, setLineChartOptions] = useState({});

  useEffect(() => {
    axios.get("/api/launches").then((response) =>
      setBarChartData({
        labels: response.data.map((data) => data.name),
        datasets: [
          {
            Label: "success rate",
            data: response.data.map((data) => data.success),
          },
        ],
      })
    );
    axios.get("/api/yearsuccess").then((response) =>
      setLineChartData({
        labels: response.data.map((data) => data.year),
        datasets: [
          {
            Label: "success rate",
            data: response.data.map((data) => data.success),
          },
        ],
      })
    );
    axios
      .get("/api/launches")
      .then((response) => setLaunchesData(response.data));
    setBarChartOptions({
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
    setLineChartOptions({
      responsive: true,
      plugins: {
        title: {
          display: true,
          text: "Sucess by year",
        },
      },
    });
  }, []);

  return (
    <div className="App">
      <h1>SpaceX Success Dashboard</h1>
      <div id="barChartDiv" style={{ width: 800 }}>
        <h2>Individual rocket success:</h2>
        <Bar id="Bar" options={barChartOptions} data={barChartData} />
      </div>
      <div id="lineChartDiv" style={{ width: 800 }}>
        <h2>Average Success by Year:</h2>
        <Line id="line" options={LineChartOptions} data={lineChartData} />
      </div>
      <div>
        <div id="individual Launch stats">
          <h2>Individual Launch Details</h2>
          {launchesData.map((launch, index) => {
            return (
              <p key={index}>
                Date: {launch.date} <br />
                Name: {launch.name} <br />
                success: {launch.success}
              </p>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default App;
