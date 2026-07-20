import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "express";
import { AppConfig } from "../../../app.config";
import { RxStomp } from "@stomp/rx-stomp";

@Injectable({
  providedIn: 'root'
})
export class StandardRxStompService extends RxStomp {

  constructor() {
    super();
  }
  
}