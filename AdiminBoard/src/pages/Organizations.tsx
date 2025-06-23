// src/pages/organizations.tsx
import OrganizationsTable from '../components/OrganizationsTable';
import { RefreshProvider } from '../contexts/RefreshContext';

export default function ResidentsPage() {
  return (
    <RefreshProvider>
      <div>
        <h1>Organizations</h1>
        <OrganizationsTable />
      </div>
    </RefreshProvider>
  );
}
