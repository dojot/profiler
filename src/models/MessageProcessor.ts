import { FullMessage } from "./FullMessage";
import { MongoMessageDAO } from "../daos/MongoMessageDAO";
import { DBMessageDAO } from "../daos/DBMessageDAO";
import { FullTest } from "./FullTest";

export class MessageProcessor {
  private _messages: FullMessage[] = [];
  private _test: FullTest;
  private _mongoMessageDAO: MongoMessageDAO;
  private _dbMessageDAO: DBMessageDAO;

  forTest(test: FullTest) {
    this._test = test;
    return this;
  }

  using(mongoMessageDAO: MongoMessageDAO) {
    this._mongoMessageDAO = mongoMessageDAO;
    return this;
  }

  and(dbMessageDAO: DBMessageDAO) {
    this._dbMessageDAO = dbMessageDAO;
    return this;
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
      this._mongoMessageDAO
        .allBy(this._messages, this.tenant, this.device)
        .then((fromMongo: FullMessage[]) => {
          this._dbMessageDAO
            .saveAll(fromMongo, this._test)
            .then((fromDB: FullMessage[]) => {
              this._messages = undefined;
              resolve();
            });
        });
    }
  }
}

interface Resolve {
  (): void;
}
