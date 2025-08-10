import React, { useState } from 'react';
import styled from 'styled-components';
import Sidebar from '../Sidebar/Sidebar.tsx';
import { useNavigate } from 'react-router-dom';
import { apiService } from '../../services/api.ts';
import Toaster from '../Toaster/Toaster.tsx';
import Header from '../Header/Header.tsx';
import AppManagementForm from './AppManagementForm.tsx';

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

interface Link {
  category: string;
  linkName: string;
  linkUrl: string;
}

const AddApp: React.FC = () => {
  const navigate = useNavigate();
  
  // Form state - all fields empty by default
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
  const [saving, setSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  
  // Toaster state
  const [toasterMessage, setToasterMessage] = useState('');
  const [toasterType, setToasterType] = useState<'success' | 'error'>('success');
  const [toasterVisible, setToasterVisible] = useState(false);

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSave = async () => {
    try {
      setSaving(true);
      
      // Validate required fields
      if (!formData.name.trim()) {
        setToasterMessage('App name is required');
        setToasterType('error');
        setToasterVisible(true);
        return;
      }
      
      if (!formData.category.trim()) {
        setToasterMessage('Category is required');
        setToasterType('error');
        setToasterVisible(true);
        return;
      }
      
      // Prepare new app data (without ID - let backend generate it)
      const newAppData = {
        ...formData,
        links: sortLinks(links),
        compliance: {
          compliant: false,
          complianceSince: new Date().toISOString().split('T')[0]
        }
      };
      
      // Call API to create application
      console.log('Creating application with data:', newAppData);
      const createdApp = await apiService.createApplication(newAppData);
      console.log('Application created successfully:', createdApp);
      
      // Also create opex data for the new app using the ID returned from backend
      try {
        console.log('Creating opex data for app ID:', createdApp.id);
        const opexData = {
          id: createdApp.id, // Use the ID returned from the backend
          name: formData.name,
          compliance: {
            compliant: true,
            complianceSince: new Date().toISOString().split('T')[0]
          },
          issues: [],
          vulnerabilities: [],
          patching: [],
          downtime: [],
          majorIncident: [],
          groupName: formData.groupName || 'Default', // Provide default group name if none provided
          gatehouseCheckin: formData.gatehouseCheckin || false,
          gatehouseCheckinDate: formData.gatehouseCheckinDate || new Date().toISOString().split('T')[0] // Provide default date if none provided
        };
        
        console.log('Opex data to create:', opexData);
        const createdOpexData = await apiService.createOpexData(opexData);
        console.log('Opex data created successfully:', createdOpexData);
      } catch (error) {
        console.error('Error creating opex data:', error);
        // Don't fail the save if opex creation fails
      }
      
      setToasterMessage('Application created successfully!');
      setToasterType('success');
      setSaveSuccess(true);
      setToasterVisible(true);
      
      // Redirect to home page after successful creation
      setTimeout(() => {
        navigate('/');
      }, 1500); // Give user time to see success message
      
    } catch (error) {
      console.error('Error creating application:', error);
      setToasterMessage('Failed to create application. Please try again.');
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
      [field]: value
    };
    
    setLinks(updatedLinks);
  };

  const handleAddLink = () => {
    const newLink: Link = {
      category: '',
      linkName: '',
      linkUrl: ''
    };
    
    setLinks([...links, newLink]);
  };

  const handleDeleteLink = (index: number) => {
    const updatedLinks = links.filter((_, i) => i !== index);
    setLinks(updatedLinks);
  };

  const handleToasterClose = () => {
    setToasterVisible(false);
  };

  const handleCancel = () => {
    navigate('/');
  };

  const sortLinks = (links: Link[]): Link[] => {
    return [...links].sort((a, b) => {
      // First sort by category
      const categoryComparison = a.category.localeCompare(b.category);
      if (categoryComparison !== 0) {
        return categoryComparison;
      }
      // If categories are the same, sort by link name
      return a.linkName.localeCompare(b.linkName);
    });
  };

  // Get header text - show "Create New App" by default, or the entered name if available
  const getHeaderText = () => {
    return formData.name.trim() ? formData.name : 'Create New App';
  };

  return (
    <Container>
      <Sidebar />
      <MainContent>
        <Header
          variant="editApp"
          appName={getHeaderText()}
          lastUpdates="New Application"
        />
        <AppManagementForm
          formData={formData}
          links={links}
          loading={false}
          error={null}
          saving={saving}
          saveSuccess={saveSuccess}
          onInputChange={handleInputChange}
          onLinkChange={handleLinkChange}
          onAddLink={handleAddLink}
          onDeleteLink={handleDeleteLink}
          onSave={handleSave}
          onCancel={handleCancel}
          onDeleteApp={undefined} // No delete functionality for new apps
        />
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

export default AddApp; 