import React, { useState } from 'react';
import styled from 'styled-components';
import { data, categories, statuses } from '../../mockDashboardData.ts';
import { Link as RouterLink } from 'react-router-dom';

const TableContainer = styled.div`
  background: #fff;
  border-radius: 10px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.04);
  overflow-x: auto;
`;

const FiltersRow = styled.div`
  display: flex;
  gap: 16px;
  align-items: center;
  padding: 24px 24px 0 24px;
`;

const FilterLabel = styled.label`
  font-size: 1rem;
  color: #232e3c;
  margin-right: 8px;
`;

const FilterSelect = styled.select`
  padding: 6px 6px 1px 0px;
  border-radius: 6px;
  border: transparent;
  font-size: 1rem;
  color: #232e3c;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  min-width: 1100px;
`;

const Thead = styled.thead`
  background: #213448;
  color: #fff;
  th {
    border-right: 1px solid #fff;
  }
  th:last-child {
    border-right: none;
  }
`;

const Tbody = styled.tbody`
  th {
    border-bottom: 1px solid #e5e7eb;
  }
  th:nth-child(even) {
    border-right: 1px solid #e5e7eb;
  }
  th:nth-child(odd) {
    border-right: none;
  }
`;

const Th = styled.th`
  font-weight: 600;
  padding: 12px 16px;
  text-align: left;
  position: sticky;
  top: 0;
  z-index: 1;
`;

const Td = styled.td`
  padding: 12px 16px;
  border-bottom: 1px solid #e5e7eb;
  color: #232e3c;
  font-size: 0.98rem;
`;

const Tr = styled.tr<{zebra?: boolean}>`
  background: ${({ zebra }) => zebra ? '#f9fafb' : '#fff'};
  td:nth-child(even) {
    border-right: 1px solid #e5e7eb;
  }
  td:nth-child(odd) {
    border-right: none;
  }
`;

const Status = styled.span<{compliant: boolean}>`
  font-weight: ${({ compliant }) => compliant ? 400 : 700};
  color: ${({ compliant }) => compliant ? '#3ec46d' : '#e53935'};
`;

const StyledRouterLink = styled(RouterLink)`
  color: #1976d2;
  text-decoration: none;
  &:hover { 
    color:rgb(152, 196, 239);
    text-decoration: none;
  }
  &:visited {
    color: #1976d2;
  }
`;

const DashboardTable: React.FC = () => {
  const [category, setCategory] = useState('All Categories');
  const [status, setStatus] = useState('Any Status');

  const columns = [
    { key: 'name', label: 'Product/System' },
    { key: 'status', label: 'Status' },
    { key: 'issuesOpen', label: 'Open' },
    { key: 'issuesOverdue', label: 'Overdue' },
    { key: 'vulns30', label: '≤ 30 days' },
    { key: 'vulnsOverdue', label: 'Overdue' },
    { key: 'patchProd', label: 'Prod' },
    { key: 'patchNonProd', label: 'Non-Prod' },
    { key: 'downLastMonth', label: 'Last Month' },
    { key: 'down6Months', label: 'Last 6 Months' },
  ];

  // Map data for sorting
  const mapped = data.map(row => ({
    ...row,
    issuesOpen: row.issues[0],
    issuesOverdue: row.issues[1],
    vulns30: row.vulns[0],
    vulnsOverdue: row.vulns[1],
    patchProd: row.patching[0],
    patchNonProd: row.patching[1],
    downLastMonth: parseFloat(row.downtime[0]),
    down6Months: parseFloat(row.downtime[1]),
  }));

  const filtered = mapped.filter(row =>
    (category === 'All Categories' || row.category === category) &&
    (status === 'Any Status' || row.status === status)
  );

  const sorted = filtered;
  return (
    <>
      <TableContainer>
        <Table>
          <Thead>
            <tr>
              <Th colSpan={2}></Th>
              <Th colSpan={2}>Issues</Th>
              <Th colSpan={2}>Vulnerabilities</Th>
              <Th colSpan={2}>Patching</Th>
              <Th colSpan={2}>Downtime (hrs)</Th>
            </tr>
          </Thead>
          <Tbody>
            <tr>
                <Th>
                  <form>
                    <div>
                      <FilterSelect id="category" value={category} onChange={e => setCategory(e.target.value)}>
                        {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                      </FilterSelect>
                    </div>
                  </form>
                </Th>
              <Th>
                <form>
                  <div>
                    <FilterSelect id="status" value={status} onChange={e => setStatus(e.target.value)}>
                      {statuses.map(st => <option key={st} value={st}>{st}</option>)}
                    </FilterSelect>
                  </div>
                </form>
              </Th>
              <Th>Open</Th>
              <Th>Overdue</Th>
              <Th>&le; 30 days</Th>
              <Th>Overdue</Th>
              <Th>Prod</Th>
              <Th>Non-Prod</Th>
              <Th>Last Month</Th>
              <Th>Last 6 Months</Th>
            </tr>
            {sorted.map((row, idx) => (
              <Tr key={row.id} zebra={idx % 2 === 1}>
                <Td>
                  <StyledRouterLink to={`/apps/${row.id}`}>
                    {row.name}
                  </StyledRouterLink>
                </Td>
                <Td><Status compliant={row.compliant}>{row.compliant ? 'Compliant' : 'Not compliant'}</Status></Td>
                <Td>{row.issues[0]}</Td>
                <Td>{row.issues[1]}</Td>
                <Td>{row.vulns[0]}</Td>
                <Td>{row.vulns[1]}</Td>
                <Td>{row.patching[0]}</Td>
                <Td>{row.patching[1]}</Td>
                <Td>{row.downtime[0]}</Td>
                <Td>{row.downtime[1]}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </>
  );
};

export default DashboardTable; 