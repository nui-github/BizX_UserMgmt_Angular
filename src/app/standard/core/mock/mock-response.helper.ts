import { IPagination, StandardResponse, StandardResponseStatus } from '../../shared/models/standard-response.model';

export function mockSuccess<T>(data: T, message = 'success'): StandardResponse<T> {
  return { code: '200', status: StandardResponseStatus.SUCCESS, message, data };
}

export function mockFail<T = null>(message: string, code = 'FAIL'): StandardResponse<T> {
  return { code, status: StandardResponseStatus.FAIL, message, data: null as unknown as T };
}

export function mockPage<T>(items: T[], pageNum: number | undefined, pageSize: number | undefined): IPagination<T> {
  const size = pageSize && pageSize > 0 ? pageSize : 10;
  const start = (Math.max(pageNum ?? 1, 1) - 1) * size;
  return { data: items.slice(start, start + size), row: items.length };
}
