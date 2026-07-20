// MOCK — endpoints under /users/... and /api/user/get-list-user for the user CRUD pages.
import { IUser } from '../../../pages/standard-user/models/standard-user.model';
import { MOCK_USERS } from '../data/users.mock-data';
import { MockStore } from '../mock-store';
import { mockFail, mockPage, mockSuccess } from '../mock-response.helper';

const store = new MockStore<IUser>(MOCK_USERS, 'uid');

function contains(value: string | null | undefined, needle: any): boolean {
  if (!needle) return true;
  return !!value?.toLowerCase().includes(String(needle).toLowerCase());
}

function getListUser(body: any) {
  const list = store.search(
    (u) =>
      contains(u.username, body?.username) &&
      contains(u.firstName, body?.firstName) &&
      contains(u.lastName, body?.lastName) &&
      contains(u.email, body?.email) &&
      (!body?.cpid || u.cpid === body.cpid) &&
      (!body?.gid || u.gid === body.gid)
  );
  return mockSuccess(mockPage(list, body?.pageNum, body?.pageSize));
}

function getUser(body: any) {
  const user = store.getById(body?.id);
  return user ? mockSuccess(user) : mockFail('User not found');
}

export const usersMockHandlers: Record<string, (body: any) => any> = {
  'users/getlistuser': getListUser,
  'api/user/get-list-user': getListUser,
  'users/getuser': getUser,
  'users/getuserinformation': getUser,
  'users/createuser': (body) => mockSuccess(store.upsert({ ...body, uid: body?.uid || `mock-uid-${Date.now()}` })),
  'users/updateuser': (body) => mockSuccess(store.upsert(body)),
  'users/updateuserinformation': (body) => mockSuccess(store.upsert(body)),
  'users/deleteuser': (body) => {
    store.remove(body?.id);
    return mockSuccess(undefined);
  },
  'users/checkduplicateusername': (body) => mockSuccess({ duplicate: store.search((u) => u.username === body?.username).length > 0 }),
  'users/updatestatus': (body) => mockSuccess(store.patch(body?.uid, { active: body?.isActive ?? body?.active })),
  'users/userchangegroup': (body) => mockSuccess(store.patch(body?.uid, { gid: body?.gid })),
  'users/unlock-user': (body) => mockSuccess(store.patch(body?.uid, { lock: false })),
  'users/resetpassword': () => mockSuccess(undefined),
  'users/changepassword': () => mockSuccess(undefined),
  'users/changepasswordinformation': () => mockSuccess(undefined),
  'users/approveregister': (body) => mockSuccess(store.patch(body?.uid, { approve: true, approvalId: '' })),
};
