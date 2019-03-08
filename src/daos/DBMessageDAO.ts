import { Client } from "pg";
import { FullMessage } from "../models/FullMessage";
import { FullTest } from "../models/FullTest";
import logger from "../util/logger";

export class DBMessageDAO {
  private _client: Client;

  constructor(client: Client) {
    this._client = client;
  }

  allByTestName(name: string): Promise<FullMessage[]> {
    return new Promise((resolve, reject) => {
      const messages: FullMessage[] = [];

      this._client.query(
        "select m.* from messages m join tests t on t.id = m.test_id where t.name = $1 order by id",
        [name],
        (err, result) => {
          if (err) {
            console.log(err);
            reject(err);
          } else {
            result.rows.forEach(row => {
              messages.push(
                new FullMessage(
                  Number(row.device_time),
                  Number(row.mosca_time),
                  Number(row.socket_time),
                  Number(row.send_order),
                  row.last_message,
                  row.total_messages,
                  Number(row.mongo_time),
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
      let insert: string = "";
      let count = 0;
      messages.forEach(message => {
        insert += `(${message.deviceTime},${message.moscaTime},${
          message.socketTime
        },${message.mongoTime},${message.sendOrder},${message.total},${
          message.last
        },${test.id}),`;
        count++;
        if(count % 500 == 0){
          logger.debug(`Formatted ${count} messages`);
        }
      });
      this._client.query(
        `insert into messages (device_time, mosca_time, socket_time, mongo_time, send_order, total_messages, last_message, test_id) values ${insert.slice(
          0,
          -1
        )} RETURNING id`,
        (err, result) => {
          if (err) {
            console.log(err);
            reject(err);
          } else {
            test.messages = messages;
            logger.debug(`Saved ${messages.length} messages`);
            resolve(messages);
          }
        }
      );
    });
  }
}
