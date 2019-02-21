import shell = require("shelljs");
import { FullTest } from "./FullTest";
import logger from "../util/logger";
import dns from "dns";

export class BeamerClient {
  private _test: FullTest;

  forTest(test: FullTest) {
    this._test = test;
    return this;
  }

  get server(): string {
    return this._test.host;
  }

  get tenant(): string {
    return this._test.tenant;
  }

  get device(): string {
    return this._test.device;
  }

  get perSecond(): number {
    return this._test.perSecond;
  }

  get totalMessages(): number {
    return this._test.totalMessages;
  }

  execute() {
    dns.lookup(this.server, (err, ip) => {
      logger.debug(`dns ${this.server} translated to ${ip}`);
      shell.exec(
        `mqtt-beamer ${ip} ${this.tenant} ${this.device} ${
          this.perSecond
        } ${this.totalMessages}`,
        { async: true },
        () => {
          logger.debug(`mqtt beamer sent all messages`);
        }
      );
    })
    
  }
}
