import React, { useState, useEffect, useRef } from "react";
import { CCol, CButton, CRow } from "@coreui/react-pro";

const TimerButton = ({ handleTimeButtonClick, time, selectedTime }) => {
  return (
    <CButton
      className="timer-button"
      onClick={() => handleTimeButtonClick(time)}
      style={{
        margin: "0 10px",
        backgroundColor: selectedTime === time ? "#555555" : "", selectedTime
      }}
    >
      {time}s
    </CButton>
  )
}

const ActionButtons = ({ resetShotClock, toggleShotClock, restartShotClock, selectedTime, isRunning }) => {
  return (
    <CRow>
      <CButton
        className="timer-button"
        onClick={() => resetShotClock(selectedTime)}
        style={{
          position: "absolute",
          left: 20,
          bottom: 20,
          width: "80px",
          height: "80px",
          background: "#ef376e",
        }}
      >
        Reset
      </CButton>

      <CButton
        className="timer-button"
        onClick={toggleShotClock} // Toggle start/pause
        style={{
          position: "absolute",
          right: 120,
          bottom: 20,
          width: "80px",
          height: "80px",
          background: isRunning ? "#ffc107" : "#51cc8a", // Change button color when running
        }}
      >
        {isRunning ? "Pause" : "Start"}
      </CButton>

      <CButton
        className="timer-button"
        disabled={!isRunning ? true : false}
        onClick={restartShotClock}
        style={{
          position: "absolute",
          right: 20,
          bottom: 20,
          width: "80px",
          height: "80px",
          background: "#007bff",
        }}
      >
        Restart
      </CButton>

    </CRow>

  );
};

export const CShotClockLandscape = () => {
  const times = [60, 45, 30, 15];

  const [defaultTime, setDefaultTime] = useState(60); // Default to 60 seconds
  const [shotClock, setShotClock] = useState(defaultTime); // Default to 60 seconds
  const [timer, setTimer] = useState(null); // Timer reference
  const [isRunning, setIsRunning] = useState(false); // Track if the clock is running
  const [selectedTime, setSelectedTime] = useState(60); // Track the selected time

  const [p1ExtensionUsed, setP1ExtensionUsed] = useState(false);
  const [p2ExtensionUsed, setP2ExtensionUsed] = useState(false);

  const radius = 95;
  const circumference = 2 * Math.PI * radius;

  const beepSoundRef = useRef(new Audio('/beep.mp4'));

  const getStrokeColor = (time) => {
    if (time > 45) {
      return "#51cc8a"; // Green for 45s-60s
    } else if (time > 30) {
      return "#51cc8a"; // Green for 30s-45s
    } else if (time > 15) {
      return "#ffc107"; // Yellow for 15s-30s
    } else {
      return "#ef376e"; // Red for 0s-15s
    }
  };

  const playBeepIfNeeded = (time) => {
    if (time <= 5) {
      beepSoundRef.current.play(); // Play the beep sound
    }
  };

  const pauseBeep = () => {
    beepSoundRef.current.pause();
  };

  const stopBeep = () => {
    beepSoundRef.current.pause();
    beepSoundRef.current.currentTime = 0;
  };

  const startShotClock = () => {
    const newTimer = setInterval(() => {
      setShotClock((prev) => {
        if (prev === 0) {
          clearInterval(newTimer); // Stop when it reaches 0
          return 0;
        }
        const newTime = prev - 1;
        playBeepIfNeeded(newTime); // Check and trigger beep if needed
        return newTime;
      });
    }, 1000);
    setTimer(newTimer); // Start the timer
  };

  const stopShotClock = () => {
    clearInterval(timer); // Stop the timer
    setTimer(null); // Clear the timer reference
  };

  const handleTimeButtonClick = (time) => {
    setSelectedTime(time); // Set the selected time
    resetShotClock(time); // Reset to the selected time
  };

  const toggleShotClock = () => {
    pauseBeep(); // Stop the beep sound if it's playing
    if (isRunning) {
      stopShotClock(); // Stop the timer
    } else {
      startShotClock(); // Start the timer
    }
    setIsRunning(!isRunning); // Toggle the clock state
  };

  const resetShotClock = (time) => {
    stopBeep(); // Stop the beep sound if it's playing
    setShotClock(time);
    stopShotClock(); // Clear the current timer
    setIsRunning(false); // Stop the clock when reset
    setP1ExtensionUsed(false); // Reset player 1 extension
    setP2ExtensionUsed(false); // Reset player 2 extension
  };

  const handleCircleClick = () => {
    toggleShotClock()
  };

  const restartShotClock = () => {
    stopBeep(); // Stop the beep sound if it's playing
    setShotClock(selectedTime);
    stopShotClock(); // Clear the current timer
    setIsRunning(false); // Stop the clock when reset
    startShotClock(); // Start the countdown immediately after reset
    setIsRunning(true); // Mark the clock as running
  };

  const handleP1Extension = () => {
    stopBeep();
    if (!p1ExtensionUsed) {
      setShotClock(prev => prev + 15);
      setP1ExtensionUsed(true);
    }
  };

  const handleP2Extension = () => {
    stopBeep(); // Stop the beep sound if it's playing
    if (!p2ExtensionUsed) {
      setShotClock(prev => prev + 15); // Add 15 seconds to the shot clock
      setP2ExtensionUsed(true); // Mark player 2 extension as used
    }
  };

  useEffect(() => {
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [timer]);

  useEffect(() => {
    return () => {
      pauseBeep();
      if (timer) clearInterval(timer);
    };
  }, [timer]);

  return (
    <>

      <div>
        <CRow className=" text-center bold-text">
          <CCol sm={4}>
            <CButton
              onClick={handleP1Extension}
              disabled={p1ExtensionUsed} // Disable after use
              style={{
                margin: "20px",
                width: "100px",
                height: "60px",
                color: 'white',
                background: p1ExtensionUsed ? "#cccccc" : "#673AB7", // Disabled color
              }}
            >
              P1 Extension
            </CButton>

          </CCol>
          <CCol sm={4}>
            <svg
              width="220" // Updated size
              height="220"
              onClick={handleCircleClick}
              style={{
                cursor: "pointer",
                margin: "0 20px",
                transition: "transform 0.2s ease",
                transform: isRunning ? "scale(0.95)" : "scale(1)",
              }}
            >
              <circle
                cx="110" // Center adjusted to match new size
                cy="110"
                r="95" // Adjusted radius for new dimensions
                stroke="lightgray"
                strokeWidth="12" // Stroke width adjusted for better proportions
                fill="none"
              />
              <circle
                cx="110"
                cy="110"
                r="95"
                stroke={getStrokeColor(shotClock)}
                strokeWidth="12"
                fill="dark"
                strokeDasharray={circumference} // Update if circumference depends on radius
                strokeDashoffset={((60 - shotClock) / 60) * circumference}
                transform="rotate(-90 110 110)" // Rotation pivot updated for new center
              />
              <text
                x="50%"
                y="50%"
                textAnchor="middle"
                dy=".3em"
                fontSize="30" // Adjusted font size to fit the smaller circle
                fill="white"
              >
                {shotClock}
              </text>
            </svg>
          </CCol>

          <CCol sm={4}>
            <CButton
              onClick={handleP2Extension}
              disabled={p2ExtensionUsed} // Disable after use
              style={{
                margin: "20px",
                width: "100px",
                height: "60px",
                color: 'white',
                background: p2ExtensionUsed ? "#cccccc" : "#673AB7", // Disabled color
              }}
            >
              P2 Extension
            </CButton>
          </CCol>
        </CRow>

        <CRow className="justify-content-center" style={{ padding: "10px" }}>
          {times?.map((time, index) => {
            return (
              <TimerButton key={time} handleTimeButtonClick={handleTimeButtonClick} time={time} selectedTime={selectedTime} />
            )
          })}
        </CRow>

      </div>




      <ActionButtons resetShotClock={resetShotClock} toggleShotClock={toggleShotClock} restartShotClock={restartShotClock}
        selectedTime={selectedTime} isRunning={isRunning} />
    </>

  );
};
