// MOCK DATA — shape mirrors tab_register. Replace with real /users/getlistregister API data before ship.
import { Register } from '../../../pages/standard-register-management/models/standard-register-management.model';

export const MOCK_REGISTERS: Register[] = [
  new Register({
    id: 'mock-reg-001', registerType: 1, companyTypeId: 1, companyTaxId: '0107561112223',
    companyName: 'บริษัท ไทยรุ่งเรือง จำกัด', companyBranch: '00000', houseNo: '99', street: 'สุขุมวิท',
    districtCode: '1007', districtName: 'ปทุมวัน', subDistrictCode: '100702', subDistrictName: 'วังใหม่',
    provinceCode: '10', provinceName: 'กรุงเทพมหานคร', postCode: '10330',
    companyPhone: '021234567', companyEmail: 'contact@thairungrueang.mock',
    firstName: 'ประยุทธ', lastName: 'เจริญพร', userPhone: '0891234567', userEmail: 'prayut.c@mock.local',
    username: 'prayut.c', status: 0, createDate: '2024-06-01 10:00:00', lastUpdate: '2024-06-01 10:00:00',
  }),
  new Register({
    id: 'mock-reg-002', registerType: 2, companyTypeId: 2, companyTaxId: '1234567890123',
    companyName: null, companyBranch: null, houseNo: '15/2', street: 'พหลโยธิน',
    districtCode: '1001', districtName: 'พระนคร', subDistrictCode: '100101', subDistrictName: 'พระบรมมหาราชวัง',
    provinceCode: '10', provinceName: 'กรุงเทพมหานคร', postCode: '10200',
    companyPhone: null, companyEmail: null,
    firstName: 'สุดา', lastName: 'แสงทอง', userPhone: '0898887777', userEmail: 'suda.s@mock.local',
    username: 'suda.s', status: 0, createDate: '2024-06-03 14:20:00', lastUpdate: '2024-06-03 14:20:00',
  }),
  new Register({
    id: 'mock-reg-003', registerType: 1, companyTypeId: 1, companyTaxId: '0105562223344',
    companyName: 'บริษัท ขอนแก่น อะโกร จำกัด', companyBranch: '00001', houseNo: '55', street: 'มิตรภาพ',
    districtCode: '4001', districtName: 'เมืองขอนแก่น', subDistrictCode: '400101', subDistrictName: 'ในเมือง',
    provinceCode: '40', provinceName: 'ขอนแก่น', postCode: '40000',
    companyPhone: '043221100', companyEmail: 'info@khonkaenagro.mock',
    firstName: 'วิชัย', lastName: 'พูนทรัพย์', userPhone: '0865554444', userEmail: 'wichai.p@mock.local',
    username: 'wichai.p', status: 1, approveBy: 'admin', approveDate: '2024-06-05 09:00:00',
    createDate: '2024-06-02 11:00:00', lastUpdate: '2024-06-05 09:00:00',
  }),
];
