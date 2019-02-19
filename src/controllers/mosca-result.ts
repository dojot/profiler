import { Request, Response } from "express";
import { Test } from "../models/Test";
import { MoscaMessage } from "../models/MoscaMessage";
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
      const moscaMessages = messages.map(m => MoscaMessage.instance(m));
      res.json(new Test(moscaMessages).json);
      client.end();
    });
};
