import shell = require("shelljs");
import fs = require("fs");
import { Directory } from "./Directory";

export class BeamerClient {
  private _server: string;
  private _tenant: string;
  private _device: string;
  private _perSecond: number;
  private _messages: number;

  private constructor() {}

  withServer(server: string) {
    this._server = server;
    return this;
  }

  andTenant(tenant: string) {
    this._tenant = tenant;
    return this;
  }

  andDevice(device: string) {
    this._device = device;
    return this;
  }

  andTotalSendPerSecondOf(perSecond: number) {
    this._perSecond = perSecond;
    return this;
  }

  andTotalMessagesOf(messages: number) {
    this._messages = messages;
    return this;
  }

  execute(resolve: Resolve) {
    shell.exec(
      `mqtt-beamer ${this._server} ${this._tenant} ${this._device} ${
        this._perSecond
      } ${this._messages}`,
      { async: true },
      () => {
        const watcher = fs.watch("/home/uploads", (eventType, filename) => {
          if (filename != "result.csv") {
            watcher.close();
            Directory.listFiles((data) => {
              resolve(data);
            });
          }
        });
      }
    );
  }

  static build() {
    return new BeamerClient();
  }
}

interface Resolve {
  (data: string): void;
}
