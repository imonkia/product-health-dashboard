import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Sidebar from '../Sidebar/Sidebar.tsx';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { apiService } from '../../services/api.ts';
import Toaster from '../Toaster/Toaster.tsx';
import Modal from '../Modal/Modal.tsx';
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

const EditApp: React.FC = () => {
  const [searchParams] = useSearchParams();
  const appId = searchParams.get('appId');
  const appName = searchParams.get('appName') || 'App';
  const navigate = useNavigate();
  


  
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
  
  // Modal state
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

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
        links: sortLinks(links)
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
      [field]: value
    };
    
    // Only update local state - no API call
    setLinks(updatedLinks);
  };

  const handleAddLink = () => {
    const newLink: Link = {
      category: '',
      linkName: '',
      linkUrl: ''
    };
    
    // Only update local state - no API call
    setLinks([...links, newLink]);
  };

  const handleDeleteLink = (index: number) => {
    const updatedLinks = links.filter((_, i) => i !== index);
    
    // Only update local state - no API call
    setLinks(updatedLinks);
  };

  const handleDeleteApp = () => {
    if (!appId) {
      setToasterMessage('No application ID provided for deletion.');
      setToasterType('error');
      setToasterVisible(true);
      return;
    }

    // Open the delete confirmation modal
    setIsDeleteModalOpen(true);
  };

  const confirmDeleteApp = async () => {
    try {
      // Delete both application and opex data
      await Promise.all([
        apiService.deleteApplication(appId!),
        apiService.deleteOpexData(appId!)
      ]);
      
      setToasterMessage('Application deleted successfully!');
      setToasterType('success');
      setToasterVisible(true);
      
      // Close modal
      setIsDeleteModalOpen(false);
      
      // Redirect to home page after successful deletion
      setTimeout(() => {
        navigate('/');
      }, 1500); // Give user time to see success message
      
    } catch (error) {
      console.error('Error deleting application:', error);
      setToasterMessage('Failed to delete application. Please try again.');
      setToasterType('error');
      setToasterVisible(true);
      setIsDeleteModalOpen(false);
    }
  };

  const handleToasterClose = () => {
    setToasterVisible(false);
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

  if (loading) {
    return (
      <Container>
        <Sidebar />
        <MainContent>
          <Header
            variant="editApp"
            appName={formData.name || appName}
            lastUpdates="Loading..."
            loading={true}
          />
          <AppManagementForm
            formData={formData}
            links={links}
            loading={true}
            error={null}
            saving={false}
            saveSuccess={false}
            onInputChange={handleInputChange}
            onLinkChange={handleLinkChange}
            onAddLink={handleAddLink}
            onDeleteLink={handleDeleteLink}
            onSave={handleSave}
            onDeleteApp={handleDeleteApp}
          />
        </MainContent>
      </Container>
    );
  }

  if (error) {
    return (
      <Container>
        <Sidebar />
        <MainContent>
          <Header
            variant="editApp"
            appName={formData.name || appName}
            lastUpdates="Error"
            error={error}
          />
          <AppManagementForm
            formData={formData}
            links={links}
            loading={false}
            error={error}
            saving={false}
            saveSuccess={false}
            onInputChange={handleInputChange}
            onLinkChange={handleLinkChange}
            onAddLink={handleAddLink}
            onDeleteLink={handleDeleteLink}
            onSave={handleSave}
            onDeleteApp={handleDeleteApp}
          />
        </MainContent>
      </Container>
    );
  }

  return (
    <Container>
      <Sidebar />
      <MainContent>
        <Header
          variant="editApp"
          appName={formData.name || appName}
          lastUpdates={saveSuccess ? 'Just updated' : 'Last_Updates'}
        />
        <AppManagementForm
          formData={formData}
          links={links}
          loading={loading}
          error={error}
          saving={saving}
          saveSuccess={saveSuccess}
          onInputChange={handleInputChange}
          onLinkChange={handleLinkChange}
          onAddLink={handleAddLink}
          onDeleteLink={handleDeleteLink}
          onSave={handleSave}
          onDeleteApp={handleDeleteApp}
        />
        <Toaster 
          type={toasterType} 
          message={toasterMessage} 
          isVisible={toasterVisible}
          onClose={handleToasterClose} 
        />
      </MainContent>
      <Modal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={confirmDeleteApp}
        title={`Delete Application: ${formData.name || appName}`}
        message={`Are you sure you want to delete "${formData.name || appName}"? This action cannot be undone.`}
        confirmText="Delete"
        cancelText="Cancel"
      />
    </Container>
  );
};

export default EditApp; 