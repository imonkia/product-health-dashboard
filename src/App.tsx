import React from 'react';
import styled from 'styled-components';
import { PieChart, Pie, Cell, Legend, ResponsiveContainer } from 'recharts';
import DashboardTable from './components/Dashboard/DashboardTable.tsx';
import AppView from './components/AppView/AppView.tsx';
import EditApp from './components/Administration/EditApp.tsx';
import Sidebar from './components/Sidebar/Sidebar.tsx';
import { BrowserRouter as Router, Route, Routes, Navigate, useParams, Link as RouterLink, useLocation } from 'react-router-dom';

const AppContainer = styled.div`
  display: flex;
  height: 100vh;
  background: #f4f6fa;
`;

const Main = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  margin-left: 260px;
`;

const Dashboard = styled.div`
  flex: 1;
  padding: 32px;
  overflow: auto;
`;

const complianceData = [
  { name: 'Compliant', value: 88, color: '#3ec46d' },
  { name: 'Not compliant', value: 12, color: '#b0b0b0' },
];

const PieChartContainer = styled.div`
  width: 180px;
  height: 180px;
  margin: 32px 0 0 0;
  padding: 12px;
  background: #fff;
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  box-shadow: 0 2px 8px rgba(0,0,0,0.04);
`;

const PieChartLabel = styled.div`
  margin-top: 12px;
  font-size: 1rem;
  color: #232e3c;
  font-weight: 500;
`;

function AppContent() {
  const location = useLocation();
  const showPieChart = location.pathname === '/';
  
  // Determine active section based on current route
  let activeSection: 'dashboard' | 'admin' = 'dashboard';
  if (location.pathname === '/admin') {
    activeSection = 'admin';
  }

  return (
    <AppContainer>
      <Sidebar showPieChart={showPieChart} activeSection={activeSection} />
      <Main>
        <Dashboard>
          <Routes>
            <Route path="/" element={<DashboardTable />} />
            <Route path="/apps/:appId" element={<RedirectToTabIndex0 />} />
            <Route path="/apps/:appId/:tabIndex" element={<AppView />} />
            <Route path="/admin" element={<EditApp />} />
          </Routes>
        </Dashboard>
      </Main>
    </AppContainer>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

// Helper component for redirecting /apps/:appId to /apps/:appId/0
function RedirectToTabIndex0() {
  const { appId } = useParams();
  return <Navigate to={`/apps/${appId}/0`} replace />;
}

export default App;
