import { Request, Response } from "express";
import { Test } from "../models/Test";
import { Message } from "../models/Message";
import fs = require("fs");
import readline = require("readline");

export let create = (req: Request, res: Response) => {
  const test = new Test();

  readline
    .createInterface({
      input: fs.createReadStream(
        `/home/uploads/${req.body.fileName.trim()}`
      ),
      output: process.stdout,
      terminal: false
    })
    .on("line", line => {
      test.addMessage(Message.instance(line));
    })
    .on("close", () => {
      res.json({
        device_ids: test.messages.map(message =>
          message.deviceTimestamp.toString()
        ),
        delays: test.messages.map(message => message.delay),
        delay_avarage: test.delayAvarage,
        standard_derivation: test.standardDerivation,
        out_of_order_messages: test.outOfOrderMessages,
        total_received_messages: test.totalMessages,
        total_sent_messages: test.totalSentMessages
      });
    });
};