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

  const handleSubmit = (event) => {
    event.preventDefault();

    localStorage.setItem("activeTab", "match")

    if (raceTo < 1 || raceTo > 99) {
      alert("Please ensure values are within the valid range.");
      return;
    }

    let form = {
      player1,
      player2,
      raceTo
    }

    localStorage.setItem("form", JSON.stringify(form))
    localStorage.setItem("running", true);

    window.location.reload(false)

  };

  return (
    <CRow className="justify-content-center" style={{ padding: '20px' }}>
      <CCol md={12} lg={12} xl={12}>
        <CForm onSubmit={handleSubmit}>
          <CRow>
            <CCol sm={5} className="mb-3">
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
            </CCol>
            <CCol sm={5} className="mb-3">
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
            </CCol>
            <CCol sm={2} className="mb-3">
              <div>
                <CFormLabel htmlFor="raceTo">Race</CFormLabel>
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
