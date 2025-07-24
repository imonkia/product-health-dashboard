import React from 'react';
import styled from 'styled-components';

// Example mock data for vulnerabilities events
const vulnerabilitiesData = [
  {
    risk: 'vuln',
    id: 'VULN-001',
    vulnerability: 'OpenSSL CVE-2023-1234',
    category: 'category 1',
    fixByDate: '06/10/2024 10:00',
    hosts: 2
  },
  {
    risk: 'vuln',
    id: 'VULN-002',
    vulnerability: 'Log4Shell CVE-2021-44228',
    category: 'category 2',
    fixByDate: '06/09/2024 13:00',
    hosts: 2
  },
];

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

const VulnerabilitiesBody: React.FC = () => {
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
          {vulnerabilitiesData.map((row, idx) => (
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