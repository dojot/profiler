import { Client } from "pg";
import { FullMessage } from "../models/FullMessage";

export class DBMessageDAO {
  private _client: Client;

  constructor() {
    this._client = new Client();
  }
  saveAll(messages: FullMessage[]) {
    return new Promise((resolve, reject) => {
      this._client.connect();

      messages.forEach(message => {
        this._client.query(
          "insert into messages (device_time, mosca_time, socket_time, mongo_time, total_messages, last_massage) values ($1, $2, $3, $4, $5, $6) RETURNING id",
          [
            message.deviceTime,
            message.moscaTime,
            message.socketTime,
            message.mongoTime,
            message.total,
            message.last
          ],
          (err, result) => {
            if (err) {
              console.log(err);
              reject(err);
            } else {
              message.id = result.rows[0].id; 
            }
          }
        );
      });

     // this._client.end();
      resolve(messages);
    });
  }
}
