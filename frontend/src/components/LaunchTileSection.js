import axios from "axios";
import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRocket } from "@fortawesome/free-solid-svg-icons";

export const LaunchTileHolder = () => {
  const [launchesData, setLaunchesData] = useState([]);

  useEffect(() => {
    axios
      .get("/api/launches")
      .then((response) => setLaunchesData(response.data));
  }, []);

  return (
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
  );
};

export default LaunchTileHolder;
