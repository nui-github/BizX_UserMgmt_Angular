// MOCK DATA — shape mirrors tab_roles (be/db_schema/full/v5.4.0__full_schema.sql).
// Replace with real /users/getlistrole API data before ship.
import { IRole } from '../../../pages/standard-role/models/standard-role.model';

export const MOCK_ROLES: IRole[] = [
  { id: 1, cpid: 'mock-cpid-001', name: 'SYSTEM ADMIN', company: 'บริษัท เน็ตเบย์ กรุ๊ป จำกัด', createTime: '2024-01-10 09:00:00', lastUpdateTime: '2024-01-10 09:00:00' },
  { id: 2, cpid: 'mock-cpid-001', name: 'OFFICER ADMIN', company: 'บริษัท เน็ตเบย์ กรุ๊ป จำกัด', createTime: '2024-01-10 09:00:00', lastUpdateTime: '2024-01-10 09:00:00' },
  { id: 3, cpid: 'mock-cpid-002', name: 'OFFICER USER', company: 'บริษัท กรุงไทยโลจิสติกส์ จำกัด', createTime: '2024-02-20 09:00:00', lastUpdateTime: '2024-02-20 09:00:00' },
  { id: 4, cpid: 'mock-cpid-003', name: 'CUSTOMER ADMIN', company: 'บริษัท สยามดิจิทัล จำกัด', createTime: '2024-03-08 09:00:00', lastUpdateTime: '2024-03-08 09:00:00' },
  { id: 5, cpid: 'mock-cpid-003', name: 'CUSTOMER USER', company: 'บริษัท สยามดิจิทัล จำกัด', createTime: '2024-03-08 09:00:00', lastUpdateTime: '2024-03-08 09:00:00' },
  { id: 6, cpid: 'mock-cpid-001', name: 'MANAGER', company: 'บริษัท เน็ตเบย์ กรุ๊ป จำกัด', createTime: '2024-04-15 09:00:00', lastUpdateTime: '2024-04-15 09:00:00' },
  { id: 7, cpid: 'mock-cpid-001', name: 'OPERATION USER', company: 'บริษัท เน็ตเบย์ กรุ๊ป จำกัด', createTime: '2024-04-15 09:00:00', lastUpdateTime: '2024-04-15 09:00:00' },
];
