import logger from "../util/logger";

class Client {
 
  protected server: string;

  protected autoReconnectInterval: number;

  protected onMessageCb?: (data: any) => void;

  constructor(server: string, autoReconnectInterval: number) {
    this.server = server;
    this.autoReconnectInterval = autoReconnectInterval;
    this.onMessageCb = undefined;
  }

  public onMessage(onMessage: (data: any) => void) {
    this.onMessageCb = onMessage;
  }

  public start() {
    logger.debug("Could not start client - abstract method invoked");
  }

  public reconnect() {
    logger.debug("Could not reconnect client - abstract method invoked");
  }
}

export { Client };
