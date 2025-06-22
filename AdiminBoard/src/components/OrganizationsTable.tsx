import { useEffect, useState } from 'react';
import { DataGrid, useGridApiRef } from '@mui/x-data-grid';
import type { GridColDef, GridSortModel } from '@mui/x-data-grid';
import { Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import type { Organization, Resident } from '../utils/types';
import { organizationService } from '../api/ceOrganizationService';
import MainCard from './MainCard';

const getColumns = (): GridColDef[] => [
  { field: 'id', headerName: 'ID', width: 90 },
  { field: 'name', headerName: 'Organization Name', width: 200 },
  {
    field: 'residents',
    headerName: 'Residents',
    width: 400,
    renderCell: (params) => {
      const residents: Resident[] = params.row.residents;
      return (
        <Typography variant="body2">
          {residents.length > 0
            ? residents.map((r) => `${r.first_name} ${r.last_name}`).join(', ')
            : 'No residents'}
        </Typography>
      );
    },
  },
];

export default function OrganizationsTable() {
  const [paginationModel, setPaginationModel] = useState({ page: 0, pageSize: 10 });
  const [sortModel, setSortModel] = useState<GridSortModel>([
    { field: 'created_at', sort: 'desc' },
  ]);
  const [pageInfo, setPageInfo] = useState<{ rows: Organization[]; totalRowCount: number }>({
    rows: [],
    totalRowCount: 0,
  });
  const apiRef = useGridApiRef();
  const navigate = useNavigate();

  useEffect(() => {
    organizationService.findWithResidents().then(setPageInfo);
  }, []);

  // TODO : Handle Row Click
  function handleRowClick(params: any) {
    navigate(`/organization/${params.row.id}`);
  }

  return (
    <MainCard title="Organization">
      <DataGrid
        apiRef={apiRef}
        rows={pageInfo.rows}
        columns={getColumns()}
        paginationModel={paginationModel}
        onPaginationModelChange={setPaginationModel}
        sortModel={sortModel}
        onSortModelChange={setSortModel}
        rowCount={pageInfo.totalRowCount}
        paginationMode="client"
        sortingMode="client"
        pageSizeOptions={[5, 10, 25, 100]}
        disableRowSelectionOnClick={false}
        onRowClick={handleRowClick}
      />
    </MainCard>
  )
};
