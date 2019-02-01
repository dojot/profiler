import { Request, Response } from "express";
import { Test } from "../models/Test";
import { Message } from "../models/Message";
import fs = require('fs');
import readline = require('readline');
import { UploadedFile } from "express-fileupload";
import shell = require('shelljs');

export let create = (req: Request, res: Response) => {
    // let content = shell.exec('mqtt-beamer admin 436c75 100 100').stdout;
    // console.log('Tratando respostas');
    // console.log(content);
    
    // if (Object.keys(req.files).length == 0) {
    //     return res.status(400).send('No files were uploaded.');
    // }

    // if('mv' in req.files.sampleFile){
    //     let sampleFile = req.files.sampleFile;
    //     sampleFile.mv('/tmp/upload.csv', (err: any) => {
    //         if (err) {
    //             console.log('Error while copying file to target location');
    //         }
    //     });
    // }

    var test = new Test();

    readline.createInterface({
        input: fs.createReadStream(`/l/disk0/alribeiro/uploads/${req.body.fileName.trim()}`),
        output: process.stdout,
        terminal: false
    })
    .on('line', line =>  {
        test.addMessage(Message.instance(line));
    })
    .on('close', () => {
        res.json({
            device_ids: test.messages.map(message => message.deviceTimestamp.toString()),
            delays: test.messages.map(message => message.delay),
            delay_avarage: test.delayAvarage,
            standard_derivation: test.standardDerivation,
            out_of_order_messages: test.outOfOrderMessages,
            total_received_messages: test.totalMessages,
            total_sent_messages: test.totalSentMessages
        });
    })    
  
};
