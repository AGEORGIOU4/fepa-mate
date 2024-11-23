import React, { useState } from "react";
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
import InstallPWAButton from "./components/InstallPWAButton";

const Home = () => {
  const [activeTab, setActiveTab] = useState(localStorage.getItem("activeTab") || "setup")
  const [matchRunning, setMatchRunning] = useState(localStorage.getItem("running") == 'true' || false)

  const handleTabChange = (key) => {
    localStorage.setItem("activeTab", key)
  };

  return (
    <>

      <CImage style={{ position: 'absolute', top: 10, right: 10, width: '80px' }} src="fepa-logo.png" />
      <div className="min-vh-100 gradient-background">
        <CTabs
          activeItemKey={activeTab}
          onChange={handleTabChange}
        >
          <CTabList variant="tabs">
            <CTab itemKey="setup">Set Up</CTab>
            <CTab itemKey="match" disabled={!matchRunning}>Match</CTab>
            <CTab itemKey="shot-clock">Shot Clock</CTab>
          </CTabList>
          <CTabContent>
            <CTabPanel className="p-3" itemKey="setup">
              <CSetup />
              <InstallPWAButton />
            </CTabPanel>
            <CTabPanel className="p-3" itemKey="match">
              <CMatch />
            </CTabPanel>
            <CTabPanel className="p-3" itemKey="shot-clock">
              <CShotClock />
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
