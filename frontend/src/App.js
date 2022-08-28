import "./App.css";
import axios from "axios";
import { useState, useEffect } from "react";
import LineChart from "./components/LineChart.js";
import BarChart from "./components/BarChart";

function App() {
  const [launchesData, setLaunchesData] = useState([]);

  useEffect(() => {
    axios.get("/api").then((response) => setLaunchesData(response.data));
  }, []);

  const [launchyData, setLaunchyData] = useState({
    labels: launchesData.map((data) => data.name),
    datasets: [
      {
        label: "success rate",
        data: launchesData.map((data) => data.success),
      },
    ],
  });

  return (
    <div className="App">
      <h1>Hello!</h1>
      <div>
        <div>
          {launchesData.map((launch, index) => {
            return <p key={index}>success: {launch.success}</p>;
          })}
        </div>
      </div>
      <div style={{ width: 800 }}>
        <LineChart chartData={launchyData}></LineChart>
        <BarChart chartData={launchyData}></BarChart>
      </div>
    </div>
  );
}

export default App;
