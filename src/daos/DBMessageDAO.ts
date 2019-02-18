import { Client } from "pg";
import { FullMessage } from "../models/FullMessage";
import { FullTest } from "../models/FullTest";

export class DBMessageDAO {
  private _client: Client;

  constructor(client: Client) {
    this._client = client;
  }

  allByTestName(name: string) {
    return new Promise((resolve, reject) => {
      let messages: FullMessage[] = [];

      this._client.query(
        "select m.* from messages m join tests t on t.id = m.test_id where t.name = $1",
        [name],
        (err, result) => {
          if (err) {
            console.log(err);
            reject(err);
          } else {
            result.rows.forEach(row => {
              messages.push(
                new FullMessage(
                  row.device_time,
                  row.mosca_time,
                  row.socket_time,
                  row.last_message,
                  row.total_messages,
                  row.mongo_time,
                  row.id
                )
              );
            });
          }
          resolve(messages);
        }
      );
    });
  }

  saveAll(messages: FullMessage[], test: FullTest) {
    return new Promise((resolve, reject) => {
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
              test.addMessage(message);
            }
          }
        );
      });

      resolve(messages);
    });
  }
}
