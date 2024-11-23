import React, { useState, useEffect } from "react";
import { CCol, CButton, CRow } from "@coreui/react-pro";

export const CShotClock = () => {
  const [defaultTime, setDefaultTime] = useState(60); // Default to 60 seconds
  const [shotClock, setShotClock] = useState(defaultTime); // Default to 60 seconds
  const [timer, setTimer] = useState(null); // Timer reference
  const [isRunning, setIsRunning] = useState(false); // Track if the clock is running
  const [selectedTime, setSelectedTime] = useState(60); // Track the selected time

  const [hasBeeped, setHasBeeped] = useState(false); // Track if beep has been triggered

  // Circumference based on radius 80 (for circle with width/height 160)
  const radius = 90;
  const circumference = 2 * Math.PI * radius;

  // Load the beep sound (you can replace the URL with your sound file)
  const beepSound = new Audio('/beep.mp4'); // Make sure to place beep.mp3 in your public folder or use a valid URL

  // Function to determine the stroke color based on time remaining
  const getStrokeColor = (time) => {
    if (time > 45) {
      return "#51cc8a"; // Green for 45s-60s
    } else if (time > 30) {
      return "#51cc8a"; // Green for 30s-45s (this is to cover up to 45s)
    } else if (time > 15) {
      return "#ffc107"; // Yellow for 15s-30s
    } else {
      return "#ef376e"; // Red for 0s-15s
    }
  };

  // Play beep sound if within danger zones
  const playBeepIfNeeded = (time) => {
    if (time <= 5 && !hasBeeped) {
      beepSound.play(); // Play beep sound
      setHasBeeped(true); // Mark beep as triggered
    } else if (time > 30 && hasBeeped) {
      setHasBeeped(false); // Reset beep flag once time goes above the danger zone
    }
  };

  // Start or pause the shot clock countdown
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
    if (isRunning) {
      stopShotClock(); // Stop the timer
    } else {
      startShotClock(); // Start the timer
    }
    setIsRunning(!isRunning); // Toggle the clock state
  };

  // Reset shot clock to the selected time
  const resetShotClock = (time) => {
    setShotClock(time);
    stopShotClock(); // Clear the current timer
    setIsRunning(false); // Stop the clock when reset
  };

  // Handle the click on the circle to reset the timer and start countdown
  const handleCircleClick = () => {
    resetShotClock(selectedTime); // Reset to selected time
    startShotClock(); // Start the countdown immediately
    setIsRunning(true); // Mark the clock as running
  };

  // Restart the shot clock and start immediately
  const restartShotClock = () => {
    resetShotClock(selectedTime); // Reset to the selected time
    startShotClock(); // Start the countdown immediately after reset
    setIsRunning(true); // Mark the clock as running
  };

  useEffect(() => {
    // Cleanup on component unmount
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [timer]);

  return (
    <div className="cplay-container" style={{ position: "relative" }}>
      <CRow className="justify-content-center text-center race-to-row">
        <CCol sm={12}>
          <svg
            width="200" // Increased width
            height="200" // Increased height
            onClick={handleCircleClick} // Reset the timer to selectedTime and start countdown
            style={{
              cursor: "pointer",
              marginTop: "20px",
              transition: "transform 0.2s ease", // Optional animation for interaction
              transform: isRunning ? "scale(0.95)" : "scale(1)", // Shrink on running
            }}
          >
            <circle
              cx="100" // Center of the circle (adjusted for larger size)
              cy="100" // Center of the circle (adjusted for larger size)
              r="90" // Increased radius for a larger circle
              stroke="lightgray"
              strokeWidth="10"
              fill="none"
            />
            <circle
              cx="100" // Center of the circle (adjusted for larger size)
              cy="100" // Center of the circle (adjusted for larger size)
              r="90" // Increased radius for a larger circle
              stroke={getStrokeColor(shotClock)} // Dynamic color based on time
              strokeWidth="10"
              fill="none"
              strokeDasharray={circumference}
              strokeDashoffset={(shotClock / 60) * circumference}
              transform="rotate(-90 100 100)" // Rotate the circle for proper visual start (adjusted center)
            />
            <text x="50%" y="50%" textAnchor="middle" dy=".3em" fontSize="30" fill="white">
              {shotClock}
            </text>
          </svg>
        </CCol>
      </CRow>
      <CRow className="justify-content-center p-3">
        <CButton
          className="timer-button"
          onClick={() => handleTimeButtonClick(60)}
          style={{
            margin: "0 10px",
            backgroundColor: selectedTime === 60 ? "#555555" : "", // Darker gray for selected button
          }}
        >
          60s
        </CButton>
        <CButton
          className="timer-button"
          onClick={() => handleTimeButtonClick(45)}
          style={{
            margin: "0 10px",
            backgroundColor: selectedTime === 45 ? "#555555" : "", // Darker gray for selected button
          }}
        >
          45s
        </CButton>
        <CButton
          className="timer-button"
          onClick={() => handleTimeButtonClick(30)}
          style={{
            margin: "0 10px",
            backgroundColor: selectedTime === 30 ? "#555555" : "", // Darker gray for selected button
          }}
        >
          30s
        </CButton>
        <CButton
          className="timer-button"
          onClick={() => handleTimeButtonClick(15)}
          style={{
            margin: "0 10px",
            backgroundColor: selectedTime === 15 ? "#555555" : "", // Darker gray for selected button
          }}
        >
          15s
        </CButton>
      </CRow>

      <CButton
        className="timer-button"
        onClick={() => resetShotClock(selectedTime)} // Reset the timer to the selected time
        style={{
          position: "absolute",
          left: 10,
          bottom: 10,
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
          right: 100,
          bottom: 10,
          width: "80px",
          height: "80px",
          background: isRunning ? "#ffc107" : "#51cc8a", // Change button color when running
        }}
      >
        {isRunning ? "Pause" : "Start"}
      </CButton>

      {/* Restart button */}
      <CButton
        className="timer-button"
        onClick={restartShotClock} // Reset and start immediately
        style={{
          position: "absolute",
          right: 10,
          bottom: 10,
          width: "80px",
          height: "80px",
          background: "#007bff", // Blue color for the restart button
        }}
      >
        Restart
      </CButton>
    </div>
  );
};
