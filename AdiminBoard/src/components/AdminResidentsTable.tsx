import { DataGrid } from '@mui/x-data-grid';
import type { GridColDef } from '@mui/x-data-grid';
import { useEffect, useState } from 'react';
import type { Resident, PageInfo, QueryModel } from '../utils/types';
import MainCard from './MainCard';
import { residentService } from '../api/ceResidentService';


const PAGE_SIZE = 10;


const getColumns = (): GridColDef[] => [
  { field: 'id', headerName: 'Id', width: 180 },
  { field: 'first_name', headerName: 'First Name', width: 150 },
  { field: 'last_name', headerName: 'Last Name', width: 150 },
  { field: 'email', headerName: 'Email', width: 200 },
  { field: 'cohort_id', headerName: 'Cohort ID', width: 120, type: 'number' },
];

export default function AdminUsersTable() {
  const [pageInfo, setPageInfo] = useState<PageInfo<Resident>>({ rows: [], totalRowCount: 0 });
  const [paginationModel, setPaginationModel] = useState({ page: 0, pageSize: PAGE_SIZE });

  const query: QueryModel = {
    page: paginationModel.page,
    pageSize: paginationModel.pageSize,
    sortField: 'id',
    sortDirection: 'asc',
  };

  useEffect(() => {
    residentService.find(query).then(setPageInfo);
  }, [paginationModel]);


  return (
    <MainCard title="Residents">
      <DataGrid
        rows={pageInfo.rows}
        columns={getColumns()}
        rowCount={pageInfo.totalRowCount}
        paginationModel={paginationModel}
        onPaginationModelChange={setPaginationModel}
        pageSizeOptions={[5, 10, 25]}
        paginationMode="server"
        initialState={{
          pagination: { paginationModel: { pageSize: 5, page: 0 } },
        }}
      />
    </MainCard>
  );
}
