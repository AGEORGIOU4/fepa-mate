import React, { useState, useEffect } from 'react';

const InstallPWAButton = () => {
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
        <button onClick={handleInstallClick} style={{ padding: '10px', fontSize: '16px' }}>
          Install App
        </button>
      )}
    </>
  );
};

export default InstallPWAButton;
