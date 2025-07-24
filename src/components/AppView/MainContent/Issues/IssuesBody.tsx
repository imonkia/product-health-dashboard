import React, { useState } from 'react';
import styled from 'styled-components';

// Mock data for each section
const mockSections = [
  {
    label: 'Compliance',
    count: 0,
    rows: [],
  },
  {
    label: 'Operational Excellence',
    count: 2,
    rows: [
      {
        source: 'anteater',
        id: '72299672',
        title: 'Add alpha/numeric link sorting',
        status: 'Analyze',
        priority: 1,
        dueDate: '',
        keywords: 'PB-AX, PB-OpEx',
        fixEta: '',
        dri: 'Jack the Ripper',
      },
      {
        source: 'anteater',
        id: '72137489',
        title: 'Add alpha/numeric link sorting',
        status: 'Analyze',
        priority: 1,
        dueDate: '',
        keywords: 'PB-AX, PB-OpEx',
        fixEta: '',
        dri: 'Edward Scissorhands',
      },
    ],
},
{
    label: 'Accessibility',
    count: 1,
    rows: [
        {
            source: 'anteater',
            id: '72137489',
            title: 'Add alpha/numeric link sorting',
            status: 'Analyze',
            priority: 1,
            dueDate: '',
            keywords: 'PB-AX, PB-OpEx',
            fixEta: '',
            dri: 'Harry Potter',
        },
        {
            source: 'anteater',
            id: '72137489',
            title: 'Add alpha/numeric link sorting',
            status: 'Analyze',
            priority: 1,
            dueDate: '',
            keywords: 'PB-AX, PB-OpEx',
            fixEta: '',
            dri: 'Hermione Granger',
        },
        {
            source: 'anteater',
            id: '72137489',
            title: 'Add alpha/numeric link sorting',
            status: 'Analyze',
            priority: 1,
            dueDate: '',
            keywords: 'PB-AX, PB-OpEx',
            fixEta: '',
            dri: 'Katniss Everdeen',
        },
    ],
  },
];

const SectionWrapper = styled.div`
  margin-bottom: 8px;
`;

const SectionHeader = styled.div<{ expanded: boolean }>`
  display: flex;
  align-items: center;
  cursor: pointer;
  font-size: 17px;
  font-weight: 500;
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

const IssuesBody: React.FC = () => {
  const [expanded, setExpanded] = useState([false, false, false]);

  const toggleSection = (idx: number) => {
    setExpanded(expanded => expanded.map((v, i) => (i === idx ? !v : v)));
  };

  return (
    <div>
      {mockSections.map((section, idx) => (
        <SectionWrapper key={section.label}>
          <SectionHeader expanded={expanded[idx]} onClick={() => toggleSection(idx)}>
            <Caret expanded={expanded[idx]}>▶</Caret>
            {section.label}
            <SectionCount>{section.rows.length}</SectionCount>
          </SectionHeader>
          {expanded[idx] && section.rows.length > 0 && (
            <TableWrapper>
              <Table>
                <Thead>
                  <tr>
                    <th>Source</th>
                    <th>ID</th>
                    <th>Title</th>
                    <th>Status</th>
                    <th>Priority</th>
                    <th>Due Date</th>
                    <th>Keywords</th>
                    <th>Fix ETA</th>
                    <th>DRI</th>
                  </tr>
                </Thead>
                <Tbody>
                  {section.rows.map((row, i) => (
                    <tr key={row.id + i}>
                      <Td>{row.source}</Td>
                      <Td>
                        <Link href="#" target="_blank" rel="noopener noreferrer">
                          {row.id}
                        </Link>
                      </Td>
                      <Td>{row.title}</Td>
                      <Td>{row.status}</Td>
                      <Td>{row.priority}</Td>
                      <Td>{row.dueDate}</Td>
                      <Td>{row.keywords}</Td>
                      <Td>{row.fixEta}</Td>
                      <Td>{row.dri}</Td>
                    </tr>
                  ))}
                </Tbody>
              </Table>
            </TableWrapper>
          )}
        </SectionWrapper>
      ))}
    </div>
  );
};

export default IssuesBody; 