import { RxStompConfig } from "@stomp/rx-stomp";
import { APP_DI_CONFIG, AppConfig } from "../../../app.config";
import { StandardRxStompService } from "../services/standard-rx-stomp.service";
import { myRxStompConfig } from "./standard-rx-stomp.config";

export function rxStompServiceFactory() {
  let config: AppConfig = APP_DI_CONFIG;
  let rxStompConfig: RxStompConfig = myRxStompConfig;
  rxStompConfig.brokerURL = 'ws:/localhost:4200/' + config.apiUrl + rxStompConfig.brokerURL;
  const rxStomp = new StandardRxStompService();
  rxStomp.configure(rxStompConfig);
  rxStomp.activate();
  return rxStomp;
}