import { CButton, CModal, CModalBody, CModalFooter, CModalHeader } from '@coreui/react-pro';
import React, { useState, useEffect } from 'react';

const InstallPWAButton = () => {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [isInstallable, setIsInstallable] = useState(false);
  const [showModal, setShowModal] = useState(false); // Control modal visibility
  const [modalCount, setModalCount] = useState(0); // Track how many times the modal has been shown

  useEffect(() => {
    // Load the modal count from local storage
    const savedCount = parseInt(localStorage.getItem('pwaInstallModalCount')) || 0;
    setModalCount(savedCount);

    const handleBeforeInstallPrompt = (e) => {
      e.preventDefault(); // Prevent the default mini-infobar
      setDeferredPrompt(e); // Save the event for triggering later
      setIsInstallable(true); // App is installable

      // Show the modal if not installed and shown less than 3 times
      if (savedCount < 3) {
        setShowModal(true);
      }
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
        setIsInstallable(false); // Hide the install option
      });
    }
    closeModal(); // Close the modal
  };

  const closeModal = () => {
    const newCount = modalCount + 1;
    setModalCount(newCount);
    localStorage.setItem('pwaInstallModalCount', newCount); // Save count to local storage

    if (newCount < 3) {
      setShowModal(true); // Show modal again if shown less than 3 times
    } else {
      setShowModal(false); // Stop showing the modal after 3 displays
    }
  };

  return (
    <>
      {isInstallable && modalCount < 3 && (
        <>
          {/* Modal */}
          <CModal visible={showModal} onClose={closeModal}>
            <CModalHeader>Install App</CModalHeader>
            <CModalBody>
              <p>Install this application to quickly access it from your home screen!</p>
            </CModalBody>
            <CModalFooter>
              <CButton color="primary" onClick={handleInstallClick}>
                Install Now
              </CButton>
              <CButton color="secondary" onClick={closeModal}>
                Cancel
              </CButton>
            </CModalFooter>
          </CModal>
        </>
      )}
    </>
  );
};

export default InstallPWAButton;
