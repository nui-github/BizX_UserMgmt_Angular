export class FormControlBase<T> {
  value: T;
  key: string;
  id: string;
  label: string;
  subLabel: string;
  required: boolean;
  order: number;
  controlType: string;
  type: string;
  maxlength: number;
  options: { key: string, value: string }[];

  constructor(options: {
      value?: T | any;
      key?: string;
      id?: string;
      label?: string;
      subLabel?: string;
      required?: boolean;
      order?: number;
      controlType?: string;
      type?: string;
      maxlength?: number | any;
      options?: { key: string, value: string }[];
  } = {}) {
      this.value = options.value;
      this.key = options.key || '';
      this.id = options.id || '';
      this.label = options.label || '';
      this.subLabel = options.subLabel || '';
      this.required = !!options.required;
      this.order = options.order === undefined ? 1 : options.order;
      this.controlType = options.controlType || '';
      this.type = options.type || '';
      this.maxlength = options?.maxlength || null;
      this.options = options.options || [];
  }
}
