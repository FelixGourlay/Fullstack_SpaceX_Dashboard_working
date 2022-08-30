import "./App.css";
import BarChart from "./components/BarChart";
import LineChart from "./components/LineChart";
import LaunchTileHolder from "./components/LaunchTileSection";

function App() {
  return (
    <div className="App">
      <div className="DashboardTitle">SpaceX Success Dashboard</div>
      <BarChart />
      <LineChart />
      <LaunchTileHolder />
    </div>
  );
}

export default App;
