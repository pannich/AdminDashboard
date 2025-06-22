import { useEffect, useState } from 'react';
import { DataGrid, useGridApiRef } from '@mui/x-data-grid';
import type { GridColDef, GridSortModel, GridFilterModel } from '@mui/x-data-grid';
import { Link, Button, Stack } from '@mui/material';
import type { CallHistory } from '../utils/types';
import { callhistoryService } from '../api/ceCallHistoryService';
import MainCard from './MainCard';

const getColumns = (): GridColDef[] => [
  { field: 'start_at', headerName: 'Start Time', width: 180 },
  { field: 'end_at', headerName: 'End At', width: 180 },
  { field: 'resident_id', headerName: 'Resident ID', width: 150 },
  { field: 'summary', headerName: 'Summary', width: 250 },
  {
    field: 'recording_url',
    headerName: 'Recording',
    width: 200,
    renderCell: (params) => (
      <Link href={params.value} target="_blank" rel="noopener">
        Listen
      </Link>
    ),
  },
  { field: 'duration', headerName: 'Duration (min)', width: 150 },
  { field: 'language', headerName: 'Language', width: 120 },
];

export default function CallHistoryPage() {
  const [paginationModel, setPaginationModel] = useState({ page: 0, pageSize: 10 });
  const [sortModel, setSortModel] = useState<GridSortModel>([
    { field: 'created_at', sort: 'desc' },
  ]);
  const [pageInfo, setPageInfo] = useState<{ rows: CallHistory[]; totalRowCount: number }>({
    rows: [],
    totalRowCount: 0,
  });

  const apiRef = useGridApiRef();

  const filterEnglish = () => {
    const filterModel: GridFilterModel = {
      items: [
        {
          id: 1,
          field: 'language',
          operator: 'contains',
          value: 'en',
        },
      ],
    };
    if (apiRef.current) {
      apiRef.current.setFilterModel(filterModel);
    }
  };

  useEffect(() => {
    callhistoryService.findWithResident().then((data) => setPageInfo(data));
  }, []);

  const clearFilter = () => {
    if (apiRef.current) {
      apiRef.current.setFilterModel({ items: [] });
    }
  };

  return (
    <MainCard title="Call History">
      <Stack direction="row" spacing={2} mb={2}>
        <Button variant="contained" onClick={filterEnglish}>
          Filter English
        </Button>
        <Button variant="outlined" onClick={clearFilter}>
          Clear Filter
        </Button>
      </Stack>
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
      />
    </MainCard>
  )
};
