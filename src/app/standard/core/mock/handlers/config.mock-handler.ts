// MOCK — global app config, fetched on every page load by StandardConfGlobalService.
// REGISTER: '1' keeps the self-registration flow reachable for design/vibe work.
import { mockSuccess } from '../mock-response.helper';

export const configMockHandlers: Record<string, (body: any) => any> = {
  'users/getallconfig': () => mockSuccess({ REGISTER: '1' }),
};
