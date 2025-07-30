import React from 'react';
import styled from 'styled-components';

interface PatchingBodyProps {
  appPatching?: any[];
}

// Example mock data for patching events (fallback)
const patchingData = [
  {
    environment: 'Test',
    id: '-001',
    hostname: 'some-hostname.subdomain.domain.com',
    ip: '192.168.1.1',
    status: 'Compliant'
  },
  {
    environment: 'Test',
    id: 'PATCH-002',
    hostname: 'some-other-hostname.subdomain.domain.com',
    ip: '192.168.1.2',
    status: 'Expired',
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

const PatchingBody: React.FC<PatchingBodyProps> = ({ appPatching = [] }) => {
  // Use appPatching if provided, otherwise use mock data
  const data = appPatching.length > 0 ? appPatching : patchingData;

  return (
    <TableWrapper>
      <Table>
        <Thead>
          <tr>
            <th>Environment</th>
            <th>Hostname</th>
            <th>IP</th>
            <th>Patch Date</th>
            <th>Status</th>
          </tr>
        </Thead>
        <Tbody>
          {data.map((row, idx) => (
            <tr key={row.id + idx}>
              <Td>{row.environment}</Td>
              <Td>
                <Link href="#" target="_blank" rel="noopener noreferrer">
                  {row.id}
                </Link>
              </Td>
              <Td>{row.hostname}</Td>
              <Td>{row.ip}</Td>
              <Td>{row.status}</Td>
            </tr>
          ))}
        </Tbody>
      </Table>
    </TableWrapper>
  );
};

export default PatchingBody; 