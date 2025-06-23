import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import { AppConfig } from './config';
import { SnackbarProvider } from 'notistack';

import ResidentsPage from './pages/Residents';
import OrganizationsPage from './pages/Organizations';
import CallHistoryPage from './components/CallHistoryTable';
import OrganizationDetailPage from './pages/OrganizationDetailPage';
import Dashboard from './pages/Dashboard';

function App() {
  console.log('App rendering, AppConfig:', AppConfig);

  return (
    <SnackbarProvider maxSnack={3} anchorOrigin={{ vertical: 'top', horizontal: 'right' }}>
      <BrowserRouter>
        <div style={{ display: 'flex' }}>
          <Sidebar menuItems={AppConfig.menuItems} />

          <div style={{ flexGrow: 1, padding: '20px' }}>
            <Routes>
              <Route path="/" element={<h1>Welcome to Admin Dashboard</h1>} />
              <Route path="/home" element={<Dashboard />} />
              <Route path="/Residents" element={<ResidentsPage />} />
              <Route path="/Organizations" element={<OrganizationsPage />} />
              <Route path="/CallHistory" element={<CallHistoryPage />} />
              <Route path="/organization/:orgId" element={<OrganizationDetailPage />} />
            </Routes>
        </div>
      </div>
      </BrowserRouter >
    </SnackbarProvider>
  );
}

export default App
