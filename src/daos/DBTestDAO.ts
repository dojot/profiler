import { Client } from "pg";
import { FullTest } from "../models/FullTest";

export class DBTestDAO {
  private _client: Client;

  constructor(client: Client) {
    this._client = client;
  }

  all(): Promise<FullTest[]> {
    return new Promise((resolve, reject) => {
      const testes: FullTest[] = [];
      this._client.query(
        "select * from tests order by id desc",
        (err, result) => {
          if (err) {
            console.log(err);
            reject(err);
          } else {
            result.rows.forEach(row => {
              testes.push(
                new FullTest(
                  row.name,
                  row.host,
                  row.tenant,
                  row.username,
                  row.password,
                  row.device,
                  row.perSecond,
                  row.totalMessages
                )
              );
            });
          }
          resolve(testes);
        }
      );
    });
  }

  byName(name: string): Promise<FullTest> {
    return new Promise((resolve, reject) => {
      let test: FullTest;
      this._client.query(
        "select * from tests where name = $1",
        [name],
        (err, result) => {
          if (err) {
            console.log(err);
            reject(err);
          } else {
            result.rows.forEach(row => {
              test = new FullTest(
                row.name,
                row.host,
                row.tenant,
                row.username,
                row.password,
                row.device,
                row.perSecond,
                row.totalMessages
              );
            });
          }
          resolve(test);
        }
      );
    });
  }

  save(test: FullTest): Promise<FullTest> {
    return new Promise((resolve, reject) => {
      this._client.query(
        "insert into tests (name, host, tenant, username, device, total_messages, per_second) values ($1, $2, $3, $4, $5, $6, $7) RETURNING id",
        [
          test.name,
          test.host,
          test.tenant,
          test.username,
          test.device,
          test.totalMessages,
          test.perSecond
        ],
        (err, result) => {
          if (err) {
            console.log(err);
            reject(err);
          } else {
            test.id = result.rows[0].id;
          }
          resolve(test);
        }
      );
    });
  }
}
