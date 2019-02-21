import { Request, Response } from "express";
import * as _ from "lodash";
import { DBMessageDAO } from "../daos/DBMessageDAO";
import { DBTestDAO } from "../daos/DBTestDAO";
import { MongoMessageDAO } from "../daos/MongoMessageDAO";

import { test, messageProcessor, dojotClient, beamerClient } from "../util/dsl";
import { format } from "../util/tests-formatter";
import { Client } from "pg";

export let create = async (req: Request, res: Response) => {
  const host = req.body.server;
  const username = req.body.username;
  const password = req.body.password;
  const tenant = req.body.tenant;
  const device = req.body.device;
  const messages = _.toInteger(req.body.messages);
  const perSecond = _.toInteger(req.body.perSecond);

  const pgClient = new Client();
  pgClient.connect();
  const testDAO = new DBTestDAO(pgClient);
  const mongoMessageDAO = new MongoMessageDAO();
  const messageDAO = new DBMessageDAO(pgClient);

  const whenFinish = async () => {
    const tests = await testDAO.all();
    res.json({
      files: format(tests)
    });

    socketClient.close();
    pgClient.end();
  };

  const newTest = test()
    .withHost(host)
    .andPassword(password)
    .andUsername(username)
    .andTenant(tenant)
    .andDevice(device)
    .andTotalMessagesOf(messages)
    .andTotalSendPerSecondOf(perSecond).instance;

  const savedTest = await testDAO.save(newTest);
  const socketClient = await dojotClient()
    .forTest(savedTest)
    .getSocketClient();

  socketClient
    .forTest(savedTest)
    .createClient()
    .processMessageWith(
      messageProcessor()
        .forTest(savedTest)
        .using(mongoMessageDAO)
        .and(messageDAO),
      whenFinish
    );

  beamerClient()
    .forTest(savedTest)
    .execute();
};
