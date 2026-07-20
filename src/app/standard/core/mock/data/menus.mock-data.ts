// MOCK DATA — mirrors the default menu seed rows in tab_menus (be/db_schema/full/v5.4.0__full_schema.sql).
// These are the app's real navigation routes, so left as-is intentionally instead of fictional data.
// Replace with real /users/getmainmenu API data before ship.
import { IMenu } from '../../../pages/standard-menu/models/standard-menu.model';

export const MOCK_MENUS: IMenu[] = [
  { id: '1', menuId: 1, isSubMenu: false, parentMenuId: '0', name: 'Configuration', order: 1, url: null, icon: 'fa-cogs', createTime: '2020-08-04 00:00:00', lastUpdateTime: '2020-08-04 00:00:00', submenu: null },
  { id: '2', menuId: 2, isSubMenu: true, parentMenuId: '1', name: 'User Management', order: 3, url: '/mainmenu/user', icon: null, createTime: '2020-08-04 00:00:00', lastUpdateTime: '2020-08-04 00:00:00', submenu: null },
  { id: '3', menuId: 3, isSubMenu: true, parentMenuId: '1', name: 'Group Management', order: 2, url: '/mainmenu/group', icon: null, createTime: '2020-08-04 00:00:00', lastUpdateTime: '2020-08-04 00:00:00', submenu: null },
  { id: '4', menuId: 4, isSubMenu: true, parentMenuId: '1', name: 'Company Management', order: 1, url: '/mainmenu/company', icon: null, createTime: '2020-08-04 00:00:00', lastUpdateTime: '2020-08-04 00:00:00', submenu: null },
  { id: '5', menuId: 5, isSubMenu: true, parentMenuId: '1', name: 'Role Management', order: 4, url: '/mainmenu/role', icon: null, createTime: '2020-08-04 00:00:00', lastUpdateTime: '2020-08-04 00:00:00', submenu: null },
  { id: '6', menuId: 6, isSubMenu: true, parentMenuId: '1', name: 'Permission Management', order: 5, url: '/mainmenu/permission', icon: null, createTime: '2020-08-04 00:00:00', lastUpdateTime: '2020-08-04 00:00:00', submenu: null },
  { id: '7', menuId: 7, isSubMenu: true, parentMenuId: '1', name: 'Menu Management', order: 6, url: '/mainmenu/menu', icon: null, createTime: '2020-08-04 00:00:00', lastUpdateTime: '2020-08-04 00:00:00', submenu: null },
  { id: '8', menuId: 8, isSubMenu: false, parentMenuId: '0', name: 'Register Management', order: 7, url: '/mainmenu/register/approve', icon: 'fa-registered', createTime: '2021-02-01 00:00:00', lastUpdateTime: '2021-02-01 00:00:00', submenu: null },
  { id: '9', menuId: 9, isSubMenu: false, parentMenuId: '0', name: 'Token Management', order: 3, url: '/mainmenu/token', icon: 'fa-key', createTime: '2021-04-28 00:00:00', lastUpdateTime: '2021-04-28 00:00:00', submenu: null },
];
