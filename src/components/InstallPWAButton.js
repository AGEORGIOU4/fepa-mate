import { cilCloudDownload } from '@coreui/icons';
import CIcon from '@coreui/icons-react';
import { CButton } from '@coreui/react-pro';
import React, { useState, useEffect } from 'react';

const isIos = () => {
  return (
    /iPhone|iPad|iPod/.test(navigator.userAgent) &&
    navigator.userAgent.includes('Safari')
  );
};

const isInStandaloneMode = () => ('standalone' in window.navigator) && window.navigator.standalone;


const InstallPWAButton = () => {
  const [showInstructions, setShowInstructions] = useState(false);

  useEffect(() => {
    if (isIos() && !isInStandaloneMode()) {
      setShowInstructions(true);
    }
  }, []);
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [isInstallable, setIsInstallable] = useState(false);

  useEffect(() => {
    const handleBeforeInstallPrompt = (e) => {
      e.preventDefault(); // Prevent the default mini-infobar
      setDeferredPrompt(e); // Save the event for triggering later
      setIsInstallable(true); // Show the install button
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    // Cleanup on component unmount
    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  const handleInstallClick = () => {
    if (deferredPrompt) {
      deferredPrompt.prompt(); // Show the install prompt

      deferredPrompt.userChoice.then((choiceResult) => {
        if (choiceResult.outcome === 'accepted') {
          console.log('User accepted the install prompt');
        } else {
          console.log('User dismissed the install prompt');
        }

        setDeferredPrompt(null); // Clear the prompt after user action
        setIsInstallable(false); // Hide the install button
      });
    }
  };

  return (
    <>
      {isInstallable && (
        <CButton variant='ghost' onClick={handleInstallClick} style={{ padding: '10px', fontSize: '16px', color: 'white' }}>
          <CIcon icon={cilCloudDownload} /> Install App
        </CButton>
      )}

      {/* {!showInstructions && (
        <div style={{
          padding: '20px',
          border: '1px solid #ccc',
          textAlign: 'center'
        }}>
          <p>
            To install this app:
          </p>
          <ol>
            <li>Tap the <strong>Share</strong> button (the square with an arrow).</li>
            <li>Scroll down and select <strong>Add to Home Screen</strong>.</li>
          </ol>
        </div>
      )} */}
    </>
  );
};

export default InstallPWAButton;
