// MOCK — endpoints under /users/... for company type lookups + management (standard-company-type pages).
import { ICompanyType } from '../../../pages/standard-company-type/models/standard-company-type.model';
import { MOCK_COMPANY_TYPES } from '../data/company-types.mock-data';
import { MOCK_REGISTER_TYPES } from '../data/register-types.mock-data';
import { MockStore } from '../mock-store';
import { mockFail, mockPage, mockSuccess } from '../mock-response.helper';

const store = new MockStore<ICompanyType>(MOCK_COMPANY_TYPES, 'id');

export const companyTypesMockHandlers: Record<string, (body: any) => any> = {
  'users/getlistcompanytype': () => mockSuccess(store.all()),
  'users/getcompanytype': (body) => {
    if (!body?.id) return mockSuccess(store.all());
    const type = store.getById(body.id);
    return type ? mockSuccess(type) : mockFail('Company type not found');
  },
  'users/getlistcompanytypebyregistertype': (body) => mockSuccess(store.search((t) => t.registerType === body?.registerType)),
  'users/gettrackingcompanytype': (body) => {
    const list = store.search((t) => !body?.name || !!t.name?.toLowerCase().includes(String(body.name).toLowerCase()));
    return mockSuccess(mockPage(list, body?.pageNum, body?.pageSize));
  },
  'users/createcompanytype': (body) => mockSuccess(store.upsert({ ...body, id: body?.id ?? `mock-ctype-${Date.now()}` })),
  'users/updatecompanytype': (body) => mockSuccess(store.upsert(body)),
  'users/getallregistertype': () => mockSuccess(MOCK_REGISTER_TYPES),
};
