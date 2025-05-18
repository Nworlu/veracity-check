// components/Modal.tsx
import React from 'react';

const Modal = ({
    isOpen,
    onClose,
    children,
  }: {
    isOpen: boolean;
    onClose: () => void;
    children: React.ReactNode;
  }) => {
    if (!isOpen) return null;
  
    return (
      <div className="fixed inset-0 z-50">
        {/* Overlay */}
        <div
          className="absolute inset-0 bg-black opacity-50"
          onClick={onClose} // Optional: close modal when clicking the overlay
        />
  
        {/* Modal content */}
        <div className="relative z-60 flex items-center justify-center min-h-screen px-4">
          <div className="bg-white rounded-lg p-6 w-full max-w-lg shadow-xl relative">
            <button
              onClick={onClose}
              className="absolute top-2 right-2 text-gray-600 hover:text-black text-2xl"
            >
              &times;
            </button>
            {children}
          </div>
        </div>
      </div>
    );
  };
export default Modal;  
