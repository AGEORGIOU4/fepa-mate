import React, { useEffect, useState } from "react";
import {

  CImage,
  CTab,
  CTabContent,
  CTabList,
  CTabPanel,
  CTabs,
} from "@coreui/react-pro";
import { CSetup } from "./components/setup";
import { CMatch } from "./components/match";
import { CShotClock } from "./components/shot-clock";
import InstallPWAButton from "../../components/InstallPWAButton";
import { CShotClockLandscape } from "./components/shot-clock-landscape";

const Home = () => {
  const [activeTab, setActiveTab] = useState(localStorage.getItem("activeTab") || "shot-clock")
  const [matchRunning, setMatchRunning] = useState(localStorage.getItem("running") == 'true' || false)
  const [isLandscape, setIsLandscape] = useState(window.matchMedia("(orientation: landscape)").matches);

  const handleTabChange = (key) => {
    localStorage.setItem("activeTab", key)
  };

  useEffect(() => {
    const handleOrientationChange = () => {
      setIsLandscape(window.matchMedia("(orientation: landscape)").matches);
    };

    // Add event listener for orientation changes
    window.addEventListener("resize", handleOrientationChange);

    // Cleanup listener on unmount
    return () => {
      window.removeEventListener("resize", handleOrientationChange);
    };
  }, []);

  return (
    <>

      {/* <CImage style={{ position: 'absolute', top: 10, right: 10, width: '80px' }} src="fepa-logo.png" /> */}
      <div
        className="min-vh-100 gradient-background"
        style={{
          width: "100vw", // Full viewport width
          height: "100vh", // Full viewport height
          overflow: "hidden", // Prevent scrollbars
          display: "flex", // Flexbox for layout
          flexDirection: "column", // Stack children vertically
          WebkitOverflowScrolling: "touch", // Smooth scrolling (fallback for content that might scroll inside)
        }}
      >
        {isLandscape ? <CShotClockLandscape /> : <CShotClock />}
      </div>
    </>
  );
};

export default Home;
