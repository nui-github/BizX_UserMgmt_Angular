// MOCK DATA — shape mirrors tab_groups (be/db_schema/full/v5.4.0__full_schema.sql).
// Replace with real /users/getlistgroup API data before ship.
import { IGroup } from '../../../pages/standard-group/models/standard-group.model';

export const MOCK_GROUPS: IGroup[] = [
  {
    gid: 'mock-gid-001', cpid: 'mock-cpid-001', companyName: 'บริษัท เน็ตเบย์ กรุ๊ป จำกัด',
    name: 'SYSTEM ADMIN', limitUser: -1, isActive: true,
    createTime: '2024-01-10 09:00:00', lastUpdateTime: '2024-01-10 09:00:00',
    approval: false, approvalId: '',
  },
  {
    gid: 'mock-gid-002', cpid: 'mock-cpid-001', companyName: 'บริษัท เน็ตเบย์ กรุ๊ป จำกัด',
    name: 'HR MANAGER', limitUser: 20, isActive: true,
    createTime: '2024-01-15 09:00:00', lastUpdateTime: '2024-01-15 09:00:00',
    approval: false, approvalId: '',
  },
  {
    gid: 'mock-gid-003', cpid: 'mock-cpid-002', companyName: 'บริษัท กรุงไทยโลจิสติกส์ จำกัด',
    name: 'FINANCE', limitUser: 10, isActive: true,
    createTime: '2024-02-20 09:00:00', lastUpdateTime: '2024-02-20 09:00:00',
    approval: false, approvalId: '',
  },
  {
    gid: 'mock-gid-004', cpid: 'mock-cpid-003', companyName: 'บริษัท สยามดิจิทัล จำกัด',
    name: 'OPERATION', limitUser: 15, isActive: false,
    createTime: '2024-03-08 09:00:00', lastUpdateTime: '2024-03-08 09:00:00',
    approval: false, approvalId: '',
  },
];
