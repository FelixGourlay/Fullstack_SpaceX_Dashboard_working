import axios from "axios";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import React, { useState, useEffect } from "react";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export const LineChart = ({ chartData }) => {
  const [lineChartData, setLineChartData] = useState({
    datasets: [],
  });
  const [LineChartOptions, setLineChartOptions] = useState({});

  useEffect(() => {
    axios.get("/api/yearsuccess").then((response) =>
      setLineChartData({
        labels: response.data.map((data) => data.year),
        datasets: [
          {
            label: "Average Launch Success Rate",
            data: response.data.map((data) => data.success),
            backgroundColor: "blue",
          },
        ],
      })
    );
    setLineChartOptions({
      responsive: true,
      maintainAspectRatio: false,
    });
  }, []); // empty array should stop multiple renders and yet...
  return (
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
  );
};

export default LineChart;
