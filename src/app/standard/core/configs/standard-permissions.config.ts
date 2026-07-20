import { Injectable } from "@angular/core";

@Injectable()
export class StandardPermissionsConfig {

  constructor() { }

  public static get Permissions() : { [key: string]: string } {
    return JSON.parse(sessionStorage.getItem("permissionList") ?? "{}");
  }

}
