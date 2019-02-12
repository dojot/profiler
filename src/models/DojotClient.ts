import request = require("request-promise");
import logger from "../util/logger";

export class DojotClient {
  private _server: string;
  private _username: string;
  private _password: string;

  private constructor() {}

  static build() {
    return new DojotClient();
  }

  withServer(server: string) {
    this._server = server;
    return this;
  }

  andUsername(username: string) {
    this._username = username;
    return this;
  }

  andPassword(password: string) {
    this._password = password;
    return this;
  }

  getToken(resolve: Resolve) {
    request
      .post(`http://${this._server}:8000/auth`, {
        json: {
          username: this._username,
          passwd: this._password
        }
      })
      .then(res => {
        logger.debug("User token has been recovered");
        request
          .get(`http://${this._server}:8000/stream/socketio`, {
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
