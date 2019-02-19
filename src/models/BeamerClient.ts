import shell = require("shelljs");
import { FullTest } from "./FullTest";
import logger from "../util/logger";

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
    shell.exec(
      `mqtt-beamer ${this.server} ${this.tenant} ${this.device} ${
        this.perSecond
      } ${this.totalMessages}`,
      { async: true },
      () => {
        logger.debug(`mqtt beamer sent all messages`);
      }
    );
  }
}
