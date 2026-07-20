// MOCK DATA — shape mirrors master_subdistrict/master_district/master_province.
// Replace with real /users/master/sub-district/search API data before ship.
import { StandardSearchSubDistrict } from '../../../pages/standard-subdistrict/models/standard-subdistrict.model';

export const MOCK_SUB_DISTRICTS: StandardSearchSubDistrict[] = [
  { subDistrictId: 1, subDistrictCode: '100101', subDistrictName: 'พระบรมมหาราชวัง', districtId: 1, districtCode: '1001', districtName: 'พระนคร', provinceId: 1, provinceCode: '10', provinceName: 'กรุงเทพมหานคร', postCode: '10200' },
  { subDistrictId: 2, subDistrictCode: '100702', subDistrictName: 'วังใหม่', districtId: 7, districtCode: '1007', districtName: 'ปทุมวัน', provinceId: 1, provinceCode: '10', provinceName: 'กรุงเทพมหานคร', postCode: '10330' },
  { subDistrictId: 3, subDistrictCode: '400101', subDistrictName: 'ในเมือง', districtId: 40, districtCode: '4001', districtName: 'เมืองขอนแก่น', provinceId: 40, provinceCode: '40', provinceName: 'ขอนแก่น', postCode: '40000' },
];
