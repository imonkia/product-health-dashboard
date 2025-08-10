import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { Cell, Legend, Pie, PieChart, ResponsiveContainer } from 'recharts';
import { apiService } from '../../services/api.ts';

interface SidebarProps {
  showPieChart?: boolean;
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

const PieChartContainer = styled.div`
  width: 180px;
  height: 280px;
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

const AddAppButton = styled(Link)`
  width: 180px;
  padding: 12px 16px;
  margin: 48px 0 0 0;
  background: #fff;
  color: #213448;
  border: none;
  border-radius: 12px;
  cursor: pointer;
  text-align: center;
  font-size: 16px;
  font-weight: 500;
  transition: all 0.2s ease;
  text-decoration: none;
  display: block;
  box-shadow: 0 2px 8px rgba(0,0,0,0.04);
  
  &:hover {
    background: #f8f9fa;
    color: #2c3e50;
    text-decoration: none;
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(0,0,0,0.08);
  }
`;

const Sidebar: React.FC<SidebarProps> = ({ 
  showPieChart = false, 
}) => {
  const [complianceData, setComplianceData] = useState([
    { name: 'Compliant', value: 0, color: '#3ec46d' },
    { name: 'Not compliant', value: 0, color: '#e53935' },
  ]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (showPieChart) {
      fetchComplianceData();
    }
  }, [showPieChart]);

  const fetchComplianceData = async () => {
    try {
      setLoading(true);
      const applications = await apiService.getApplications();
      
      const compliantCount = applications.filter(app => app.compliance?.compliant).length;
      const nonCompliantCount = applications.filter(app => !app.compliance?.compliant).length;
      
      const total = applications.length;
      const compliantPercentage = total > 0 ? Math.round((compliantCount / total) * 100) : 0;
      const nonCompliantPercentage = total > 0 ? Math.round((nonCompliantCount / total) * 100) : 0;
      
      setComplianceData([
        { name: 'Compliant', value: compliantPercentage, color: '#3ec46d' },
        { name: 'Not compliant', value: nonCompliantPercentage, color: '#e53935' },
      ]);
    } catch (error) {
      console.error('Error fetching compliance data:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SidebarContainer>
      <Logo to="/">Pulseboard</Logo>
      
      {showPieChart && (
        <>
          <PieChartContainer>
            <PieChartLabel>Overall Compliance</PieChartLabel>
            {loading ? (
              <div style={{ textAlign: 'center', color: '#232e3c' }}>
                <div>Loading...</div>
              </div>
            ) : (
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
            )}
          </PieChartContainer>
          
          <AddAppButton to="/admin">
            Add App
          </AddAppButton>
        </>
      )}
    </SidebarContainer>
  );
};

export default Sidebar; 