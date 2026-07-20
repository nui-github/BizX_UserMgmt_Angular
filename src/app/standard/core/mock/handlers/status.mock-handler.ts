// MOCK — endpoint: users/status (master status lookup, e.g. register approval states).
import { MOCK_STATUSES } from '../data/statuses.mock-data';
import { mockSuccess } from '../mock-response.helper';

export const statusMockHandlers: Record<string, (body: any) => any> = {
  'users/status': (body) => mockSuccess(MOCK_STATUSES.filter((s) => !body?.type || s.type === body.type)),
};
