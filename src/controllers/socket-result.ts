import { Request, Response } from "express";
import { Test } from "../models/Test";
import { Message } from "../models/Message";
import { SocketMessage } from "../models/SocketMessage";
import { File } from "../models/File";

export let create = (req: Request, res: Response) => {
  File.from(req.body.fileName)
    .getLines(line => {
      return SocketMessage.instance(line);
    })
    .then((messages: Message[]) => {
      res.json(new Test(messages).json);
    });
};
