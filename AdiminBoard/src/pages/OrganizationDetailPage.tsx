/*
* OrganizationDetailPage.tsx
*
*
*/

import { useParams } from 'react-router-dom';
import { useEffect, useState, useContext } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Button, Stack } from '@mui/material';
import { useSnackbar } from 'notistack';

import { organizationService } from '../api/ceOrganizationService';
import { residentService } from '../api/ceResidentService';
import type { Resident } from '../utils/types';
import { RefreshContext } from '../contexts/RefreshContext';

import ResidentUploader from '../components/ResidentUploader';
import FailedResidentModal from '../components/FailedResidentModal';
import AddResidentModal from '../components/AddResidentModal';

export default function OrganizationDetailPage() {
  const { orgId } = useParams();
  const [residents, setResidents] = useState<Resident[]>([]);
  const [orgName, setOrgName] = useState<string>('');
  const { refresh, setRefresh } = useContext(RefreshContext);

  const [showDropzone, setShowDropzone] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [failedResidents, setFailedResidents] = useState([]);
  const [isAddResidentModalOpen, setIsAddResidentModalOpen] = useState(false);
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    if (!orgId) return;
    const fetchOrg = async () => {
      const org = await organizationService.getById(orgId, '*,residents(*)');
      setResidents(org?.residents || []);
      setOrgName(org?.name || '');
    };
    fetchOrg();
  }, [orgId, refresh]);

  const handleResidentUpload = (summary: any) => {
    const { attemptedCount, successCount, failedCount, failedResidents } = summary;
    enqueueSnackbar(`${attemptedCount} attempted, ${successCount} added, ${failedCount} failed`);
    setFailedResidents(failedResidents);
    if (failedResidents.length > 0) {
      setIsModalOpen(true);
    }
    setRefresh((r) => r + 1);
  };

  const handleCloseAddResidentModal = () => {
    setIsAddResidentModalOpen(false);
  };

  const handleAddResident = async (resident: any) => {
    await residentService.insert(resident);
    setRefresh((r) => r + 1);
    setIsAddResidentModalOpen(false);
  };

  return (
    <div>
      <h2>{orgName}</h2>
      <h4>Resident:</h4>
      <Stack spacing={2} direction="row" mb={2}>
        <Button onClick={() => setShowDropzone(!showDropzone)}>
          Upload Residents
        </Button>
        <Button onClick={() => setIsAddResidentModalOpen(true)}>
          Add Resident
        </Button>
      </Stack>

      {showDropzone && (
        <ResidentUploader onChange={handleResidentUpload} />
      )}

      <DataGrid
        rows={residents}
        columns={[
          { field: 'id', headerName: 'ID', width: 90 },
          { field: 'first_name', headerName: 'First Name', width: 150 },
          { field: 'last_name', headerName: 'Last Name', width: 150 },
          { field: 'email', headerName: 'Email', width: 200 },
          { field: 'cohort_id', headerName: 'Cohort ID', width: 120 },
        ]}
        autoHeight
        pageSizeOptions={[5, 10]}
      />

      <FailedResidentModal
        isModalOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        failedResidents={failedResidents}
      />

      <AddResidentModal
        isAddResidentModalOpen={isAddResidentModalOpen}
        onClose={handleCloseAddResidentModal}
        onSave={handleAddResident}
      />


    </div>
  );
}
