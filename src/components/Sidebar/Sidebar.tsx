import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { Cell, Legend, Pie, PieChart, ResponsiveContainer } from 'recharts';

interface SidebarProps {
  showPieChart?: boolean;
  activeSection?: 'dashboard' | 'admin';
  activeTab?: 'groups' | 'users';
}

const SidebarContainer = styled.div`
  width: 260px;
  background: #213448;
  color: #fff;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 24px 0;
  height: 100vh;
  position: fixed;
  left: 0;
  top: 0;
  z-index: 100;
`;

const Logo = styled(Link)`
  font-size: 2rem;
  font-weight: bold;
  margin-bottom: 32px;
  letter-spacing: 2px;
  color: white;
  text-decoration: none;
`;

const NavButton = styled(Link)<{ active?: boolean }>`
  width: 200px;
  padding: 12px 16px;
  margin: 4px 0;
  background: ${({ active }) => (active ? '#3b5998' : 'transparent')};
  color: #fff;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  text-align: left;
  font-size: 16px;
  transition: background 0.2s;
  text-decoration: none;
  display: block;
  &:hover {
    background: ${({ active }) => (active ? '#3b5998' : '#2c3e50')};
    text-decoration: none;
    color: #fff;
  }
`;

const ToggleContainer = styled.div`
  display: flex;
  width: 200px;
  margin: 16px 0;
  background: #2c3e50;
  border-radius: 6px;
  padding: 2px;
`;

const ToggleButton = styled.button<{ active?: boolean }>`
  flex: 1;
  padding: 8px 12px;
  background: ${({ active }) => (active ? '#1976d2' : 'transparent')};
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  transition: background 0.2s;
`;

const SearchInput = styled.input`
  width: 200px;
  padding: 8px 12px;
  margin: 16px 0;
  border: 1px solid #2c3e50;
  border-radius: 6px;
  background: #2c3e50;
  color: #fff;
  font-size: 14px;
  &::placeholder {
    color: #bdc3c7;
  }
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

const Sidebar: React.FC<SidebarProps> = ({ 
  showPieChart = false, 
  activeSection = 'dashboard',
  activeTab = 'groups'
}) => {
  return (
    <SidebarContainer>
      <Logo to="/">Pulseboard</Logo>
      
      {activeSection === 'admin' && (
        <>
          <div style={{ marginTop: 'auto', padding: '16px' }}>
            <div style={{ color: '#bdc3c7', fontSize: '12px' }}>IS&T</div>
          </div>
        </>
      )}
      
      {showPieChart && (
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
      )}
    </SidebarContainer>
  );
};

export default Sidebar; 