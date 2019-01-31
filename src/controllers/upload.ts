import { Request, Response } from "express";
import { Chart } from "../models/Chart";
import { Report } from "../models/Report";
import { Message } from "../models/Message";
import fs = require('fs');
import readline = require('readline');

export let create = (req: Request, res: Response) => {
    if (Object.keys(req.files).length == 0) {
        return res.status(400).send('No files were uploaded.');
    }
    
    const sampleFile = req.files.sampleFile;

    sampleFile.mv('/tmp/upload.csv', (err: any) => {
        if (err) {
            console.log('Error while copying file to target location');
        }
    });

    var rd = readline.createInterface({
        input: fs.createReadStream('/tmp/upload.csv'),
        output: process.stdout,
        terminal: false
      });

      var report = new Report();

      rd.on('line', line =>  {
          report.addMessage(Message.instance(line));
      });

      rd.on('close', () => {
        let chart = new Chart();
        chart.labels = report.messages.map(message => message.order.toString());
        chart.data = report.messages.map(message => message.delay);
    
        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify(chart));
      });
    
  
};
