// MOCK — endpoints under /users/... for company type lookups (used by the company create/edit form).
import { ICompanyType } from '../../../pages/standard-company-type/models/standard-company-type.model';
import { MOCK_COMPANY_TYPES } from '../data/company-types.mock-data';
import { MockStore } from '../mock-store';
import { mockSuccess } from '../mock-response.helper';

const store = new MockStore<ICompanyType>(MOCK_COMPANY_TYPES, 'id');

export const companyTypesMockHandlers: Record<string, (body: any) => any> = {
  'users/getlistcompanytype': () => mockSuccess(store.all()),
  'users/getcompanytype': () => mockSuccess(store.all()),
  'users/getlistcompanytypebyregistertype': (body) => mockSuccess(store.search((t) => t.registerType === body?.registerType)),
};
