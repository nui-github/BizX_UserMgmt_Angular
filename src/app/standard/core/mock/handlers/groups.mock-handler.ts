// MOCK — endpoints under /users/... for the group CRUD pages.
import { IGroup } from '../../../pages/standard-group/models/standard-group.model';
import { MOCK_GROUPS } from '../data/groups.mock-data';
import { MockStore } from '../mock-store';
import { mockFail, mockPage, mockSuccess } from '../mock-response.helper';

const store = new MockStore<IGroup>(MOCK_GROUPS, 'gid');

export const groupsMockHandlers: Record<string, (body: any) => any> = {
  'users/getlistgroup': (body) => {
    const list = store.search(
      (g) => (!body?.name || g.name?.toLowerCase().includes(String(body.name).toLowerCase())) && (!body?.cpid || g.cpid === body.cpid)
    );
    return mockSuccess(mockPage(list, body?.pageNum, body?.pageSize));
  },
  'users/getgroup': (body) => {
    const group = store.getById(body?.gid);
    return group ? mockSuccess(group) : mockFail('Group not found');
  },
  'users/creategroup': (body) => mockSuccess(store.upsert({ ...body, gid: body?.gid || `mock-gid-${Date.now()}` })),
  'users/updategroup': (body) => mockSuccess(store.upsert(body)),
  'users/updategroupstatus': (body) => mockSuccess(store.patch(body?.gid, { isActive: body?.isActive })),
  'users/group/list-approval': (body) => mockSuccess(store.search((g) => g.cpid === body?.cpid && !!g.approval)),
  'users/getgrouprole': () => mockSuccess([]),
  'users/getrolemenudetail': () => mockSuccess([]),
};
