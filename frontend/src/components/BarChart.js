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

export const BarChart = ({ chartData }) => {
  const [barChartData, setBarChartData] = useState({
    datasets: [],
  });
  const [barChartOptions, setBarChartOptions] = useState({});

  useEffect(() => {
    axios.get("/api/launches").then((response) =>
      setBarChartData({
        labels: response.data.map((data) => data.name),
        datasets: [
          {
            Label: "success rate",
            data: response.data.map((data) => data.success),
            backgroundColor: "green",
            borderColor: "cyan",
          },
        ],
      })
    );
    setBarChartOptions({
      responsive: true,
      maintainAspectRatio: false,
    });
  }, []); // empty array should stop multiple renders and yet...

  return (
    <div className="DashboardSection">
      <div className="SectionTitle">Individual Launch Success:</div>
      <div className="DashboardOutput">
        <div className="ChartContainer">
          <div className="BarChart">
            <Bar id="Bar" options={barChartOptions} data={barChartData} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BarChart;
