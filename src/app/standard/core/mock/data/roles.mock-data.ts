// MOCK DATA — shape mirrors tab_roles (be/db_schema/full/v5.4.0__full_schema.sql).
// Replace with real /users/getlistrole API data before ship.
import { IRole } from '../../../pages/standard-role/models/standard-role.model';

export const MOCK_ROLES: IRole[] = [
  { id: 1, name: 'SYSTEM ADMIN', company: 'บริษัท เน็ตเบย์ กรุ๊ป จำกัด', createTime: '2024-01-10 09:00:00', lastUpdateTime: '2024-01-10 09:00:00' },
  { id: 2, name: 'OFFICER ADMIN', company: 'บริษัท เน็ตเบย์ กรุ๊ป จำกัด', createTime: '2024-01-10 09:00:00', lastUpdateTime: '2024-01-10 09:00:00' },
  { id: 3, name: 'OFFICER USER', company: 'บริษัท กรุงไทยโลจิสติกส์ จำกัด', createTime: '2024-02-20 09:00:00', lastUpdateTime: '2024-02-20 09:00:00' },
  { id: 4, name: 'CUSTOMER ADMIN', company: 'บริษัท สยามดิจิทัล จำกัด', createTime: '2024-03-08 09:00:00', lastUpdateTime: '2024-03-08 09:00:00' },
  { id: 5, name: 'CUSTOMER USER', company: 'บริษัท สยามดิจิทัล จำกัด', createTime: '2024-03-08 09:00:00', lastUpdateTime: '2024-03-08 09:00:00' },
];
