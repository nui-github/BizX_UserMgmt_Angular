// MOCK DATA — permission code catalog fetched once at login (users/getlistpermissioninformation) to
// build the sessionStorage "permissionList" map that StandardAppPermissionService/StandardPermissionsConfig
// read from. Codes here MUST match the literal APP_PERMISSION['...'] strings used across the app
// (grep -roh "APP_PERMISSION\['[A-Z_]*'\]" src/app) — SYS_ADMIN is the only one with no module prefix,
// and StandardAppPermissionService treats it as a bypass-all code.
// Replace with real /users/getlistpermissioninformation API data before ship.
import { StandardPermission } from '../../../pages/standard-permission/models/standard-permission.model';

const TS = '2020-08-04 00:00:00';

export const MOCK_PERMISSIONS: StandardPermission[] = [
  { id: 1, permissionCode: 'SYS_ADMIN', createTime: TS, lastUpdateTime: TS },
  { id: 2, permissionCode: 'COMPANY_VIEW', createTime: TS, lastUpdateTime: TS },
  { id: 3, permissionCode: 'COMPANY_CREATE', createTime: TS, lastUpdateTime: TS },
  { id: 4, permissionCode: 'COMPANY_EDIT', createTime: TS, lastUpdateTime: TS },
  { id: 5, permissionCode: 'COMPANY_APPROVAL', createTime: TS, lastUpdateTime: TS },
  { id: 6, permissionCode: 'COMPANY_TYPE_VIEW', createTime: TS, lastUpdateTime: TS },
  { id: 7, permissionCode: 'COMPANY_TYPE_CREATE', createTime: TS, lastUpdateTime: TS },
  { id: 8, permissionCode: 'COMPANY_TYPE_EDIT', createTime: TS, lastUpdateTime: TS },
  { id: 9, permissionCode: 'GROUP_VIEW', createTime: TS, lastUpdateTime: TS },
  { id: 10, permissionCode: 'GROUP_CREATE', createTime: TS, lastUpdateTime: TS },
  { id: 11, permissionCode: 'GROUP_EDIT', createTime: TS, lastUpdateTime: TS },
  { id: 12, permissionCode: 'USER_VIEW', createTime: TS, lastUpdateTime: TS },
  { id: 13, permissionCode: 'USER_CREATE', createTime: TS, lastUpdateTime: TS },
  { id: 14, permissionCode: 'USER_EDIT', createTime: TS, lastUpdateTime: TS },
  { id: 15, permissionCode: 'USER_APPROVAL', createTime: TS, lastUpdateTime: TS },
  { id: 16, permissionCode: 'USER_CHANGE_STATUS', createTime: TS, lastUpdateTime: TS },
  { id: 17, permissionCode: 'USER_UNLOCK', createTime: TS, lastUpdateTime: TS },
  { id: 18, permissionCode: 'USER_RESET_PASSWORD', createTime: TS, lastUpdateTime: TS },
  { id: 19, permissionCode: 'ROLE_VIEW', createTime: TS, lastUpdateTime: TS },
  { id: 20, permissionCode: 'ROLE_ADD', createTime: TS, lastUpdateTime: TS },
  { id: 21, permissionCode: 'ROLE_CREATE', createTime: TS, lastUpdateTime: TS },
  { id: 22, permissionCode: 'ROLE_EDIT', createTime: TS, lastUpdateTime: TS },
  { id: 23, permissionCode: 'MENU_VIEW', createTime: TS, lastUpdateTime: TS },
  { id: 24, permissionCode: 'MENU_CREATE', createTime: TS, lastUpdateTime: TS },
  { id: 25, permissionCode: 'MENU_EDIT', createTime: TS, lastUpdateTime: TS },
  { id: 26, permissionCode: 'MENU_DELETE', createTime: TS, lastUpdateTime: TS },
  { id: 27, permissionCode: 'PERMISSION_VIEW', createTime: TS, lastUpdateTime: TS },
  { id: 28, permissionCode: 'PERMISSION_CREATE', createTime: TS, lastUpdateTime: TS },
  { id: 29, permissionCode: 'PERMISSION_EDIT', createTime: TS, lastUpdateTime: TS },
  { id: 30, permissionCode: 'PERMISSION_DELETE', createTime: TS, lastUpdateTime: TS },
  { id: 31, permissionCode: 'REGISTER_VIEW', createTime: TS, lastUpdateTime: TS },
  { id: 32, permissionCode: 'REGISTER_ADD', createTime: TS, lastUpdateTime: TS },
  { id: 33, permissionCode: 'REGISTER_APPROVE', createTime: TS, lastUpdateTime: TS },
  { id: 34, permissionCode: 'REGISTER_REJECT', createTime: TS, lastUpdateTime: TS },
  { id: 35, permissionCode: 'REGISTER_RESEND_EMAIL', createTime: TS, lastUpdateTime: TS },
];
