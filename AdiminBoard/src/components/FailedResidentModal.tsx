import React from 'react';
import type { FailedResident } from '../utils/types';

interface FailedResidentModalProps {
  isModalOpen: boolean;
  onClose: () => void;
  failedResidents: FailedResident[];
}

const modalStyle: React.CSSProperties = {
  position: 'fixed',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  backgroundColor: '#fff',
  padding: '2rem',
  zIndex: 1000,
  borderRadius: '8px',
  boxShadow: '0 5px 15px rgba(0,0,0,0.3)',
  width: '90%',
  maxWidth: '600px',
};

const overlayStyle: React.CSSProperties = {
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: 'rgba(0,0,0,0.5)',
  zIndex: 999,
};

const listStyle: React.CSSProperties = {
  maxHeight: '300px',
  overflowY: 'auto',
  padding: '0 1rem',
  border: '1px solid #eee',
  borderRadius: '4px'
};

const FailedResidentModal: React.FC<FailedResidentModalProps> = ({ isModalOpen, onClose, failedResidents }) => {
  if (!isModalOpen) {
    return null;
  }

  return (
    <>
      <div style={overlayStyle} onClick={onClose} />
      <div style={modalStyle}>
        <h2>Failed Resident Uploads</h2>
        {failedResidents.length > 0 ? (
          <div style={listStyle}>
            <ul>
              {failedResidents.map((resident, index) => (
                <li key={index}>
                  <strong>{resident.first_name} {resident.last_name}</strong>: {resident.failedError}
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <p>No failed uploads to display.</p>
        )}
        <button onClick={onClose} style={{ marginTop: '1rem' }}>
          Close
        </button>
      </div>
    </>
  );
};

export default FailedResidentModal;
