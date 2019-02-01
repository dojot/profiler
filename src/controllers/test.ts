import { Request, Response } from "express";
import chokidar = require('chokidar');
import fs = require('fs');
import * as _ from 'lodash';
import shell = require('shelljs');

export let create = (req: Request, res: Response) => {
    const tenant = req.body.tenant;
    const device = req.body.device;
    const messages = _.toInteger(req.body.messages);
    const perSecond = _.toInteger(req.body.perSecond);


    shell.exec(`mqtt-beamer ${tenant} ${device} ${perSecond} ${messages}`, {async: true}, () => {
        
            try {
            shell.exec(`mqtt-beamer ${tenant} ${device} ${perSecond} ${messages}`, {async: true}, () => {

                let watcher = fs.watch('/l/disk0/alribeiro/uploads', { encoding: 'buffer' }, (eventType, filename) => {
                    fs.readdir('/l/disk0/alribeiro/uploads', (err, files) => {
                        res.json({
                            files: files
                        });
                    });
                    watcher.close();

                });

            });
            
        } catch (error) {
            console.log('Error: ' + error);
        }

    });

       
    

   

    

    

    
}