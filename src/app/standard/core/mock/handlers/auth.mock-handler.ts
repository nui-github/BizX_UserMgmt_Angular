// MOCK — endpoints: users/login, users/logout, users/getsession.
import { MOCK_USERS } from '../data/users.mock-data';
import { mockFail, mockSuccess } from '../mock-response.helper';

const MOCK_PASSWORD = 'mock1234';

const PERMISSIONS_BY_GROUP: Record<string, string[]> = {
  'mock-gid-001': ['SYS_ADMIN'],
  'mock-gid-002': ['USER.VIEW', 'USER.CREATE', 'USER.UPDATE', 'GROUP.VIEW'],
  'mock-gid-003': ['USER.VIEW', 'COMPANY.VIEW'],
  'mock-gid-004': ['USER.VIEW'],
};

function login(body: any) {
  const user = MOCK_USERS.find((u) => u.username === body?.username);
  if (!user || body?.password !== MOCK_PASSWORD) {
    return mockFail('Username or password incorrect', 'AUTHENTICATION_FAIL');
  }
  if (!user.active) {
    return mockFail('User is inactive', 'INACTIVE_USER_CODE');
  }
  if (user.lock) {
    return mockFail('User is locked', 'LOCK_USER_CODE');
  }
  return mockSuccess({
    username: user.username,
    firstname: user.firstName,
    lastname: user.lastName,
    uid: user.uid,
    ucode: `mock-ucode-${user.uid}`,
    email: user.email,
    gid: user.gid,
    cpid: user.cpid,
    firstLogin: '',
    profileName: `${user.firstName} ${user.lastName}`,
    permissions: PERMISSIONS_BY_GROUP[user.gid] ?? [],
  });
}

export const authMockHandlers: Record<string, (body: any) => any> = {
  'users/login': login,
  'users/getsession': login,
  'users/logout': () => mockSuccess(undefined),
  // Always succeed without leaking whether the email exists — mirrors real security practice.
  'users/forgotpassword': () => mockSuccess(undefined),
  'users/forgotpasswordcheck': (body) => (body?.code ? mockSuccess({ username: 'admin' }) : mockFail('Invalid or expired code')),
  'users/forgotpasswordchange': () => mockSuccess(undefined),
};
