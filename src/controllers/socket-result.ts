import { Request, Response } from "express";
import { Test } from "../models/Test";
import { SocketMessage } from "../models/SocketMessage";
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
      const socketMessages = messages.map(m => SocketMessage.instance(m));
      res.json(new Test(socketMessages).json);
      client.end();
    });
};
