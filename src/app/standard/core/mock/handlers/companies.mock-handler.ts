// MOCK — endpoints under /users/... and /users/v2/... for the company CRUD pages.
import { ICompany_V2 } from '../../../pages/standard-company/models/standard-company.model';
import { MOCK_COMPANIES } from '../data/companies.mock-data';
import { MockStore } from '../mock-store';
import { mockFail, mockPage, mockSuccess } from '../mock-response.helper';

const store = new MockStore<ICompany_V2>(MOCK_COMPANIES, 'cpid');

function getList(body: any) {
  const list = store.search((c) => !body?.name || !!c.name?.toLowerCase().includes(String(body.name).toLowerCase()));
  return mockSuccess(mockPage(list, body?.pageNum, body?.pageSize));
}

function getOne(body: any) {
  const company = store.getById(body?.cpid);
  return company ? mockSuccess(company) : mockFail('Company not found');
}

function create(body: any) {
  return mockSuccess(store.upsert({ ...body, cpid: body?.cpid || `mock-cpid-${Date.now()}` }));
}

function update(body: any) {
  return mockSuccess(store.upsert(body));
}

export const companiesMockHandlers: Record<string, (body: any) => any> = {
  'users/getlistcompany': getList,
  'users/v2/getlistcompany': getList,
  'users/v2/getcompany': getOne,
  'users/createcompany': create,
  'users/v2/createcompany': create,
  'users/updatecompany': update,
  'users/v2/updatecompany': update,
  'users/updatecompanystatus': (body) => mockSuccess(store.patch(body?.cpid, { isActive: body?.isActive })),
  'users/deletecompany': (body) => {
    store.remove(typeof body === 'string' ? body : body?.cpid);
    return mockSuccess(undefined);
  },
  'users/checkduplicatecompanyname': (body) => mockSuccess({ duplicate: store.search((c) => c.name === body?.name).length > 0 }),
};
