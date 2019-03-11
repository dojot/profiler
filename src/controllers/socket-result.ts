import { Request, Response } from "express";
import { Test } from "../models/Test";
import { SocketMessage } from "../models/SocketMessage";
import { DBMessageDAO } from "../daos/DBMessageDAO";
import { DBTestDAO } from "../daos/DBTestDAO";
import { Client } from "pg";

export let create = async (req: Request, res: Response) => {
  const fileName = req.body.fileName;
  const client = new Client();
  const messageDAO = new DBMessageDAO(client);
  const testDAO = new DBTestDAO(client);
  client.connect();

  const fullTest = await testDAO.byName(fileName);
  const messages = await messageDAO.allByTestName(req.body.fileName);

  const socketMessages = messages.map(m => SocketMessage.instance(m));
  res.json(new Test(socketMessages, fullTest).json);
  client.end();

};
