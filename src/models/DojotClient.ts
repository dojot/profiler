import request = require("request-promise");
import { RequestPromise } from "request-promise";

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
        request
          .get(`http://${this._server}:8000/stream/socketio`, {
            headers: {
              Authorization: `Bearer ${res.jwt}`
            }
          })
          .then(res => {
            resolve(JSON.parse(res).token);
          });
      });
  }
}

interface Resolve {
  (token: string): void;
}
