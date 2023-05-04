import React, { useEffect, useCallback } from 'react';
import ReactDOM from 'react-dom';
import { Overlay, ModalContainer } from './Modal.styled';

export default function Modal({ onClose, children }) {
  const handleKeyDown = useCallback(
    e => {
      if (e.code === 'Escape') {
        onClose();
      }
    },
    [onClose]
  );
  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose, handleKeyDown]);

  const handleBackDropClick = event => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  return ReactDOM.createPortal(
    <Overlay onClick={handleBackDropClick}>
      <ModalContainer className="modal-content">{children}</ModalContainer>
    </Overlay>,
    document.getElementById('modal-root')
  );
}
