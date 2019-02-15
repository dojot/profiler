import sio from "socket.io-client";
import { Client } from "./Client";
import logger from "../util/logger";

class SocketIoClient extends Client {
  private socketIo: SocketIOClient.Socket;

  constructor(server: string, autoReconnectInterval: number, token: string) {
    super(server, autoReconnectInterval);
    logger.debug(
      `Creating connection to server: ${this.server}, using token ${token}`
    );
    const query: SocketIOClient.ConnectOpts = {
      query: {
        token: token
      },
      transports: ["polling"]
    };
    this.socketIo = sio(this.server, query);
    logger.debug(`SocketIO was created.`);
  }

  public start() {
    let nMessages = 0;
    this.socketIo.on("all", (data: any) => {
      nMessages++;
      if (nMessages % 500 == 0) {
        logger.debug(`Received ${nMessages} messages`);
      }
      if (this.onMessageCb) {
        this.onMessageCb(data);
      } else {
        logger.debug("No message callback was set.");
      }
    });

    this.socketIo.on("close", (code: number) => {
      switch (code) {
        case 1000:
          logger.debug("WebSocket: closed");
          break;
        default:
          this.reconnect();
          break;
      }
    });

    this.socketIo.on("error", (event: any) => {
      switch (event.code) {
        case "ECONNREFUSED":
          this.reconnect();
          break;
        default:
          logger.debug("Error ws connection: " + event);
          break;
      }
    });
  }

  public close() {
    this.socketIo.close();
  }

  public reconnect() {
    logger.debug(`WebSocketClient: retry in ${this.autoReconnectInterval}ms`);
    if (this.socketIo) {
      this.socketIo.removeAllListeners();
      setTimeout(() => {
        logger.debug("WebSocketClient: reconnecting...");
        this.start();
      }, this.autoReconnectInterval);
    }
  }
}

export { SocketIoClient };
