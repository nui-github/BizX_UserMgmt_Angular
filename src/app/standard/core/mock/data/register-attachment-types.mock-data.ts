// MOCK DATA — shape mirrors master_register_attachment_type.
import { RegisterAttachmentDocumentType } from '../../../pages/standard-register-management/models/standard-register-management.model';

export const MOCK_REGISTER_ATTACHMENT_TYPES: RegisterAttachmentDocumentType[] = [
  { id: 1, code: 1, nameEn: 'ID Card', nameTh: 'บัตรประชาชน', sequence: 1, active: true, registerType: 2 },
  { id: 2, code: 2, nameEn: 'Company Certificate', nameTh: 'หนังสือรับรองบริษัท', sequence: 1, active: true, registerType: 1 },
  { id: 3, code: 3, nameEn: 'VAT Registration (Por.Por.20)', nameTh: 'ภ.พ.20', sequence: 2, active: true, registerType: 1 },
];
