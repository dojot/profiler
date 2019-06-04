import request = require("request-promise");
import logger from "../util/logger";
import { FullTest } from "./FullTest";
import { SocketClient } from "./SocketClient";

export class DojotClient {
  createSocketClientFor(test: FullTest): Promise<SocketClient> {
    return new Promise((resolve, reject) => {
      request
        .post(`http://${test.host}:8000/auth`, {
          json: {
            username: test.username,
            passwd: test.password
          }
        })
        .then(res => {
          logger.debug("User token has been recovered");
          request
            .get(`http://${test.host}:8000/stream/socketio`, {
              headers: {
                Authorization: `Bearer ${res.jwt}`
              }
            })
            .then(res => {
              const socketClient = new SocketClient().forTest(test).usingToken(JSON.parse(res).token).createClient();
              logger.debug("Socketio token has been recovered");
              resolve(socketClient);
            })
            .catch(err => {
              logger.error(`Failed to recover socketio token: ${err.message}`);
              reject(err);
            });
        })
        .catch(err => {
          logger.error(`Failed to recover user token: ${err.message}`);
          reject(err);
        });
    });
  }
}
