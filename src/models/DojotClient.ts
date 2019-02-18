import request = require("request-promise");
import logger from "../util/logger";
import { FullTest } from "./FullTest";

export class DojotClient {
  private _test: FullTest;

  forTest(test: FullTest){
    this._test = test;
    return this;
  }

  private get server(){
    return this._test.host;
  }

  private get username(){
    return this._test.username;
  }

  private get password(){
    return this._test.password;
  }

  getToken(resolve: Resolve) {
    request
      .post(`http://${this.server}:8000/auth`, {
        json: {
          username: this.username,
          passwd: this.password
        }
      })
      .then(res => {
        logger.debug("User token has been recovered");
        request
          .get(`http://${this.server}:8000/stream/socketio`, {
            headers: {
              Authorization: `Bearer ${res.jwt}`
            }
          })
          .then(res => {
            logger.debug("Socketyio token has been recovered");
            resolve(JSON.parse(res).token);
          })
          .catch(err => {
            logger.error(`Failed to recover socketio token: ${err.message}`);
          });
      })
      .catch(err => {
        logger.error(`Failed to recover user token: ${err.message}`);
      });
  }
}

interface Resolve {
  (token: string): void;
}
