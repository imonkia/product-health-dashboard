import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Link, useParams } from 'react-router-dom';
import Spinner from "../spinner.tsx";
import MainContent from './MainContent/MainBody.tsx';
import axios from 'axios';
import _ from 'lodash';
import moment from 'moment';
import Header from './MainContent/Header/Header.tsx';
import { mockAppDetails } from '../../mockDashboardData.ts';

type AppDowntimeItem = {
  start: string;
  end: string;
  [key: string]: any;
};

const AppView = () => {
  const _isMounted = useRef(false);
  const { appId } = useParams();
  const [appFiltervalue, setAppFiltervalue] = useState<string>('');
  const [catAppFilter, setCatAppFilter] = useState([]);
  const [appIssues, setAppIssues] = useState([]);
  const [appVulnerabilities, setAppVulnerabilities] = useState([]);
  const [appPatching, setAppPatching] = useState([]);
  const [appDowntime, setAppDowntime] = useState<AppDowntimeItem[]>([]);
  const [appDetails, setAppDetails] = useState([]);
  const [loading, setLoading] = useState(true);
  const [compliant, setCompliant] = useState('');
  const [complianceDuration, setComplianceDuration] = useState(0);
  const [unplannedAppDowntime, setUnplannedAppDowntime] = useState([]);

  useEffect(() => {
    _isMounted.current = true;
    // Use mock data if available
    if (typeof appId === 'string' && mockAppDetails[appId]) {
      const mock = mockAppDetails[appId];
      setAppFiltervalue(appId);
      setAppIssues(mock.issues || []);
      setAppVulnerabilities(mock.vulnerabilities || []);
      setAppPatching(mock.patching || []);
      setAppDowntime(mock.downtime || []);
      setCompliant(mock.compliance.compliant);
      setComplianceDuration(
        moment().diff(moment(mock.compliance.complianceSince), 'days')
      );
      setUnplannedAppDowntime(mock.majorIncident || []);
      setAppDetails(mock);
      setLoading(false);
      // Optionally set other state as needed
      return () => { _isMounted.current = false; };
    }

    axios.get('/api/v1/app/applications')
      .then(res => {
        setCatAppFilter(res.data || []);
      })
      .then(() => {
        setAppFiltervalue(appId || '');
        setLoading(false);
      })
      .catch(() => {
        setCatAppFilter([]);
      });
    return () => { _isMounted.current = false; };
    // eslint-disable-next-line
  }, [appId]);

  useEffect(() => {
    if (!appFiltervalue) return;
    // Use mock data if available
    if (typeof appFiltervalue === 'string' && mockAppDetails[appFiltervalue]) {
      // Already set in previous effect
      return;
    }
    // eslint-disable-next-line
  }, [appFiltervalue]);

  const filterAppName = useCallback(() => {
    const filteredNameObject = _.find(catAppFilter, app => app.id === appFiltervalue);
    return filteredNameObject?.name || '';
  }, [catAppFilter, appFiltervalue]);

  let content;
  if (loading) {
    content = <Spinner />;
  } else {
    content = (
      <>
        <Header
          appName={catAppFilter.length ? filterAppName() : 'App'}
          isCompliant={!!compliant && compliant !== 'false'}
          nonComplianceInfo={!compliant || compliant === 'false' ? 'This app is not compliant. Please review the issues.' : undefined}
          nonCompliantDays={!compliant || compliant === 'false' ? complianceDuration : undefined}
        />
        <div className="container-fluid">
          <div className="row flex-xl-nowrap">
            <MainContent />
          </div>
        </div>
      </>
    );
  }
  return <>{content}</>;
};

export default AppView;