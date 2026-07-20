// MOCK DATA — shape mirrors tab_permissions (be/db_schema/full/v5.4.0__full_schema.sql).
// SYS_ADMIN is special: StandardAppPermissionService.checkPermission() treats it as a bypass-all code.
// Replace with real /users/getlistpermission API data before ship.
import { StandardPermission } from '../../../pages/standard-permission/models/standard-permission.model';

export const MOCK_PERMISSIONS: StandardPermission[] = [
  { id: 1, permissionCode: 'SYS_ADMIN', createTime: '2020-08-04 00:00:00', lastUpdateTime: '2020-08-04 00:00:00' },
  { id: 2, permissionCode: 'USER.VIEW', createTime: '2020-08-04 00:00:00', lastUpdateTime: '2020-08-04 00:00:00' },
  { id: 3, permissionCode: 'USER.CREATE', createTime: '2020-08-04 00:00:00', lastUpdateTime: '2020-08-04 00:00:00' },
  { id: 4, permissionCode: 'USER.UPDATE', createTime: '2020-08-04 00:00:00', lastUpdateTime: '2020-08-04 00:00:00' },
  { id: 5, permissionCode: 'USER.DELETE', createTime: '2020-08-04 00:00:00', lastUpdateTime: '2020-08-04 00:00:00' },
  { id: 6, permissionCode: 'GROUP.VIEW', createTime: '2020-08-04 00:00:00', lastUpdateTime: '2020-08-04 00:00:00' },
  { id: 7, permissionCode: 'GROUP.MANAGE', createTime: '2020-08-04 00:00:00', lastUpdateTime: '2020-08-04 00:00:00' },
  { id: 8, permissionCode: 'COMPANY.VIEW', createTime: '2020-08-04 00:00:00', lastUpdateTime: '2020-08-04 00:00:00' },
  { id: 9, permissionCode: 'COMPANY.MANAGE', createTime: '2020-08-04 00:00:00', lastUpdateTime: '2020-08-04 00:00:00' },
  { id: 10, permissionCode: 'ROLE.MANAGE', createTime: '2020-08-04 00:00:00', lastUpdateTime: '2020-08-04 00:00:00' },
  { id: 11, permissionCode: 'MENU.MANAGE', createTime: '2020-08-04 00:00:00', lastUpdateTime: '2020-08-04 00:00:00' },
  { id: 12, permissionCode: 'PERMISSION.MANAGE', createTime: '2020-08-04 00:00:00', lastUpdateTime: '2020-08-04 00:00:00' },
];
