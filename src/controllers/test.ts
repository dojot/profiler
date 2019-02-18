import { Request, Response } from "express";
import * as _ from "lodash";
import { DojotClient } from "../models/DojotClient";
import { TestBuilder } from "../models/TestBuilder";
import { SocketClient } from "../models/SocketClient";
import { BeamerClient } from "../models/BeamerClient";
import { MessageProcessor } from "../models/MessageProcessor";
import { DBMessageDAO } from "../daos/DBMessageDAO";
import { DBTestDAO } from "../daos/DBTestDAO";
import { MongoMessageDAO } from "../daos/MongoMessageDAO";
import { FullTest } from "../models/FullTest";
import { Client } from "pg";

export let create = (req: Request, res: Response) => {
  const server = req.body.server;
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

  const test = new TestBuilder()
    .withHost(server)
    .andPassword(password)
    .andUsername(username)
    .andTenant(tenant)
    .andDevice(device)
    .andTotalMessagesOf(messages)
    .andTotalSendPerSecondOf(perSecond)
    .createWith(testDAO)
    .then((test: FullTest) => {
      const messageProcessor = new MessageProcessor()
        .forTest(test)
        .using(mongoMessageDAO)
        .and(messageDAO);

      new DojotClient().forTest(test).getToken(token => {
        const socketClient = new SocketClient()
          .forTest(test)
          .usingToken(token)
          .createClient()
          .andProcesstWith(messageProcessor, () => {
            console.log('messages processed...');
            socketClient.close();
            testDAO.all().then((tests: FullTest[]) => {
              client.end();
              res.json({
                files: tests.map(t => t.name)
              });
            });
          });

        BeamerClient.build()
          .withServer(server)
          .andTenant(tenant)
          .andDevice(device)
          .andTotalSendPerSecondOf(perSecond)
          .andTotalMessagesOf(messages)
          .execute();
      });
    });
};
