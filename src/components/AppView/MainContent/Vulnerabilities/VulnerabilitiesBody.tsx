import React from 'react';
import styled from 'styled-components';

interface VulnerabilitiesBodyProps {
  appVulnerabilities?: any[];
}

const TableWrapper = styled.div`
  width: 100%;
  overflow-x: auto;
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

const VulnerabilitiesBody: React.FC<VulnerabilitiesBodyProps> = ({ appVulnerabilities = [] }) => {
  return (
    <TableWrapper>
      <Table>
        <Thead>
          <tr>
            <th>Risk</th>
            <th>Vulnerability</th>
            <th>Category</th>
            <th>Fix by Date</th>
            <th>Hosts</th>
          </tr>
        </Thead>
        <Tbody>
          {appVulnerabilities.map((row, idx) => (
            <tr key={row.id + idx}>
              <Td>{row.risk}</Td>
              <Td>{row.vulnerability}</Td>
              <Td>{row.category}</Td>
              <Td>{row.fixByDate}</Td>
              <Td>{row.hosts}</Td>
            </tr>
          ))}
        </Tbody>
      </Table>
    </TableWrapper>
  );
};

export default VulnerabilitiesBody; 