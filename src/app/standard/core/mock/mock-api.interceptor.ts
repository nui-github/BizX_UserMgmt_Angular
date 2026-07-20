/**
 * MOCK API LAYER — lets the frontend run and be designed against without the real backend.
 *
 * How it works: matches the request path against MOCK_HANDLERS and returns fake data instead
 * of hitting the network. Any path NOT in this table falls through to the real HTTP call
 * (a console.warn fires so it's obvious which endpoints still need a mock or a live backend).
 *
 * To remove once the real backend is wired up:
 *   1. Delete this whole `core/mock/` folder.
 *   2. In app.config.ts, drop the `mockApiInterceptor` import and remove it from withInterceptors([...]).
 *
 * Seed data lives in `data/*.mock-data.ts`, typed against the app's real model interfaces and
 * shaped after the tables in be/db_schema/full/v5.4.0__full_schema.sql — so swapping a handler
 * for a real API call later is a like-for-like shape change, not a redesign.
 */
import { HttpInterceptorFn, HttpResponse } from '@angular/common/http';
import { of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { MOCK_CONFIG } from './mock.config';
import { mockSuccess } from './mock-response.helper';
import { authMockHandlers } from './handlers/auth.mock-handler';
import { usersMockHandlers } from './handlers/users.mock-handler';
import { groupsMockHandlers } from './handlers/groups.mock-handler';
import { rolesMockHandlers } from './handlers/roles.mock-handler';
import { menusMockHandlers } from './handlers/menus.mock-handler';
import { permissionsMockHandlers } from './handlers/permissions.mock-handler';
import { companiesMockHandlers } from './handlers/companies.mock-handler';
import { companyTypesMockHandlers } from './handlers/company-types.mock-handler';

const MOCK_HANDLERS: Record<string, (body: any) => any> = {
  ...authMockHandlers,
  ...usersMockHandlers,
  ...groupsMockHandlers,
  ...rolesMockHandlers,
  ...menusMockHandlers,
  ...permissionsMockHandlers,
  ...companiesMockHandlers,
  ...companyTypesMockHandlers,
  // Notification bell — stubbed empty, not backed by mock data yet.
  'users/notify/count-notification': () => mockSuccess(0),
  'users/notify/get-notification': () => mockSuccess([]),
  'users/notify/update-read': () => mockSuccess(undefined),
  'users/notify/update-seen': () => mockSuccess(undefined),
};

export const mockApiInterceptor: HttpInterceptorFn = (req, next) => {
  if (!MOCK_CONFIG.enabled) return next(req);

  const path = req.url.replace(/^\/?api\//, '');
  const handler = MOCK_HANDLERS[path];

  if (!handler) {
    console.warn(`[mock-api] no mock for "${path}" — falling through to real backend`);
    return next(req);
  }

  const body = handler(req.body);
  return of(new HttpResponse({ status: 200, body })).pipe(delay(MOCK_CONFIG.delayMs));
};
