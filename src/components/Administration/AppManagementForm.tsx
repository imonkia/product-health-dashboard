import React, { useState } from 'react';
import styled from 'styled-components';

interface Link {
  category: string;
  linkName: string;
  linkUrl: string;
}

interface AppManagementFormProps {
  formData: {
    name: string;
    category: string;
    groupName: string;
    gatehouseCheckin: boolean;
    gatehouseCheckinDate: string;
    customKeywords: string;
    emailNotificationFrequency: string;
    abcWorkgroup: string;
  };
  links: Link[];
  loading: boolean;
  error: string | null;
  saving: boolean;
  saveSuccess: boolean;
  onInputChange: (field: string, value: any) => void;
  onLinkChange: (index: number, field: keyof Link, value: any) => void;
  onAddLink: () => void;
  onDeleteLink: (index: number) => void;
  onSave: () => void;
  onDeleteApp: () => void;
}

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
  grid-template-columns: 18px repeat(3, 1fr);
  gap: 16px;
  align-items: center;
  padding: 12px 0;
`;

const DeleteButton = styled.button`
  background: #e74c3c;
  color: #fff;
  border: none;
  border-radius: 50%;
  font-weight: bold;
  padding: 0;
  width: 18px;
  height: 18px;
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

const AppManagementForm: React.FC<AppManagementFormProps> = ({
  formData,
  links,
  loading,
  error,
  saving,
  saveSuccess,
  onInputChange,
  onLinkChange,
  onAddLink,
  onDeleteLink,
  onSave,
  onDeleteApp
}) => {
  const [kpisExpanded, setKpisExpanded] = useState(false);
  const [linksExpanded, setLinksExpanded] = useState(false);
  const [emailNotifications, setEmailNotifications] = useState(false);
  const [p0p1cP2hIncidents, setP0p1cP2hIncidents] = useState(false);
  const [includeInitialCi, setIncludeInitialCi] = useState(false);
  const [supportHours, setSupportHours] = useState(false);

  if (loading) {
    return (
      <ContentArea>
        <LoadingMessage>Loading application data...</LoadingMessage>
      </ContentArea>
    );
  }

  if (error) {
    return (
      <ContentArea>
        <ErrorMessage>{error}</ErrorMessage>
      </ContentArea>
    );
  }

  return (
    <ContentArea>
      <Section>
        <SectionTitle>Required</SectionTitle>
        <FormGrid>
          <div>
            <FormGroup>
              <Label>App Name</Label>
              <Input 
                value={formData.name} 
                onChange={(e) => onInputChange('name', e.target.value)} 
              />
            </FormGroup>
            <FormGroup>
              <Label>Internal Name</Label>
              <Input 
                value={formData.name} 
                onChange={(e) => onInputChange('name', e.target.value)} 
              />
            </FormGroup>
            <FormGroup>
              <Label>Category</Label>
              <Input 
                value={formData.category} 
                onChange={(e) => onInputChange('category', e.target.value)} 
              />
            </FormGroup>
            <FormGroup>
              <Label>pulsesys</Label>
              <Input 
                value={formData.groupName} 
                onChange={(e) => onInputChange('groupName', e.target.value)} 
              />
            </FormGroup>
          </div>
          <div>
            <FormGroup>
              <Label>Gatehouse Checkin</Label>
              <Input 
                value={formData.gatehouseCheckinDate} 
                onChange={(e) => onInputChange('gatehouseCheckinDate', e.target.value)} 
              />
            </FormGroup>
            <FormGroup>
              <Label>Gatehouse Checkin Date</Label>
              <Input 
                value={formData.gatehouseCheckinDate} 
                onChange={(e) => onInputChange('gatehouseCheckinDate', e.target.value)} 
              />
            </FormGroup>
          </div>
        </FormGrid>
        
        <SectionTitle>Optional</SectionTitle>
        
        <FormGroup>
          <Label>Custom Keywords</Label>
          <TextArea 
            value={formData.customKeywords} 
            onChange={(e) => onInputChange('customKeywords', e.target.value)} 
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
            onChange={(e) => onInputChange('emailNotificationFrequency', e.target.value)}
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
              style={{ marginLeft: '-12px' }}
            />
            <span>P0/P1/C/P2H Incidents</span>
          </CheckboxContainer>
          
          <NestedCheckboxContainer disabled={!p0p1cP2hIncidents}>
            <Checkbox
              type="checkbox"
              checked={includeInitialCi}
              onChange={(e) => setIncludeInitialCi(e.target.checked)}
            />
            <span>Include Initial CI</span>
          </NestedCheckboxContainer>
          
          <CheckboxContainer>
            <Checkbox
              type="checkbox"
              checked={supportHours}
              onChange={(e) => setSupportHours(e.target.checked)}
              style={{ marginLeft: '-12px' }}
            />
            <span>Support Hours</span>
          </CheckboxContainer>
          
          <FormGroup>
            <Label>ABC Workgroup</Label>
            <Input 
              value={formData.abcWorkgroup} 
              onChange={(e) => onInputChange('abcWorkgroup', e.target.value)} 
            />
          </FormGroup>
        </AccordionContent>

        <AccordionHeader expanded={linksExpanded} onClick={() => setLinksExpanded(!linksExpanded)}>
          <AccordionCaret expanded={linksExpanded}>▶</AccordionCaret>
          Links
        </AccordionHeader>
        <AccordionContent expanded={linksExpanded}>
          <LinksTable>
            <div style={{ display: 'grid', gridTemplateColumns: '18px repeat(3, 1fr)', gap: '16px', padding: '12px 0', fontWeight: '600', color: '#666' }}>
              <div></div>
              <div>Category</div>
              <div>Link Name</div>
              <div>URL</div>
            </div>
            {links.map((link, index) => (
              <LinkRow key={index}>
                <DeleteButton onClick={() => onDeleteLink(index)}>×</DeleteButton>
                <Input
                  value={link.category}
                  onChange={(e) => onLinkChange(index, 'category', e.target.value)}
                  placeholder="Category"
                />
                <Input
                  value={link.linkName}
                  onChange={(e) => onLinkChange(index, 'linkName', e.target.value)}
                  placeholder="Link Name"
                />
                <Input
                  value={link.linkUrl}
                  onChange={(e) => onLinkChange(index, 'linkUrl', e.target.value)}
                  placeholder="URL"
                />
              </LinkRow>
            ))}
            <AddLinkButton onClick={onAddLink}>
              + Add Link
            </AddLinkButton>
          </LinksTable>
        </AccordionContent>
      </Section>

      <ActionButtons>
        <SaveButton onClick={onSave} disabled={saving}>
          {saving ? 'Saving...' : 'Save'}
        </SaveButton>
        <DeleteAppButton onClick={onDeleteApp}>Delete</DeleteAppButton>
      </ActionButtons>
    </ContentArea>
  );
};

export default AppManagementForm;
