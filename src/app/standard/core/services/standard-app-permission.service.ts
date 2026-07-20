import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StandardAppPermissionService {

  constructor() {
  }

  public static get Permissions() : { [key: string]: string } {
    return JSON.parse(sessionStorage.getItem("permissionList") ?? "{}");
  }

  checkPermission(permissionName: string) {
    let permission: any = StandardAppPermissionService.Permissions;
    let user = JSON.parse(sessionStorage.getItem('currentUser') ?? "{}");
    const userPermission = user.permissions;
    let data = userPermission.find((p: any) => p == permission.SYS_ADMIN);
    if (data != undefined && data != null) {
      return true;
    }
    data = userPermission.find((p: string) => p == permissionName);
    if (data != undefined && data != null) {
      return true;
    } else {
      return false;
    }
  }

  checkPermissionList(permissionName: string[]) {
    let permission: any = StandardAppPermissionService.Permissions;
    let user = JSON.parse(sessionStorage.getItem('currentUser') ?? "{}");
    const userPermission: string[] = user.permissions;
    let data = userPermission.find(p => p == permission.SYS_ADMIN);
    if (data != undefined && data != null) {
      return true;
    }
    return permissionName.some(per => userPermission.includes(per));
  }

  checkIsSystemAdmin() {
    const permission: any = StandardAppPermissionService.Permissions;
    const user = JSON.parse(sessionStorage.getItem('currentUser') ?? "{}");
    const userPermission = user.permissions;
    const data = userPermission.find((p: any) => p === permission.SYS_ADMIN);
    return data !== undefined && data != null;
  }
}
