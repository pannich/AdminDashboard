import React, { useState } from 'react';
import type { Resident } from '../utils/types';

interface AddResidentModalProps {
  isAddResidentModalOpen: boolean;
  onClose: () => void;
  onSave: (resident: Omit<Resident, 'id'>) => void;
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
  maxWidth: '500px',
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

const formFieldStyle: React.CSSProperties = {
  marginBottom: '1rem',
  display: 'flex',
  flexDirection: 'column'
}

const AddResidentModal: React.FC<AddResidentModalProps> = ({ isAddResidentModalOpen, onClose, onSave }) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [cohortId, setCohortId] = useState('');

  if (!isAddResidentModalOpen) {
    return null;
  }

  const handleSave = () => {
    onSave({
      first_name: firstName,
      last_name: lastName,
      email: email,
      cohort_id: parseInt(cohortId, 10),
    });
    onClose(); // Close modal after save
  };

  return (
    <>
      <div style={overlayStyle} onClick={onClose} />
      <div style={modalStyle}>
        <h2>Add New Resident</h2>
        <div style={formFieldStyle}>
          <label>First Name</label>
          <input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
        </div>
        <div style={formFieldStyle}>
          <label>Last Name</label>
          <input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} />
        </div>
        <div style={formFieldStyle}>
          <label>Email</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div style={formFieldStyle}>
          <label>Cohort ID</label>
          <input type="number" value={cohortId} onChange={(e) => setCohortId(e.target.value)} />
        </div>
        <div>
          <button onClick={onClose}>Cancel</button>
          <button onClick={handleSave} style={{ marginLeft: '1rem' }}>Save</button>
        </div>
      </div>
    </>
  );
};

export default AddResidentModal;
