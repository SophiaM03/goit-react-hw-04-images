import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import { Overlay, ModalContainer } from './Modal.styled';

export default function Modal({ onClose, children }) {
  useEffect(() => {
    const handleKeyDown = e => {
      if (e.code === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);

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
