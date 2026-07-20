// MOCK DATA — used by both company-type ("register type" dropdown) and register-management pages.
import { RegisterType } from '../../../pages/standard-register-management/models/standard-register-management.model';

export const MOCK_REGISTER_TYPES: RegisterType[] = [
  { id: 1, code: 1, nameEn: 'Corporate', nameTh: 'นิติบุคคล', active: 1 },
  { id: 2, code: 2, nameEn: 'Personal', nameTh: 'บุคคลธรรมดา', active: 1 },
];
