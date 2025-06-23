import React, { useState } from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from '@mui/material';

interface Props {
  isAddOrganizationModalOpen: boolean;
  onClose: () => void;
  handleAddOrganization: (name: string) => void;
}

const AddOrganizationModal: React.FC<Props> = ({
  isAddOrganizationModalOpen,
  onClose,
  handleAddOrganization,
}) => {
  const [orgName, setOrgName] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleAddOrganization(orgName.trim());
    setOrgName('');
    onClose();
  };

  return (
    <Dialog
      open={isAddOrganizationModalOpen}
      onClose={onClose}
      PaperProps={{
        sx: { width: '25rem', maxWidth: '90vw' },
        component: 'form',
        onSubmit: handleSubmit,
      }}
    >
      <DialogTitle>Add New Organization</DialogTitle>
      <DialogContent>
        <TextField
          label="Organization Name"
          fullWidth
          value={orgName}
          onChange={(e) => setOrgName(e.target.value)}
          required
          sx={{ mt: 2 }}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button type="submit" variant="contained">
          Add
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddOrganizationModal;
