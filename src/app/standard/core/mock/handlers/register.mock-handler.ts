// MOCK — endpoints under /users/... for the self-registration + register-approval pages.
import { Register } from '../../../pages/standard-register-management/models/standard-register-management.model';
import { MOCK_REGISTERS } from '../data/registers.mock-data';
import { MOCK_REGISTER_TYPES } from '../data/register-types.mock-data';
import { MOCK_REGISTER_ATTACHMENT_TYPES } from '../data/register-attachment-types.mock-data';
import { MockStore } from '../mock-store';
import { mockFail, mockPage, mockSuccess } from '../mock-response.helper';

const store = new MockStore<Register>(MOCK_REGISTERS, 'id');

export const registerMockHandlers: Record<string, (body: any) => any> = {
  'users/getlistregister': (body) => {
    const list = store.search(
      (r) =>
        (!body?.companyName || !!r.companyName?.toLowerCase().includes(String(body.companyName).toLowerCase())) &&
        (!body?.companyTaxId || r.companyTaxId === body.companyTaxId) &&
        (body?.status == null || r.status === body.status)
    );
    return mockSuccess(mockPage(list, body?.pageNum, body?.pageSize));
  },
  'users/getregister': (body) => {
    const register = store.getById(body?.id);
    return register ? mockSuccess(register) : mockFail('Register not found');
  },
  'users/getlistregistertype': (body) => mockSuccess(MOCK_REGISTER_TYPES.filter((t) => !body?.code || t.code === body.code)),
  'users/getlistregisterattachmenttype': (body) =>
    mockSuccess(MOCK_REGISTER_ATTACHMENT_TYPES.filter((t) => !body?.registerType || t.registerType === body.registerType)),
  'users/getregisterattachment': () => mockSuccess([]),
  'users/getregisterattachmentpayload': () => mockSuccess(null),
  'users/register/create': () => mockSuccess({ id: `mock-reg-${Date.now()}` }),
  'users/register/verify': () => mockSuccess({ duplicate: false }),
  'users/register/verifyvatcorporation': (body) =>
    mockSuccess({ companyTaxId: body?.companyTaxId, companyName: 'บริษัท ตัวอย่าง จำกัด (mock)', valid: true }),
  'users/registerresendemail': () => mockSuccess(undefined),
  'users/approveregister': (body) =>
    mockSuccess(
      store.patch(body?.id, {
        status: body?.approve ? 1 : 2,
        approveBy: body?.approveBy ?? 'admin',
        approveDate: new Date().toISOString(),
        rejectReason: body?.rejectReason ?? null,
      })
    ),
};
