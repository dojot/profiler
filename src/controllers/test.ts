import { Request, Response } from "express";
import * as _ from "lodash";
import { DBMessageDAO } from "../daos/DBMessageDAO";
import { DBTestDAO } from "../daos/DBTestDAO";
import { MongoMessageDAO } from "../daos/MongoMessageDAO";
import { FullTest } from "../models/FullTest";
import { test, messageProcessor, dojotClient, beamerClient } from "../util/dsl";
import { Client } from "pg";
import { ResultFile } from "../models/ResultFile";
import logger from "../util/logger";

export let create = (req: Request, res: Response) => {
  const host = req.body.server;
  const username = req.body.username;
  const password = req.body.password;
  const tenant = req.body.tenant;
  const device = req.body.device;
  const messages = _.toInteger(req.body.messages);
  const perSecond = _.toInteger(req.body.perSecond);
  const client = new Client();

  client.connect();

    const testDAO = new DBTestDAO(client);
    const mongoMessageDAO = new MongoMessageDAO();
    const messageDAO = new DBMessageDAO(client);

    test()
    .withHost(host)
    .andPassword(password)
    .andUsername(username)
    .andTenant(tenant)
    .andDevice(device)
    .andTotalMessagesOf(messages)
    .andTotalSendPerSecondOf(perSecond)
    .persistWith(testDAO)
    .then((test: FullTest) => {
      dojotClient()
        .forTest(test)
        .getSocketClient(socketClient => {
          socketClient
            .forTest(test)
            .createClient()
            .whenReceiveMessage(
              messageProcessor()
                .forTest(test)
                .using(mongoMessageDAO)
                .and(messageDAO),
              () => {
                socketClient.close();
                testDAO.all().then((tests: FullTest[]) => {
                  const data = tests.map(t => {
                    const result = new ResultFile(t.name);
                    return {
                      name: result.name,
                      formattedName: result.formattedName
                    };
                  });
                  client.end();
                  logger.debug("returning report data");
                  res.json({
                    files: data
                  });
                });
              }
            );

          beamerClient()
            .forTest(test)
            .execute();
        });
    });
  

  
};
