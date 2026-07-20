// MOCK DATA — shape mirrors tab_company_types (be/db_schema/full/v5.4.0__full_schema.sql).
// Replace with real /users/getlistcompanytype API data before ship.
import { ICompanyType } from '../../../pages/standard-company-type/models/standard-company-type.model';

export const MOCK_COMPANY_TYPES: ICompanyType[] = [
  { id: 'mock-ctype-001', name: 'Enterprise', registerType: 1, createTime: '2024-01-01 00:00:00', lastUpdateTime: '2024-01-01 00:00:00' },
  { id: 'mock-ctype-002', name: 'SME', registerType: 2, createTime: '2024-01-01 00:00:00', lastUpdateTime: '2024-01-01 00:00:00' },
  { id: 'mock-ctype-003', name: 'Government', registerType: 1, createTime: '2024-01-01 00:00:00', lastUpdateTime: '2024-01-01 00:00:00' },
];
