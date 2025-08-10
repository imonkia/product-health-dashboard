import React from 'react';
import styled from 'styled-components';
import DashboardTable from './components/Dashboard/DashboardTable.tsx';
import AppView from './components/AppView/AppView.tsx';
import EditApp from './components/Administration/EditApp.tsx';
import AddApp from './components/Administration/AddApp.tsx';
import Sidebar from './components/Sidebar/Sidebar.tsx';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';

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

function AppContent() {
  const location = useLocation();
  const showPieChart = location.pathname === '/';

  return (
    <AppContainer>
      <Sidebar showPieChart={showPieChart} />
      <Main>
        <Dashboard>
          <Routes>
            <Route path="/" element={<DashboardTable />} />
            <Route path="/apps/:appId" element={<AppView />} />
            <Route path="/admin" element={<EditApp />} />
            <Route path="/add-app" element={<AddApp />} />
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

export default App;
