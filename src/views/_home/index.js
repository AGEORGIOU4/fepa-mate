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

const Home = () => {
  const [activeTab, setActiveTab] = useState(localStorage.getItem("activeTab") || "setup")

  const handleTabChange = (key) => {
    if (activeTab === "match" && key == "setup" && localStorage.getItem("running")) {
      const userConfirmed = window.confirm("The match is still running. Are you sure you want to exit?");
      if (!userConfirmed) {
        setActiveTab("match")
        window.location.reload()
      } else {
        localStorage.setItem("form", "")
        localStorage.setItem("running", false)
      }
    }
  };

  return (
    <>
      <CImage style={{ position: 'absolute', top: 10, right: 10, width: '80px' }} src="fepa-logo.png" />
      <div className="bg-body-tertiary min-vh-100 d-flex flex-row gradient-background">
        <div style={{ padding: "0px 10px", width: '100%' }}>
          <CTabs
            activeItemKey={activeTab}
            onChange={handleTabChange}
          >
            <CTabList variant="tabs">
              <CTab itemKey="setup">Set Up</CTab>
              <CTab itemKey="match">Match</CTab>
              <CTab itemKey="shot-clock">Shot Clock</CTab>
            </CTabList>
            <CTabContent>
              <CTabPanel className="p-3" itemKey="setup">
                <CSetup />
              </CTabPanel>
              <CTabPanel className="p-3" itemKey="match">
                <CMatch />
              </CTabPanel>
              <CTabPanel className="p-3" itemKey="shot-clock">
                Contact tab content
              </CTabPanel>
            </CTabContent>
          </CTabs>
        </div>
        <div style={{ width: "20px", position: 'absolute', bottom: 0, right: 10 }}>
        </div>
      </div>
    </>
  );
};

export default Home;
