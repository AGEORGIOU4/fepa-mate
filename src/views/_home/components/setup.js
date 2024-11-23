import React, { useEffect, useState } from "react";
import {
  CButton,
  CCol,
  CForm,
  CFormInput,
  CFormLabel,
  CRow,
} from "@coreui/react-pro";
import { cilMediaPlay } from "@coreui/icons";
import CIcon from "@coreui/icons-react";

export const CSetup = () => {
  const [player1, setPlayer1] = useState("Player 1");
  const [player2, setPlayer2] = useState("Player 2");
  const [raceTo, setRaceTo] = useState(5);
  const [numberOfSets, setNumberOfSets] = useState(2);


  const handleSubmit = (event) => {
    event.preventDefault();

    localStorage.setItem("activeTab", "match")
    if (raceTo < 1 || raceTo > 99 || numberOfSets < 1 || numberOfSets > 5) {
      alert("Please ensure values are within the valid range.");
      return;
    }

    let form = {
      player1,
      player2,
      raceTo,
      numberOfSets
    }

    localStorage.setItem("form", JSON.stringify(form))
    localStorage.setItem("running", true);

    window.location.reload(false)

  };

  return (
    <CRow className="justify-content-center" style={{ padding: '20px' }}>
      <CCol md={9} lg={7} xl={6}>
        <CForm onSubmit={handleSubmit}>
          <CRow>
            <CCol sm={6}>
              <div className="mb-3">
                <CFormLabel htmlFor="player1">Player 1</CFormLabel>
                <CFormInput
                  required
                  id="player1"
                  placeholder="Player 1"
                  value={player1}
                  autoComplete="off"
                  onChange={(e) => setPlayer1(e.target.value)}
                  onFocus={() => setPlayer1("")}
                />
              </div>
            </CCol>
            <CCol sm={6}>
              <div className="mb-3">
                <CFormLabel htmlFor="player2">Player 2</CFormLabel>
                <CFormInput
                  required
                  id="player2"
                  placeholder="Player 2"
                  value={player2}
                  autoComplete="off"
                  onChange={(e) => setPlayer2(e.target.value)}
                  onFocus={() => setPlayer2("")}
                />
              </div>
            </CCol>
          </CRow>

          <CRow>
            <CCol sm={6}>
              <div className="mb-3">
                <CFormLabel htmlFor="raceTo">Race To</CFormLabel>
                <CFormInput
                  id="raceTo"
                  type="number"
                  min={1}
                  max={99}
                  value={raceTo}
                  onChange={(e) => setRaceTo(Number(e.target.value))}
                />
              </div>
            </CCol>
            <CCol sm={6}>
              <div className="mb-3">
                <CFormLabel htmlFor="numberOfSets">Number of Sets</CFormLabel>
                <CFormInput
                  id="numberOfSets"
                  type="number"
                  min={1}
                  max={5}
                  value={numberOfSets}
                  onChange={(e) => setNumberOfSets(Number(e.target.value))}
                />
              </div>
            </CCol>
          </CRow>

          <div className="d-grid mt-4">
            <CButton color="success" type="submit">
              <CIcon icon={cilMediaPlay} className="me-2" style={{ color: "white" }} />
              <span style={{ color: "white" }}>Play</span>
            </CButton>
          </div>
        </CForm>
      </CCol>
    </CRow>
  );
};
