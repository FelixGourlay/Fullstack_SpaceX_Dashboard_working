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
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRocket } from "@fortawesome/free-solid-svg-icons";

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
      maintainAspectRatio: false,
    });
    setLineChartOptions({
      responsive: true,
      maintainAspectRatio: false,
    });
  }, []);

  return (
    <div className="App">
      <div className="DashboardTitle">SpaceX Success Dashboard</div>
      <div className="DashboardSection">
        <div className="SectionTitle">Individual rocket success:</div>
        <div className="DashboardOutput">
          <div className="ChartContainer">
            <div className="BarChart">
              <Bar id="Bar" options={barChartOptions} data={barChartData} />
            </div>
          </div>
        </div>
      </div>
      <div className="DashboardSection">
        <div className="SectionTitle">Average Success by Year:</div>
        <div className="DashboardOutput">
          <div className="ChartContainer">
            <div className="LineChart">
              <Line id="line" options={LineChartOptions} data={lineChartData} />
            </div>
          </div>
        </div>
      </div>
      <div className="DashboardSection">
        <div className="SectionTitle">Individual Launch Details</div>
        <div className="DashboardOutput">
          <div className="TileContainer">
            {launchesData.map((launch, index) => {
              return (
                <div className="LaunchInfoTile">
                  {/* <FontAwesomeIcon icon=(faRocket) /> */}
                  <p key={index}>
                    Date: {launch.date} <br />
                    Name: {launch.name} <br />
                    success: {launch.success}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
