// MOCK — endpoints: users/login, users/logout, users/getsession.
import { MOCK_USERS } from '../data/users.mock-data';
import { mockFail, mockSuccess } from '../mock-response.helper';

const MOCK_PASSWORD = 'mock1234';

// Codes must match the literal APP_PERMISSION['...'] strings checked across the app (see permissions.mock-data.ts).
const PERMISSIONS_BY_GROUP: Record<string, string[]> = {
  'mock-gid-001': ['SYS_ADMIN'],
  'mock-gid-002': ['USER_VIEW', 'USER_CREATE', 'USER_EDIT', 'USER_APPROVAL', 'USER_UNLOCK', 'USER_RESET_PASSWORD', 'GROUP_VIEW'],
  'mock-gid-003': ['USER_VIEW', 'COMPANY_VIEW'],
  'mock-gid-004': ['USER_VIEW'],
  // Company admin demo persona: full management rights, scoped to its own company — no SYS_ADMIN, no COMPANY_*/MENU_*/PERMISSION_*/REGISTER_* (platform-wide).
  'mock-gid-005': [
    'USER_VIEW', 'USER_CREATE', 'USER_EDIT', 'USER_APPROVAL', 'USER_CHANGE_STATUS', 'USER_UNLOCK', 'USER_RESET_PASSWORD',
    'GROUP_VIEW', 'GROUP_CREATE', 'GROUP_EDIT',
    'ROLE_VIEW', 'ROLE_ADD', 'ROLE_CREATE', 'ROLE_EDIT',
  ],
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
