import React from "react";
import { Bar } from "react-chartjs-2";

export const BarChart = ({ chartData }) => {
  return (
    <div>
      <Bar
        data={chartData}
        options={{
          plugins: {
            title: {
              display: true,
              text: "Launch Success",
            },
            legend: {
              display: true,
              position: "bottom",
            },
          },
        }}
      />
    </div>
  );
};

export default BarChart;
