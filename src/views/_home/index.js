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
      <div className="min-vh-100 gradient-background">
        <CTabs
          activeItemKey={activeTab}
          onChange={handleTabChange}
        >
          <CTabList variant="tabs">
            <CTab itemKey="shot-clock">Shot Clock</CTab>
            <CTab itemKey="setup">Set Up</CTab>
            <CTab itemKey="match" disabled={!matchRunning}>Match</CTab>
            {/* <CTab itemKey="streaming" >Streaming</CTab> */}
          </CTabList>
          <CTabContent
            style={{
              display: "flex",
              flexDirection: "column", // Ensures vertical layout

              justifyContent: "center", // Centers items horizontally (if applicable)
              height: "80vh", // Ensures the container takes up the full viewport height
            }}
          >
            <CTabPanel itemKey="setup">
              <div style={{ position: 'absolute', bottom: 10 }} >
                <InstallPWAButton />
              </div>
              <CSetup />
            </CTabPanel>
            <CTabPanel itemKey="match">
              <CMatch />
            </CTabPanel>
            <CTabPanel itemKey="shot-clock">
              {isLandscape ? <CShotClockLandscape /> : <CShotClock />}
            </CTabPanel>

          </CTabContent>
        </CTabs>
        <div style={{ width: "20px", position: 'absolute', bottom: 0, right: 10 }}>
        </div>
      </div>
    </>
  );
};

export default Home;
