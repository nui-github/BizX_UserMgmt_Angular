import { FormControl, Validators } from "@angular/forms";

export class StandardPermission {
  	public permissionCode: string | null = null;
	public id: number | null = null;
	public createTime: string | null = null;
	public lastUpdateTime: string | null = null;
}

export class Permission {
	public permissionCode: string | null = null;
	public id: number | null = null;
	public createTime: string | null = null;
	public lastUpdateTime: string | null = null;
}

export class StandardPermissionSearch {
	public permissionCode: string | null = null;

	constructor() {
		this.permissionCode = null;
	}
}


export class PermissionSearchForm {
	public permissionCode: FormControl<string | null>;

	constructor() {
		this.permissionCode = new FormControl(null);
	}
}

export class StandardPermissionForm {
	public id: FormControl<number | null>;
	public permissionCode: FormControl<string | null>;

	constructor() {
		this.id = new FormControl(null);
		this.permissionCode = new FormControl(null, Validators.required);
	}
}
