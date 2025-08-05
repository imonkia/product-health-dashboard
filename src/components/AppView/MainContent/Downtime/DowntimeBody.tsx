import React, { useState } from 'react';
import styled from 'styled-components';

interface DowntimeBodyProps {
  appDowntime?: any[];
}

const months = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

const SectionWrapper = styled.div`
  margin-bottom: 12px;
`;

const SectionHeader = styled.div<{ expanded: boolean }>`
  display: flex;
  align-items: center;
  cursor: pointer;
  font-size: 18px;
  font-weight: 600;
  color: #1976d2;
  background: none;
  border: none;
  padding: 8px 0 8px 8px;
  border-radius: 4px;
  user-select: none;
  transition: background 0.15s;
  &:hover {
    background: #f5faff;
  }
`;

const SectionCount = styled.span`
  background: #888;
  color: #fff;
  font-size: 14px;
  font-weight: 600;
  border-radius: 12px;
  padding: 2px 10px;
  margin-left: 8px;
`;

const MonthWrapper = styled.div`
  margin-left: 24px;
  margin-bottom: 8px;
`;

const MonthHeader = styled.div<{ expanded: boolean }>`
  display: flex;
  align-items: center;
  cursor: pointer;
  font-size: 16px;
  font-weight: 500;
  color: #1976d2;
  background: none;
  border: none;
  padding: 6px 0 6px 8px;
  border-radius: 4px;
  user-select: none;
  transition: background 0.15s;
  &:hover {
    background: #f5faff;
  }
`;

const MonthCount = styled.span`
  background: #888;
  color: #fff;
  font-size: 13px;
  font-weight: 600;
  border-radius: 12px;
  padding: 2px 10px;
  margin-left: 8px;
`;

const TableWrapper = styled.div`
  width: 100%;
  overflow-x: auto;
  margin-bottom: 12px;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  background: #fff;
  font-size: 15px;
`;

const Thead = styled.thead`
  background: #f5f5f5;
  th {
    font-weight: 600;
    padding: 10px 12px;
    border-bottom: 2px solid #e0e0e0;
    text-align: left;
    word-break: break-word;
  }
`;

const Tbody = styled.tbody`
  tr {
    &:nth-child(even) {
      background: #fafbfc;
    }
  }
`;

const Td = styled.td`
  padding: 10px 12px;
  border-bottom: 1px solid #e0e0e0;
  word-break: break-word;
`;

const Link = styled.a`
  color: #1976d2;
  text-decoration: none;
  &:hover { text-decoration: underline; }
`;

const Caret = styled.span<{ expanded: boolean }>`
  display: inline-block;
  margin-right: 6px;
  font-size: 16px;
  transform: rotate(${({ expanded }) => (expanded ? 90 : 0)}deg);
  transition: transform 0.2s;
`;

function groupByMonth(data) {
  const byMonth = {};
  data.forEach(row => {
    // Parse MM/DD/YYYY HH:mm
    const [datePart] = row.outageStart.split(' ');
    const [month, day, year] = datePart.split('/').map(Number);
    const key = `${months[month - 1]} ${year}`;
    if (!byMonth[key]) byMonth[key] = [];
    byMonth[key].push(row);
  });
  return byMonth;
}

const DowntimeBody: React.FC<DowntimeBodyProps> = ({ appDowntime = [] }) => {
  const [sectionExpanded, setSectionExpanded] = useState([false, false]);
  const [monthExpanded, setMonthExpanded] = useState({});

  const planned = appDowntime.filter(d => d.type === 'planned');
  const unplanned = appDowntime.filter(d => d.type === 'unplanned');

  const plannedByMonth = groupByMonth(planned);
  const unplannedByMonth = groupByMonth(unplanned);

  const toggleSection = idx => {
    setSectionExpanded(arr => arr.map((v, i) => (i === idx ? !v : v)));
  };

  const toggleMonth = key => {
    setMonthExpanded(obj => ({ ...obj, [key]: !obj[key] }));
  };

  const renderMonth = (monthKey, rows) => (
    <MonthWrapper key={monthKey}>
      <MonthHeader expanded={!!monthExpanded[monthKey]} onClick={() => toggleMonth(monthKey)}>
        <Caret expanded={!!monthExpanded[monthKey]}>▶</Caret>
        {monthKey}
        <MonthCount>{rows.reduce((sum, r) => sum + (r.downtimeTotal || 0), 0).toFixed(2)}</MonthCount>
      </MonthHeader>
      {monthExpanded[monthKey] && (
        <TableWrapper>
          <Table>
            <Thead>
              <tr>
                <th>ID</th>
                <th>Title</th>
                <th>Outage Start</th>
                <th>Outage End</th>
                <th>Downtime Total (hrs)</th>
              </tr>
            </Thead>
            <Tbody>
              {rows.map((row, idx) => (
                <tr key={row.id + idx}>
                  <Td>
                    <Link href="#" target="_blank" rel="noopener noreferrer">
                      {row.id}
                    </Link>
                  </Td>
                  <Td>{row.title}</Td>
                  <Td>{row.outageStart}</Td>
                  <Td>{row.outageEnd}</Td>
                  <Td>{row.downtimeTotal}</Td>
                </tr>
              ))}
            </Tbody>
          </Table>
        </TableWrapper>
      )}
    </MonthWrapper>
  );

  return (
    <div>
      <SectionWrapper>
        <SectionHeader expanded={sectionExpanded[0]} onClick={() => toggleSection(0)}>
          <Caret expanded={sectionExpanded[0]}>▶</Caret>
          Planned
          <SectionCount>{planned.reduce((sum, r) => sum + (r.downtimeTotal || 0), 0).toFixed(2)}</SectionCount>
        </SectionHeader>
        {sectionExpanded[0] &&
          Object.entries(plannedByMonth).map(([month, rows]) =>
            renderMonth(month, rows)
          )}
      </SectionWrapper>
      <SectionWrapper>
        <SectionHeader expanded={sectionExpanded[1]} onClick={() => toggleSection(1)}>
          <Caret expanded={sectionExpanded[1]}>▶</Caret>
          Unplanned
          <SectionCount>{unplanned.reduce((sum, r) => sum + (r.downtimeTotal || 0), 0).toFixed(2)}</SectionCount>
        </SectionHeader>
        {sectionExpanded[1] &&
          Object.entries(unplannedByMonth).map(([month, rows]) =>
            renderMonth(month, rows)
          )}
      </SectionWrapper>
    </div>
  );
};

export default DowntimeBody; 