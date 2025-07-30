import React, { useState } from 'react';
import styled from 'styled-components';
import DowntimeBody from './Downtime/DowntimeBody.tsx';
import IssuesBody from './Issues/IssuesBody.tsx';
import VulnerabilitiesBody from './Vulnerabilities/VulnerabilitiesBody.tsx';
import PatchingBody from './Patching/PatchingBody.tsx';

interface MainBodyProps {
  appIssues?: any[];
  appVulnerabilities?: any[];
  appPatching?: any[];
  appDowntime?: any[];
}

const TABS = [
  { label: 'Issues', component: IssuesBody },
  { label: 'Vulnerabilities', component: VulnerabilitiesBody },
  { label: 'Patching', component: PatchingBody },
  { label: 'Downtime', component: DowntimeBody },
];

const Container = styled.div`
  background: #fff;
  border-bottom-right-radius: 12px;
  border-bottom-left-radius: 12px;
  margin-top: 0;
  box-shadow: 0 2px 8px rgba(0,0,0,0.04);
`;

const TabsRow = styled.div`
  display: flex;
  border-bottom: 1px solid #e0e0e0;
  padding: 0 2rem;
  height: 48px;
  align-items: flex-end;
`;

const TabButton = styled.button<{ active: boolean }>`
  background: none;
  border: none;
  border-bottom: ${({ active }) => (active ? '3px solid #1976d2' : '3px solid transparent')};
  color: ${({ active }) => (active ? '#222' : '#888')};
  font-weight: ${({ active }) => (active ? 600 : 400)};
  font-size: 16px;
  padding: 0 18px;
  height: 44px;
  cursor: pointer;
  outline: none;
  transition: color 0.2s, border-bottom 0.2s;
`;

const TabContent = styled.div`
  padding: 2rem;
`;

const MainBody: React.FC<MainBodyProps> = ({ 
  appIssues = [], 
  appVulnerabilities = [], 
  appPatching = [], 
  appDowntime = [] 
}) => {
  const [activeTab, setActiveTab] = useState(0);
  const ActiveComponent = TABS[activeTab].component;

  return (
    <Container>
      <TabsRow>
        {TABS.map((tab, idx) => (
          <TabButton
            key={tab.label}
            active={activeTab === idx}
            onClick={() => setActiveTab(idx)}
          >
            {tab.label}
          </TabButton>
        ))}
      </TabsRow>
      <TabContent>
        <ActiveComponent 
          appIssues={appIssues}
          appVulnerabilities={appVulnerabilities}
          appPatching={appPatching}
          appDowntime={appDowntime}
        />
      </TabContent>
    </Container>
  );
};

export default MainBody;
