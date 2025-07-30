import React, { useState } from 'react';
import styled from 'styled-components';
import Sidebar from '../Sidebar/Sidebar.tsx';
import { useSearchParams } from 'react-router-dom';

const Container = styled.div`
  display: flex;
  height: 100vh;
  background: #f4f6fa;
`;

const MainContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`;

const Header = styled.div`
  background: #1976d2;
  color: #fff;
  padding: 20px 32px;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  border-top-right-radius: 12px;
  border-top-left-radius: 12px;
`;

const HeaderTitle = styled.h1`
  font-size: 28px;
  font-weight: bold;
  margin: 0;
`;

const LastUpdates = styled.div`
  font-size: 12px;
  opacity: 0.7;
`;

const ContentArea = styled.div`
  flex: 1;
  overflow-y: auto;
`;

const Section = styled.div`
  background: #fff;
  border-bottom-right-radius: 12px;
  border-bottom-left-radius: 12px;
  padding: 24px;
  margin-bottom: 24px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.04);
`;

const SectionTitle = styled.h2`
  font-size: 20px;
  font-weight: 600;
  margin: 0 0 24px 0;
  color: #232e3c;
`;

const FormGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24px;
  margin-bottom: 24px;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
`;

const Label = styled.label`
  font-size: 14px;
  font-weight: 500;
  color: #232e3c;
  margin-bottom: 8px;
`;

const Input = styled.input`
  padding: 12px 16px;
  border: 1px solid #e0e0e0;
  border-radius: 6px;
  font-size: 14px;
  background: #fff;
  &:focus {
    outline: none;
    border-color: #1976d2;
  }
`;

const TextArea = styled.textarea`
  padding: 12px 16px;
  border: 1px solid #e0e0e0;
  border-radius: 6px;
  font-size: 14px;
  background: #fff;
  min-height: 80px;
  resize: vertical;
  &:focus {
    outline: none;
    border-color: #1976d2;
  }
`;

const CheckboxContainer = styled.div`
  display: flex;
  align-items: center;
  margin: 16px 0;
`;

const Checkbox = styled.input`
  margin-right: 12px;
  transform: scale(1.2);
`;

const Select = styled.select`
  padding: 8px 12px;
  border: 1px solid #e0e0e0;
  border-radius: 6px;
  font-size: 14px;
  background: #fff;
  margin-left: 12px;
`;

const AccordionHeader = styled.div<{ expanded: boolean }>`
  display: flex;
  align-items: center;
  cursor: pointer;
  font-size: 18px;
  font-weight: 600;
  color: #1976d2;
  padding: 16px 0;
  user-select: none;
  transition: color 0.2s;
  &:hover {
    color: #1565c0;
  }
`;

const AccordionCaret = styled.span<{ expanded: boolean }>`
  display: inline-block;
  margin-right: 8px;
  font-size: 16px;
  transform: rotate(${({ expanded }) => (expanded ? 90 : 0)}deg);
  transition: transform 0.2s;
`;

const AccordionContent = styled.div<{ expanded: boolean }>`
  display: ${({ expanded }) => (expanded ? 'block' : 'none')};
  padding: 16px 0;
  border-top: 1px solid #e0e0e0;
`;

const LinksTable = styled.div`
  margin-top: 16px;
`;

const LinkRow = styled.div`
  display: grid;
  grid-template-columns: 40px 1fr 1fr 2fr;
  gap: 16px;
  align-items: center;
  padding: 12px 0;
  border-bottom: 1px solid #f0f0f0;
  &:last-child {
    border-bottom: none;
  }
`;

const DeleteButton = styled.button`
  background: none;
  border: none;
  color: #e74c3c;
  cursor: pointer;
  font-size: 18px;
  font-weight: bold;
  padding: 0;
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  &:hover {
    color: #c0392b;
  }
`;

const AddLinkButton = styled.button`
  background: none;
  border: none;
  color: #1976d2;
  cursor: pointer;
  font-size: 14px;
  text-decoration: underline;
  margin-top: 16px;
  &:hover {
    color: #1565c0;
  }
`;

const ActionButtons = styled.div`
  display: flex;
  gap: 16px;
  justify-content: flex-end;
  margin-top: 32px;
`;

const SaveButton = styled.button`
  background: #1976d2;
  color: #fff;
  border: none;
  padding: 12px 24px;
  border-radius: 6px;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  &:hover {
    background: #1565c0;
  }
`;

const DeleteAppButton = styled.button`
  background: #e74c3c;
  color: #fff;
  border: none;
  padding: 12px 24px;
  border-radius: 6px;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  &:hover {
    background: #c0392b;
  }
`;

const EditApp: React.FC = () => {
  const [searchParams] = useSearchParams();
  const appName = searchParams.get('appName') || 'App';
  
  const [kpisExpanded, setKpisExpanded] = useState(true);
  const [linksExpanded, setLinksExpanded] = useState(false);
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [p0p1cP2hIncidents, setP0p1cP2hIncidents] = useState(true);
  const [includeInitialCi, setIncludeInitialCi] = useState(false);
  const [supportHours, setSupportHours] = useState(true);

  const links = [
    { order: 1, category: 'CST', linkName: 'Test 25', linkUrl: 'https://www.apple.com' },
    { order: 2, category: 'Database', linkName: 'Test 31', linkUrl: 'http://www.apple.com' },
    { order: 3, category: 'Link sorting', linkName: 'Testing Link Sorting', linkUrl: 'https://apple.com' },
    { order: 4, category: 'Splunk Dashboards - Comms', linkName: 'Content Dashboard', linkUrl: 'https://splunk-ist.corp.apple.com/en-US/app/search/' },
    { order: 5, category: 'Splunk Dashboards - Learning', linkName: 'Asset Dashboard', linkUrl: 'apple.com' },
  ];

  return (
    <Container>
      <Sidebar activeSection="admin" activeTab="groups" />
      <MainContent>
        <Header>
          <div>
            <HeaderTitle>{appName}</HeaderTitle>
          </div>
          <LastUpdates>Last_Updates</LastUpdates>
        </Header>
        <ContentArea>
          <Section>
            <SectionTitle>Required</SectionTitle>
            <FormGrid>
              <div>
                <FormGroup>
                  <Label>App Name</Label>
                  <Input defaultValue={appName} />
                </FormGroup>
                <FormGroup>
                  <Label>CI Name</Label>
                  <Input defaultValue={appName} />
                </FormGroup>
                <FormGroup>
                  <Label>Category</Label>
                  <Input defaultValue="Retail" />
                </FormGroup>
                <FormGroup>
                  <Label>ksys</Label>
                  <Input defaultValue="" />
                </FormGroup>
              </div>
              <div>
                <FormGroup>
                  <Label>HCL App Id</Label>
                  <Input defaultValue="57166" readOnly />
                </FormGroup>
                <FormGroup>
                  <Label>CI Code</Label>
                  <Input defaultValue="6f329b8ec3145200e4868d4fed5d7578" readOnly />
                </FormGroup>
                <FormGroup>
                  <Label>Radar Component</Label>
                  <Input defaultValue={appName} readOnly />
                </FormGroup>
                <FormGroup>
                  <Label>ISDB UUID</Label>
                  <Input defaultValue="12345678" readOnly />
                </FormGroup>
              </div>
            </FormGrid>
            
            <SectionTitle>Optional</SectionTitle>
            
            <FormGroup>
              <Label>Custom Keywords</Label>
              <TextArea defaultValue="ima-test-keyword,ima-test-keyword-2" />
              <div style={{ fontSize: '12px', color: '#666', marginTop: '8px' }}>
                Incidents or radars that include custom keywords will be automatically imported to the compliance section of the issues tab.
              </div>
            </FormGroup>

            <CheckboxContainer>
              <Checkbox
                type="checkbox"
                checked={emailNotifications}
                onChange={(e) => setEmailNotifications(e.target.checked)}
              />
              <span>Email Notifications</span>
              <Select value="Monthly">
                <option>Monthly</option>
                <option>Weekly</option>
                <option>Daily</option>
              </Select>
            </CheckboxContainer>

            <AccordionHeader expanded={kpisExpanded} onClick={() => setKpisExpanded(!kpisExpanded)}>
              <AccordionCaret expanded={kpisExpanded}>▶</AccordionCaret>
              KPIs
            </AccordionHeader>
            <AccordionContent expanded={kpisExpanded}>
              <CheckboxContainer>
                <Checkbox
                  type="checkbox"
                  checked={p0p1cP2hIncidents}
                  onChange={(e) => setP0p1cP2hIncidents(e.target.checked)}
                />
                <span>P0/P1C/P2H Incidents</span>
              </CheckboxContainer>
              <CheckboxContainer>
                <Checkbox
                  type="checkbox"
                  checked={includeInitialCi}
                  onChange={(e) => setIncludeInitialCi(e.target.checked)}
                />
                <span>Include "Initial CI"</span>
              </CheckboxContainer>
            </AccordionContent>

            <CheckboxContainer>
              <Checkbox
                type="checkbox"
                checked={supportHours}
                onChange={(e) => setSupportHours(e.target.checked)}
              />
              <span>Support Hours</span>
            </CheckboxContainer>
            <div style={{ marginLeft: '24px', marginTop: '8px' }}>
              <Label>APS Workgroup</Label>
              <Input defaultValue="APS ECM Support" />
            </div>

            <AccordionHeader expanded={linksExpanded} onClick={() => setLinksExpanded(!linksExpanded)}>
              <AccordionCaret expanded={linksExpanded}>▶</AccordionCaret>
              Links
            </AccordionHeader>
            <AccordionContent expanded={linksExpanded}>
              <LinksTable>
                <div style={{ display: 'grid', gridTemplateColumns: '40px 1fr 1fr 2fr', gap: '16px', padding: '12px 0', borderBottom: '2px solid #e0e0e0', fontWeight: '600', fontSize: '14px' }}>
                  <div></div>
                  <div>Category</div>
                  <div>Link Name</div>
                  <div>Link Url</div>
                </div>
                {links.map((link, index) => (
                  <LinkRow key={index}>
                    <DeleteButton>×</DeleteButton>
                    <Input defaultValue={link.order} style={{ width: '60px' }} />
                    <Input defaultValue={link.category} />
                    <Input defaultValue={link.linkName} />
                    <Input defaultValue={link.linkUrl} />
                  </LinkRow>
                ))}
                <AddLinkButton>+ Add new link</AddLinkButton>
              </LinksTable>
            </AccordionContent>
          </Section>

          <ActionButtons>
            <SaveButton>Save</SaveButton>
            <DeleteAppButton>Delete</DeleteAppButton>
          </ActionButtons>
        </ContentArea>
      </MainContent>
    </Container>
  );
};

export default EditApp; 