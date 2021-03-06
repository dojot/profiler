import { FullMessage } from "./FullMessage";
import { MongoMessageDAO } from "../daos/MongoMessageDAO";
import { DBMessageDAO } from "../daos/DBMessageDAO";
import { FullTest } from "./FullTest";
import { SocketClient } from "./SocketClient";

export class MessageProcessor {
  private _messages: FullMessage[] = [];
  private _socketClient: SocketClient;
  private _test: FullTest;
  private _mongoMessageDAO: MongoMessageDAO;
  private _dbMessageDAO: DBMessageDAO;

  thatProcesses(test: FullTest) {
    this._test = test;
    return this;
  }

  using(mongoMessageDAO: MongoMessageDAO) {
    this._mongoMessageDAO = mongoMessageDAO;
    return this;
  }

  withSocket(socket: SocketClient) {
    this._socketClient = socket;
    return this;
  }

  and(dbMessageDAO: DBMessageDAO) {
    this._dbMessageDAO = dbMessageDAO;
    return this;
  }

  private get host() {
    return this._test.host;
  }

  private get tenant() {
    return this._test.tenant;
  }

  private get device() {
    return this._test.device;
  }

  process(data: any, resolve: Resolve) {
    const fullMessage = FullMessage.instance(data);
    this._messages.push(fullMessage);

    if (fullMessage.isTheLastOne) {
      this._socketClient.close();

      this._mongoMessageDAO
        .allBy(this._messages, this.host, this.tenant, this.device)
        .then((fromMongo: FullMessage[]) => {
          this._dbMessageDAO
            .saveAll(fromMongo, this._test)
            .then((fromDB: FullMessage[]) => {
              this._messages = [];
              resolve();
            });
        });
    }
  }
}

interface Resolve {
  (): void;
}
