import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import { AppConfig } from './config';

import ResidentsPage from './pages/Residents';
import OrganizationsPage from './pages/Organizations';
import CallHistoryPage from './components/CallHistoryTable';

function App() {
  console.log('App rendering, AppConfig:', AppConfig);

  return (
    <BrowserRouter>
      <div style={{ display: 'flex' }}>
        <Sidebar menuItems={AppConfig.menuItems} />

        <div style={{ flexGrow: 1, padding: '20px' }}>
          <Routes>
            <Route path="/" element={<h1>Welcome to Admin Dashboard</h1>} />
            <Route path="/Residents" element={<ResidentsPage />} />
            <Route path="/Organizations" element={<OrganizationsPage />} />
            <Route path="/CallHistory" element={<CallHistoryPage />} />
          </Routes>
      </div>
    </div>
    </BrowserRouter >
  );
}

export default App
