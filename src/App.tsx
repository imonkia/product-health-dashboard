import React from 'react';
import styled from 'styled-components';
import { PieChart, Pie, Cell, Legend, ResponsiveContainer } from 'recharts';
import DashboardTable from './components/Dashboard/DashboardTable.tsx';
import AppView from './components/AppView/AppView.tsx';
import { BrowserRouter as Router, Route, Routes, Navigate, useParams, Link as RouterLink } from 'react-router-dom';

const AppContainer = styled.div`
  display: flex;
  height: 100vh;
  background: #f4f6fa;
`;

const Sidebar = styled.div`
  width: 260px;
  background: #232e3c;
  color: #fff;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 24px 0;
`;

const Logo = styled.div`
  font-size: 2rem;
  font-weight: bold;
  margin-bottom: 32px;
  letter-spacing: 2px;
`;

const Main = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
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

function App() {
  return (
    <Router>
      <AppContainer>
        <Sidebar>
          <RouterLink to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
            <Logo>Pulseboard</Logo>
          </RouterLink>
          <PieChartContainer>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={complianceData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  innerRadius={15}
                  outerRadius={35}
                  label={({ percent }) => `${Math.round((percent ?? 0) * 100)}%`}
                >
                  {complianceData.map((entry, idx) => (
                    <Cell key={`cell-${idx}`} fill={entry.color} />
                  ))}
                </Pie>
                <Legend verticalAlign="bottom" height={36} iconType="circle"/>
              </PieChart>
            </ResponsiveContainer>
            <PieChartLabel>Overall Compliance</PieChartLabel>
          </PieChartContainer>
        </Sidebar>
        <Main>
          <Dashboard>
            <Routes>
              <Route path="/" element={<DashboardTable />} />
              <Route path="/apps/:appId" element={<AppView />} />
            </Routes>
          </Dashboard>
        </Main>
      </AppContainer>
    </Router>
  );
}
export default App;
