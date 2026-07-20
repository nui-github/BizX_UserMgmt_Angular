// MOCK — endpoints under /users/... for the role CRUD pages.
import { IRole } from '../../../pages/standard-role/models/standard-role.model';
import { MOCK_ROLES } from '../data/roles.mock-data';
import { MockStore } from '../mock-store';
import { mockFail, mockPage, mockSuccess } from '../mock-response.helper';

const store = new MockStore<IRole>(MOCK_ROLES, 'id');

export const rolesMockHandlers: Record<string, (body: any) => any> = {
  'users/getlistrole': (body) => {
    const list = store.search((r) => !body?.name || r.name?.toLowerCase().includes(String(body.name).toLowerCase()));
    return mockSuccess(mockPage(list, body?.pageNum, body?.pageSize));
  },
  'users/getrole': (body) => {
    const role = store.getById(Number(body?.id));
    return role ? mockSuccess(role) : mockFail('Role not found');
  },
  'users/createrole': (body) => mockSuccess(store.upsert({ ...body, id: body?.id ?? Date.now() })),
  'users/updaterole': (body) => mockSuccess(store.upsert(body)),
  'users/getrolemenu': () => mockSuccess([]),
  'users/getrolepermission': () => mockSuccess([]),
};
