import React, { useState } from "react";
import { CCol, CButton, CImage, CRow } from "@coreui/react-pro";
import CIcon from "@coreui/icons-react";
import { cilMinus, cilPlus } from "@coreui/icons";

const ScoreControl = ({ score, increment, decrement, ariaLabel }) => (
  <div className="score-control">
    <CButton
      className="score-button"
      color="secondary"
      onClick={increment}
      aria-label={`Increment ${ariaLabel}`}
    >
      <CIcon icon={cilPlus} />
    </CButton>
    <h1 className="score-display">{score}</h1>
    <CButton
      className="score-button"
      color="secondary"
      onClick={decrement}
      aria-label={`Decrement ${ariaLabel}`}
    >
      <CIcon icon={cilMinus} />
    </CButton>

  </div>
);

const Avatar = ({ player }) => {
  return (
    <CCol xs={6} sm={4} className="text-center d-flex flex-column justify-content-center align-items-center">
      <CImage
        rounded
        size="lg"
        src={'/avatar.jpg'}
        alt={`${player} Avatar`}
        className="player-avatar"
      />
      <h5 className="player-name">{player}</h5>
    </CCol>
  )
}

export const CMatch = () => {
  let form = {};

  try {
    form = JSON.parse(localStorage.getItem("form") || "{}");
  } catch (error) {
    console.error("Error parsing form data from localStorage:", error);
    form = {};
  }

  const [score1, setScore1] = useState(localStorage.getItem("score1") || 0);
  const [score2, setScore2] = useState(localStorage.getItem("score2") || 0);

  const restartMatch = () => {
    let confirm = window.confirm("The match is finished. Do you want to restart?");
    if (confirm) {
      setScore1(0);
      setScore2(0);
    }
  };

  const incrementScore1 = () => {
    if (score1 < form?.raceTo) {
      setScore1((prevScore1) => {
        const newScore = prevScore1 + 1;
        if (newScore >= form?.raceTo) {
          restartMatch();
        }
        return newScore;
      });
    }

  };

  const incrementScore2 = () => {
    if (score2 < form?.raceTo) {
      setScore2((prevScore2) => {
        const newScore = prevScore2 + 1;
        if (newScore === form?.raceTo) {
          restartMatch();
        }
        return newScore;
      });
    }

  };

  const decrementScore1 = () => {
    if (score1 > 0) setScore1(score1 - 1);
  };

  const decrementScore2 = () => {
    if (score2 > 0) setScore2(score2 - 1);
  };

  return (
    <>
      <CRow className="justify-content-center text-center bold-text">
        <CCol sm={12}>
          Race to {form?.raceTo}
        </CCol>
      </CRow>
      <CRow className="justify-content-center text-center">

        <Avatar player={form?.player1} />

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

        <Avatar player={form?.player2} />

      </CRow>
    </>
  );
};
