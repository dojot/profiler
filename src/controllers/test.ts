import { Request, Response } from "express";
import * as _ from "lodash";
import { DojotClient } from "../models/DojotClient";
import { SocketClient } from "../models/SocketClient";
import { BeamerClient } from "../models/BeamerClient";
import { MessageProcessor } from "../models/MessageProcessor";
import { DBMessageDAO } from "../daos/DBMessageDAO";
import { MongoMessageDAO } from "../daos/MongoMessageDAO";

export let create = (req: Request, res: Response) => {
  const server = req.body.server;
  const username = req.body.username;
  const password = req.body.password;
  const tenant = req.body.tenant;
  const device = req.body.device;
  const messages = _.toInteger(req.body.messages);
  const perSecond = _.toInteger(req.body.perSecond);
  const mongoDAO = new MongoMessageDAO();
  const dbDAO = new DBMessageDAO();

  DojotClient.build()
    .withServer(server)
    .andUsername(username)
    .andPassword(password)
    .getToken(token => {

      const socketClient = SocketClient.build()
        .withServer(server)
        .andTenant(tenant)
        .andDevice(device)
        .andToken(token)
        .createClient()
        .andProcessMessageWith(MessageProcessor.instance(mongoDAO, dbDAO))
        .start();

      BeamerClient.build()
        .withServer(server)
        .andTenant(tenant)
        .andDevice(device)
        .andTotalSendPerSecondOf(perSecond)
        .andTotalMessagesOf(messages)
        .execute(result => {
          socketClient.close();
          res.json({
            files: result
          });
        });
    });
};
