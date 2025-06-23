/**
 * UploadSection.tsx
 *
 * Wrapper / Control Panel that holds buttons like "Add Organization"
 */
import { Button, Stack } from '@mui/material';
import { useState, useContext } from 'react';
import AddOrganizationModal from './AddOrganizationModal';
import { organizationService } from '../api/ceOrganizationService';
import { RefreshContext } from '../contexts/RefreshContext';
import { useSnackbar } from 'notistack'

const UploadSection = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { refresh, setRefresh } = useContext(RefreshContext);
  const { enqueueSnackbar } = useSnackbar();

  const handleAddOrganization = async (name: string) => {
    try {
      await organizationService.insert({ name }); // call your DB insert logic
      setIsModalOpen(false);
      setRefresh(refresh + 1);

      enqueueSnackbar('Organization added');
    } catch (error) {
      enqueueSnackbar('Failed to add organization');
    }
  };

  return (
    <Stack spacing={2} direction="row" m={2}>
      <Button variant="contained" onClick={() => setIsModalOpen(true)}>
        Add Organization
      </Button>
      <AddOrganizationModal
        isAddOrganizationModalOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        handleAddOrganization={handleAddOrganization}
      />
    </Stack>
  );
};

export default UploadSection;
