import { FormControlBase } from "./standard-form-control-base.model";

export class StandardSubdistrict {

}

export class TypeaheadBase extends FormControlBase<any> {
  typeaheadOptionField: string;
  placeholder: string;

  constructor(options: {
      value?: any;
      key?: string;
      id?: string;
      label?: string;
      subLabel?: string;
      required?: boolean;
      typeaheadOptionField?: string;
      placeholder?: string;
      order?: number;
      controlType?: string;
      type?: string;
      maxlength?: number;
      options?: { key: string, value: string }[];

  } = {}) {
      super(options);
      this.typeaheadOptionField = options.typeaheadOptionField || ''
      this.placeholder = `${(options.placeholder || '')}`;
  }

}
export interface StandardSearchSubDistrict{
  text?: string;
  value?: string;
  subDistrictId?: number;
  subDistrictCode?: string;
  subDistrictName?: string;
  districtId: number;
  districtCode?: string;
  districtName?: string;
  provinceId: number;
  provinceCode: string;
  provinceName: string;
  postCode: string;
}

// export class StandardSearchSubDistrict{
//   public text: string| null = null;
//   public value: string| null = null;
//   public subDistrictId: number | null = null;
//   public subDistrictCode: string| null = null;
//   public subDistrictName: string| null = null;
//   public districtId: number | null = null;
//   public districtCode: string| null = null;
//   public districtName: string| null = null;
//   public provinceId: number | null = null;
//   public provinceCode: string| null = null;
//   public provinceName: string| null = null;
//   public postCode: string| null = null;
// }
