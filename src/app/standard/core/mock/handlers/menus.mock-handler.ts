// MOCK — endpoints under /users/... for menu management + app nav bootstrap (getmainmenu).
import { IMenu } from '../../../pages/standard-menu/models/standard-menu.model';
import { MOCK_MENUS } from '../data/menus.mock-data';
import { MockStore } from '../mock-store';
import { mockFail, mockPage, mockSuccess } from '../mock-response.helper';

const store = new MockStore<IMenu>(MOCK_MENUS, 'id');

export const menusMockHandlers: Record<string, (body: any) => any> = {
  'users/getlistmenumanage': (body) => {
    const list = store.search((m) => !body?.name || !!m.name?.toLowerCase().includes(String(body.name).toLowerCase()));
    return mockSuccess(mockPage(list, body?.pageNum, body?.pageSize));
  },
  'users/getlistmenu': () => mockSuccess(store.all()),
  'users/getmenu': () => mockSuccess(store.all()),
  'users/getmainmenu': () => mockSuccess(store.all()),
  'users/getmenubyid': (body) => {
    const menu = store.getById(body?.id);
    return menu ? mockSuccess(menu) : mockFail('Menu not found');
  },
  'users/createmenu': (body) => mockSuccess(store.upsert({ ...body, id: body?.id || `mock-menu-${Date.now()}` })),
  'users/updatemenu': (body) => mockSuccess(store.upsert(body)),
  'users/deletemenu': (body) => {
    store.remove(body?.id);
    return mockSuccess('deleted');
  },
  'users/getcompanytypemenu': () => mockSuccess(store.all()),
  'users/getcompanytypemenusearch': () => mockSuccess(store.all()),
};
