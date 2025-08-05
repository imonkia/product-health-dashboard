import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Link, useParams } from 'react-router-dom';
import Spinner from "../spinner.tsx";
import MainContent from './MainContent/MainBody.tsx';
import moment from 'moment';
import Header from './MainContent/Header/Header.tsx';
import { apiService, transformOpexData } from '../../services/api.ts';

type AppDowntimeItem = {
  start: string;
  end: string;
  [key: string]: any;
};

const AppView = () => {
  const _isMounted = useRef(false);
  const { appId } = useParams();
  const [appFiltervalue, setAppFiltervalue] = useState<string>('');
  const [appIssues, setAppIssues] = useState([]);
  const [appVulnerabilities, setAppVulnerabilities] = useState([]);
  const [appPatching, setAppPatching] = useState([]);
  const [appDowntime, setAppDowntime] = useState<AppDowntimeItem[]>([]);
  const [appDetails, setAppDetails] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [compliant, setCompliant] = useState(false);
  const [complianceDuration, setComplianceDuration] = useState(0);
  const [unplannedAppDowntime, setUnplannedAppDowntime] = useState([]);

  useEffect(() => {
    const fetchAppData = async () => {
      if (!appId) return;

      try {
        setLoading(true);
        setError(null);
        _isMounted.current = true;

        // Fetch operational excellence data for the app
        const opexData = await apiService.getOpexData(appId);
        
        if (!_isMounted.current) return;

        const transformedData = transformOpexData(opexData);
        
        setAppFiltervalue(appId);
        setAppIssues(transformedData.issues || []);
        setAppVulnerabilities(transformedData.vulnerabilities || []);
        setAppPatching(transformedData.patching || []);
        setAppDowntime(transformedData.downtime || []);
        setCompliant(transformedData.compliance.compliant);
        setComplianceDuration(
          moment().diff(moment(transformedData.compliance.complianceSince), 'days')
        );
        setUnplannedAppDowntime(transformedData.majorIncident || []);
        setAppDetails(transformedData);

      } catch (error) {
        console.error('Error fetching app data:', error);
        if (_isMounted.current) {
          setError('Failed to load app data. Please try again.');
        }
      } finally {
        if (_isMounted.current) {
          setLoading(false);
        }
      }
    };

    fetchAppData();

    return () => {
      _isMounted.current = false;
    };
  }, [appId]);

  const getAppName = useCallback(() => {
    if (appDetails && appDetails.name) {
      return appDetails.name;
    }
    return 'App';
  }, [appDetails]);

  let content;
  if (loading) {
    content = <Spinner />;
  } else if (error) {
    content = (
      <div style={{ color: '#e53935', textAlign: 'center', padding: '20px' }}>
        {error}
      </div>
    );
  } else {
    content = (
      <>
        <Header
          appName={getAppName()}
          isCompliant={compliant}
          nonComplianceInfo={!compliant ? 'This app is not compliant. Please review the issues.' : undefined}
          nonCompliantDays={!compliant ? complianceDuration : undefined}
        />
        <div className="container-fluid">
          <div className="row flex-xl-nowrap">
            <MainContent 
              appIssues={appIssues}
              appVulnerabilities={appVulnerabilities}
              appPatching={appPatching}
              appDowntime={appDowntime}
            />
          </div>
        </div>
      </>
    );
  }
  return <>{content}</>;
};

export default AppView;