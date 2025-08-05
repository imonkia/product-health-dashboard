import React from 'react';
import styled from 'styled-components';

interface PatchingBodyProps {
  appPatching?: any[];
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

const PatchingBody: React.FC<PatchingBodyProps> = ({ appPatching = [] }) => {
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
          {appPatching.map((row, idx) => (
            <tr key={row.id + idx}>
              <Td>{row.environment}</Td>
              <Td>
                <Link href="#" target="_blank" rel="noopener noreferrer">
                  {row.id}
                </Link>
              </Td>
              <Td>{row.hostname}</Td>
              <Td>{row.ip}</Td>
              <Td>{row.patchDate}</Td>
              <Td>{row.status}</Td>
            </tr>
          ))}
        </Tbody>
      </Table>
    </TableWrapper>
  );
};

export default PatchingBody; 