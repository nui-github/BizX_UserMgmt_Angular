// MOCK — endpoint: users/master/sub-district/search (address autocomplete on company/register forms).
import { MOCK_SUB_DISTRICTS } from '../data/sub-districts.mock-data';
import { mockPage, mockSuccess } from '../mock-response.helper';

export const subdistrictMockHandlers: Record<string, (body: any) => any> = {
  'users/master/sub-district/search': (body) => {
    const list = MOCK_SUB_DISTRICTS.filter(
      (d) => !body?.subDistrictName || d.subDistrictName?.toLowerCase().includes(String(body.subDistrictName).toLowerCase())
    );
    return mockSuccess(mockPage(list, body?.pageNum, body?.pageSize));
  },
};
