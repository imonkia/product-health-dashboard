import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Sidebar from '../Sidebar/Sidebar.tsx';
import { useSearchParams } from 'react-router-dom';
import { apiService } from '../../services/api.ts';
import Toaster from '../Toaster/Toaster.tsx';

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
  margin-right: 12px;
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
  margin-bottom: 12px;
`;

const TextArea = styled.textarea`
  padding: 12px 16px;
  border: 1px solid #e0e0e0;
  border-radius: 6px;
  font-size: 14px;
  background: #fff;
  min-height: 20px;
  resize: vertical;
  &:focus {
    outline: none;
    border-color: #1976d2;
  }
`;

const CheckboxContainer = styled.div`
  display: flex;
  align-items: center;
  margin: 8px 0;
  padding: 0 12px;
  gap: 8px;
`;

const Checkbox = styled.input`
  margin: 0;
`;

const Select = styled.select`
  padding: 6px 12px;
  border: 1px solid #e0e0e0;
  border-radius: 4px;
  font-size: 14px;
  background: #fff;
  margin-left: 8px;
`;

const NestedCheckboxContainer = styled.div<{ disabled: boolean }>`
  display: flex;
  align-items: center;
  gap: 8px;
  margin: 8px 0 8px 36px;
  opacity: ${({ disabled }) => (disabled ? 0.5 : 1)};
  pointer-events: ${({ disabled }) => (disabled ? 'none' : 'auto')};
`;

const AccordionHeader = styled.div<{ expanded: boolean }>`
  display: flex;
  align-items: center;
  cursor: pointer;
  font-size: 18px;
  font-weight: 600;
  color: #1976d2;
  background: none;
  border: none;
  padding: 12px 0;
  user-select: none;
  transition: background 0.15s;
  &:hover {
    background: #f5faff;
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
`;

const LinksTable = styled.div`
  margin-top: 16px;
`;

const LinkRow = styled.div`
  display: grid;
  grid-template-columns: 10px 40px repeat(3, 1fr);
  gap: 16px;
  align-items: center;
  margin-bottom: 12px;
`;

const DeleteButton = styled.button`
  background: #e74c3c;
  color: #fff;
  border: none;
  border-radius: 50%;
  font-weight: bold;
  padding: 0;
  width: 14px;
  height: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-size: 16px;
  &:hover {
    background: #c0392b;
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
  justify-content: flex-start;
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
  &:disabled {
    background: #ccc;
    cursor: not-allowed;
    &:hover {
      background: #ccc;
    }
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

const LoadingMessage = styled.div`
  text-align: center;
  padding: 20px;
  color: #666;
`;

const ErrorMessage = styled.div`
  color: #e53935;
  text-align: center;
  padding: 20px;
`;

interface Link {
  order: number;
  category: string;
  linkName: string;
  linkUrl: string;
}

const EditApp: React.FC = () => {
  const [searchParams] = useSearchParams();
  const appId = searchParams.get('appId');
  const appName = searchParams.get('appName') || 'App';
  
  const [kpisExpanded, setKpisExpanded] = useState(true);
  const [linksExpanded, setLinksExpanded] = useState(false);
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [p0p1cP2hIncidents, setP0p1cP2hIncidents] = useState(true);
  const [includeInitialCi, setIncludeInitialCi] = useState(false);
  const [supportHours, setSupportHours] = useState(true);
  
  // Form state
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    groupName: '',
    gatehouseCheckin: false,
    gatehouseCheckinDate: '',
    customKeywords: '',
    emailNotificationFrequency: 'Monthly',
    abcWorkgroup: ''
  });
  
  // API state
  const [links, setLinks] = useState<Link[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  
  // Toaster state
  const [toasterMessage, setToasterMessage] = useState('');
  const [toasterType, setToasterType] = useState<'success' | 'error'>('success');
  const [toasterVisible, setToasterVisible] = useState(false);

  useEffect(() => {
    const fetchAppData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        if (!appId) {
          setError('No application ID provided');
          setLoading(false);
          return;
        }
        
        // Fetch application data including links
        const appData = await apiService.getApplication(appId);
        
        if (appData) {
          setLinks(appData.links || []);
          setFormData({
            name: appData.name || '',
            category: appData.category || '',
            groupName: appData.groupName || '',
            gatehouseCheckin: appData.gatehouseCheckin || false,
            gatehouseCheckinDate: appData.gatehouseCheckinDate || '',
            customKeywords: appData.customKeywords || '',
            emailNotificationFrequency: appData.emailNotificationFrequency || 'Monthly',
            abcWorkgroup: appData.abcWorkgroup || ''
          });
          setEmailNotifications(appData.emailNotifications || false);
          setP0p1cP2hIncidents(appData.p0p1cP2hIncidents || false);
          setIncludeInitialCi(appData.includeInitialCi || false);
          setSupportHours(appData.supportHours || false);
        } else {
          setLinks([]);
        }
        
      } catch (error) {
        console.error('Error fetching app data:', error);
        setError('Failed to load application data. Please try again.');
        setLinks([]);
      } finally {
        setLoading(false);
      }
    };

    fetchAppData();
  }, [appId]);

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSave = async () => {
    try {
      setSaving(true);
      setError(null);
      setSaveSuccess(false);
      
      if (!appId) {
        setToasterMessage('No application ID provided');
        setToasterType('error');
        setToasterVisible(true);
        return;
      }
      
      // Prepare update data
      const updateData = {
        ...formData,
        links,
        emailNotifications,
        p0p1cP2hIncidents,
        includeInitialCi,
        supportHours
      };
      
      // Call API to update application
      await apiService.updateApplication(appId, updateData);
      
      // Also update the opex data name if it changed
      try {
        await apiService.updateOpexData(appId, { name: formData.name });
      } catch (error) {
        console.error('Error updating opex data name:', error);
        // Don't fail the save if opex update fails
      }
      
      setToasterMessage('Application saved successfully!');
      setToasterType('success');
      setToasterVisible(true);
      
    } catch (error) {
      console.error('Error saving application:', error);
      setToasterMessage('Failed to save application. Please try again.');
      setToasterType('error');
      setToasterVisible(true);
    } finally {
      setSaving(false);
    }
  };

  const handleLinkChange = (index: number, field: keyof Link, value: any) => {
    const updatedLinks = [...links];
    updatedLinks[index] = {
      ...updatedLinks[index],
      [field]: field === 'order' ? parseInt(value) || 0 : value
    };
    setLinks(updatedLinks);
  };

  const handleAddLink = () => {
    const newLink: Link = {
      order: links.length + 1,
      category: '',
      linkName: '',
      linkUrl: ''
    };
    setLinks([...links, newLink]);
  };

  const handleDeleteLink = (index: number) => {
    const updatedLinks = links.filter((_, i) => i !== index);
    // Reorder remaining links
    const reorderedLinks = updatedLinks.map((link, i) => ({
      ...link,
      order: i + 1
    }));
    setLinks(reorderedLinks);
  };

  const handleToasterClose = () => {
    setToasterVisible(false);
  };

  if (loading) {
    return (
      <Container>
        <Sidebar activeSection="admin" activeTab="groups" />
        <MainContent>
          <Header>
            <div>
              <HeaderTitle>{formData.name || appName}</HeaderTitle>
            </div>
            <LastUpdates>Loading...</LastUpdates>
          </Header>
          <ContentArea>
            <LoadingMessage>Loading application data...</LoadingMessage>
          </ContentArea>
        </MainContent>
      </Container>
    );
  }

  if (error) {
    return (
      <Container>
        <Sidebar activeSection="admin" activeTab="groups" />
        <MainContent>
          <Header>
            <div>
              <HeaderTitle>{formData.name || appName}</HeaderTitle>
            </div>
            <LastUpdates>Error</LastUpdates>
          </Header>
          <ContentArea>
            <ErrorMessage>{error}</ErrorMessage>
          </ContentArea>
        </MainContent>
      </Container>
    );
  }

  return (
    <Container>
      <Sidebar activeSection="admin" activeTab="groups" />
      <MainContent>
        <Header>
          <div>
            <HeaderTitle>{formData.name || appName}</HeaderTitle>
          </div>
          <LastUpdates>
            {saveSuccess ? 'Just updated' : 'Last_Updates'}
          </LastUpdates>
        </Header>
        <ContentArea>
          <Section>
            <SectionTitle>Required</SectionTitle>
            <FormGrid>
              <div>
                <FormGroup>
                  <Label>App Name</Label>
                  <Input 
                    value={formData.name} 
                    onChange={(e) => handleInputChange('name', e.target.value)} 
                  />
                </FormGroup>
                <FormGroup>
                  <Label>Internal Name</Label>
                  <Input 
                    value={formData.name} 
                    onChange={(e) => handleInputChange('name', e.target.value)} 
                  />
                </FormGroup>
                <FormGroup>
                  <Label>Category</Label>
                  <Input 
                    value={formData.category} 
                    onChange={(e) => handleInputChange('category', e.target.value)} 
                  />
                </FormGroup>
                <FormGroup>
                  <Label>pulsesys</Label>
                  <Input 
                    value={formData.groupName} 
                    onChange={(e) => handleInputChange('groupName', e.target.value)} 
                  />
                </FormGroup>
              </div>
              <div>
                <FormGroup>
                  <Label>Gatehouse Checkin</Label>
                  <Input 
                    value={formData.gatehouseCheckinDate} 
                    onChange={(e) => handleInputChange('gatehouseCheckinDate', e.target.value)} 
                  />
                </FormGroup>
                <FormGroup>
                  <Label>Gatehouse Checkin Date</Label>
                  <Input 
                    value={formData.gatehouseCheckinDate} 
                    onChange={(e) => handleInputChange('gatehouseCheckinDate', e.target.value)} 
                  />
                </FormGroup>
              </div>
            </FormGrid>
            
            <SectionTitle>Optional</SectionTitle>
            
            <FormGroup>
              <Label>Custom Keywords</Label>
              <TextArea 
                value={formData.customKeywords} 
                onChange={(e) => handleInputChange('customKeywords', e.target.value)} 
              />
              <div style={{ fontSize: '12px', color: '#666', marginTop: '8px' }}>
                Incidents or trackers that include custom keywords will be automatically imported to the compliance section of the issues tab.
              </div>
            </FormGroup>

            <CheckboxContainer>
              <Checkbox
                type="checkbox"
                checked={emailNotifications}
                onChange={(e) => setEmailNotifications(e.target.checked)}
                style={{ marginLeft: '-12px' }}
              />
              <span>Email Notifications</span>
              <Select 
                value={formData.emailNotificationFrequency}
                onChange={(e) => handleInputChange('emailNotificationFrequency', e.target.value)}
              >
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
              <NestedCheckboxContainer disabled={!p0p1cP2hIncidents}>
                <Checkbox
                  type="checkbox"
                  checked={includeInitialCi}
                  onChange={(e) => setIncludeInitialCi(e.target.checked)}
                  disabled={!p0p1cP2hIncidents}
                />
                <span>Include "Initial CI"</span>
              </NestedCheckboxContainer>
              <CheckboxContainer>
                <Checkbox
                  type="checkbox"
                  checked={supportHours}
                  onChange={(e) => setSupportHours(e.target.checked)}
                />
                <span>Support Hours</span>
              </CheckboxContainer>
              <NestedCheckboxContainer disabled={!supportHours}>
                <div style={{ display: 'flex', flexDirection: 'column', width: '30%' }}>
                  <Label>ABC Workgroup</Label>
                  <Input 
                    value={formData.abcWorkgroup} 
                    onChange={(e) => handleInputChange('abcWorkgroup', e.target.value)} 
                    disabled={!supportHours} 
                  />
                </div>
              </NestedCheckboxContainer>
            </AccordionContent>

            <AccordionHeader expanded={linksExpanded} onClick={() => setLinksExpanded(!linksExpanded)}>
              <AccordionCaret expanded={linksExpanded}>▶</AccordionCaret>
              Links
            </AccordionHeader>
            <AccordionContent expanded={linksExpanded}>
              <LinksTable>
                <div style={{ display: 'grid', gridTemplateColumns: '10px 40px repeat(3, 2fr)', gap: '16px', padding: '12px 0', fontWeight: '600', fontSize: '14px' }}>
                  <div></div>
                  <div>Order</div>
                  <div>Category</div>
                  <div>Link Name</div>
                  <div>Link Url</div>
                </div>
                {links.map((link, index) => (
                  <LinkRow key={index}>
                    <DeleteButton onClick={() => handleDeleteLink(index)}>×</DeleteButton>
                    <Input 
                      type="number" 
                      value={link.order} 
                      onChange={(e) => handleLinkChange(index, 'order', e.target.value)} 
                      style={{ width: '10px' }} 
                    />
                    <Input 
                      value={link.category} 
                      onChange={(e) => handleLinkChange(index, 'category', e.target.value)} 
                    />
                    <Input 
                      value={link.linkName} 
                      onChange={(e) => handleLinkChange(index, 'linkName', e.target.value)} 
                    />
                    <Input 
                      value={link.linkUrl} 
                      onChange={(e) => handleLinkChange(index, 'linkUrl', e.target.value)} 
                    />
                  </LinkRow>
                ))}
                <AddLinkButton onClick={handleAddLink}>+ Add new link</AddLinkButton>
              </LinksTable>
            </AccordionContent>
          </Section>

          <ActionButtons>
            <SaveButton onClick={handleSave} disabled={saving}>
              {saving ? 'Saving...' : 'Save'}
            </SaveButton>
            <DeleteAppButton>Delete</DeleteAppButton>
          </ActionButtons>
        </ContentArea>
        <Toaster 
          type={toasterType} 
          message={toasterMessage} 
          isVisible={toasterVisible}
          onClose={handleToasterClose} 
        />
      </MainContent>
    </Container>
  );
};

export default EditApp; 