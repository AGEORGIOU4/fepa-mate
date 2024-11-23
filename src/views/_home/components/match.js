import React, { useState } from "react";
import { CCol, CButton, CImage, CRow } from "@coreui/react-pro";
import avatar8 from "./../../../assets/images/avatars/8.jpg";
import avatar9 from "./../../../assets/images/avatars/9.jpg";
import CIcon from "@coreui/icons-react";
import { cilMinus, cilPlus } from "@coreui/icons";

const ScoreControl = ({ score, increment, decrement, ariaLabel }) => (
  <div className="score-control">
    <CButton
      className="score-button"
      color="secondary"
      onClick={decrement}
      aria-label={`Decrement ${ariaLabel}`}
    >
      <CIcon icon={cilMinus} />
    </CButton>
    <h1 className="score-display">{score}</h1>
    <CButton
      className="score-button"
      color="secondary"
      onClick={increment}
      aria-label={`Increment ${ariaLabel}`}
    >
      <CIcon icon={cilPlus} />
    </CButton>
  </div>
);

export const CMatch = () => {
  let form = {};

  try {
    form = JSON.parse(localStorage.getItem("form") || "{}");
  } catch (error) {
    console.error("Error parsing form data from localStorage:", error);
    // You can set form to an empty object or some default state
    form = {};
  }

  const activeSet = 1;

  const [score1, setScore1] = useState(localStorage.getItem("score1") || 0);
  const [score2, setScore2] = useState(localStorage.getItem("score2") || 0);

  const [set1, setSet1] = useState(localStorage.getItem("set1") || 0);
  const [set2, setSet2] = useState((localStorage.getItem("set2") || 0));

  const incrementScore1 = () => {
    if (score1 < form?.raceTo) setScore1(score1 + 1);
  };
  const decrementScore1 = () => {
    if (score1 > 0) setScore1(score1 - 1);
  };
  const incrementScore2 = () => {
    if (score2 < form?.raceTo) setScore2(score2 + 1);
  };
  const decrementScore2 = () => {
    if (score2 > 0) setScore2(score2 - 1);
  };

  const incrementSet1 = () => {
    if (set1 < form?.numberOfSets) setSet1(set1 + 1);
  };
  const decrementSet1 = () => {
    if (set1 > 0) setSet1(set1 - 1);
  };
  const incrementSet2 = () => {
    if (set2 < form?.numberOfSets) setSet2(set2 + 1);
  };
  const decrementSet2 = () => {
    if (set2 > 0) setSet2(set2 - 1);
  };

  return (
    <div className="cplay-container">
      <CRow className="justify-content-center text-center race-to-row">
        <CCol sm={4}>
          {set1}
        </CCol>
        <CCol sm={4}>
          Set {activeSet} out of {form?.numberOfSets}
          <h6>Race to {form?.raceTo}</h6>
        </CCol>
        <CCol sm={4}>
          {set2}
        </CCol>
      </CRow>
      <CRow className="justify-content-center text-center">

        <CCol xs={6} sm={4} className="text-center">
          <CImage
            rounded
            size="lg"
            src={avatar8}
            alt={`${form?.player1} Avatar`}
            className="player-avatar"
          />
          <h5 className="player-name">{form?.player1}</h5>
          <div className="score-button-container">
            <CButton
              className="set-button"
              color="secondary"
              onClick={decrementSet1}
              aria-label={`Decrement ${form?.player1} sets`}
            >
              <CIcon icon={cilMinus} />
            </CButton>
            <CButton
              className="set-button"
              color="secondary"
              onClick={incrementSet1}
              aria-label={`Increment ${form?.player1} sets`}
            >
              <CIcon icon={cilPlus} />
            </CButton>
          </div>
        </CCol>

        <CCol xs={6} sm={2} className="text-center">
          <ScoreControl
            score={score1}
            increment={incrementScore1}
            decrement={decrementScore1}
            ariaLabel={`${form?.player1} score`}
          />
        </CCol>

        <CCol xs={6} sm={2} className="text-center">
          <ScoreControl
            score={score2}
            increment={incrementScore2}
            decrement={decrementScore2}
            ariaLabel={`${form?.player2} score`}
          />
        </CCol>

        <CCol xs={6} sm={4} className="text-center">
          <CImage
            rounded
            size="lg"
            src={avatar9}
            alt={`${form?.player2} Avatar`}
            className="player-avatar"
          />
          <h5 className="player-name">{form?.player2}</h5>
          <div className="score-button-container">
            <CButton
              className="set-button"
              color="secondary"
              onClick={decrementSet2}
              aria-label={`Decrement ${form?.player2} sets`}
            >
              <CIcon icon={cilMinus} />
            </CButton>
            <CButton
              className="set-button"
              color="secondary"
              onClick={incrementSet2}
              aria-label={`Increment ${form?.player2} sets`}
            >
              <CIcon icon={cilPlus} />
            </CButton>
          </div>
        </CCol>

      </CRow>

      <CRow className="justify-content-center text-center race-to-row">

      </CRow>
    </div>
  );
};
