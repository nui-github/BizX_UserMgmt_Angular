// MOCK — endpoints under /users/... for permission management + the post-login permission bootstrap.
import { StandardPermission } from '../../../pages/standard-permission/models/standard-permission.model';
import { MOCK_PERMISSIONS } from '../data/permissions.mock-data';
import { MockStore } from '../mock-store';
import { mockFail, mockPage, mockSuccess } from '../mock-response.helper';

const store = new MockStore<StandardPermission>(MOCK_PERMISSIONS, 'id');

function getList(body: any) {
  const list = store.search((p) => !body?.permissionCode || !!p.permissionCode?.toLowerCase().includes(String(body.permissionCode).toLowerCase()));
  return mockSuccess(mockPage(list, body?.pageNum, body?.pageSize));
}

export const permissionsMockHandlers: Record<string, (body: any) => any> = {
  'users/getlistpermission': getList,
  'users/getlistpermissioninformation': getList,
  'users/getpermission': (body) => {
    const perm = store.getById(body?.id);
    return perm ? mockSuccess(perm) : mockFail('Permission not found');
  },
  'users/createpermission': (body) => mockSuccess(store.upsert({ ...body, id: body?.id ?? Date.now() })),
  'users/updatepermission': (body) => mockSuccess(store.upsert(body)),
  'users/deletepermission': (body) => {
    store.remove(body?.id);
    return mockSuccess(undefined);
  },
};
