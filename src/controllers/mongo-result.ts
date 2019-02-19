import { Request, Response } from "express";
import { Test } from "../models/Test";
import { MongoMessage } from "../models/MongoMessage";
import { DBMessageDAO } from "../daos/DBMessageDAO";
import { Client } from "pg";
import { FullMessage } from "../models/FullMessage";

export let create = (req: Request, res: Response) => {
  const client = new Client();
  client.connect();
  const messageDAO = new DBMessageDAO(client);

  messageDAO
    .allByTestName(req.body.fileName)
    .then((messages: FullMessage[]) => {
      const mongoMessages = messages.map(m => MongoMessage.instance(m));
      res.json(new Test(mongoMessages).json);
      client.end();
    });
};
