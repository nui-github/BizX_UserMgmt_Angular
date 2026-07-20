// MOCK DATA — shape mirrors tab_status. Replace with real /users/status API data before ship.
import { Status } from '../../../pages/standard-register-management/models/status.model';

export const MOCK_STATUSES: Status[] = [
  { id: 1, code: 0, type: 'REGISTER', nameEn: 'Pending', nameTh: 'รอดำเนินการ', backgroundColor: '#FFF3CD', borderColor: '#FFECB5', textColor: '#664D03' },
  { id: 2, code: 1, type: 'REGISTER', nameEn: 'Approved', nameTh: 'อนุมัติ', backgroundColor: '#D1E7DD', borderColor: '#BADBCC', textColor: '#0F5132' },
  { id: 3, code: 2, type: 'REGISTER', nameEn: 'Rejected', nameTh: 'ปฏิเสธ', backgroundColor: '#F8D7DA', borderColor: '#F5C2C7', textColor: '#842029' },
];
