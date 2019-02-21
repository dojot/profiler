import shell = require("shelljs");
import { FullTest } from "./FullTest";
import logger from "../util/logger";
import dns from "dns";

export class BeamerClient {
  execute(test: FullTest) {
    dns.lookup(test.host, (err, ip) => {
      logger.debug(`dns ${test.host} translated to ${ip}`);
      shell.exec(
        `mqtt-beamer ${ip} ${test.tenant} ${test.device} ${
          test.perSecond
        } ${test.totalMessages}`,
        { async: true },
        () => {
          logger.debug(`mqtt beamer sent all messages`);
        }
      );
    })
    
  }
}
