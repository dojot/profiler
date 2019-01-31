import { Request, Response } from "express";
import { Chart } from "../models/Chart";
import { Test } from "../models/Test";
import { Message } from "../models/Message";
import fs = require('fs');
import readline = require('readline');

export let create = (req: Request, res: Response) => {
    if (Object.keys(req.files).length == 0) {
        return res.status(400).send('No files were uploaded.');
    }

    req.files.sampleFile.mv('/tmp/upload.csv', (err: any) => {
        if (err) {
            console.log('Error while copying file to target location');
        }
    });

    var rd = readline.createInterface({
        input: fs.createReadStream('/tmp/upload.csv'),
        output: process.stdout,
        terminal: false
    });

    var test = new Test();

    rd.on('line', line =>  {
        test.addMessage(Message.instance(line));
    });

    rd.on('close', () => {
    res.json({
        device_ids: test.messages.map(message => message.deviceTimestamp.toString()),
        delays: test.messages.map(message => message.delay),
        delay_avarage: test.delayAvarage,
        standard_derivation: test.standardDerivation,
        out_of_order_messages: test.outOfOrderMessages,
        total_received_messages: test.totalMessages,
        total_sent_messages: test.totalSentMessages
    });
    });
    
  
};
