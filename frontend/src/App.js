import "./App.css";
import { useState, useEffect } from "react";
import LineChart from "./components/LineChart.js";
import BarChart from "./components/BarChart";

import { LaunchData } from "./placeholderData";

function App() {
  const [launchyData, setLaunchyData] = useState({
    labels: LaunchData.map((data) => data.name),
    datasets: [
      {
        label: "success rate",
        data: LaunchData.map((data) => data.success),
      },
    ],
  });

  return (
    <div className="App">
      <h1>Hello!</h1>
      <div style={{ width: 800 }}>
        <LineChart chartData={launchyData}></LineChart>
        <BarChart chartData={launchyData}></BarChart>
      </div>
    </div>
  );
}

export default App;
