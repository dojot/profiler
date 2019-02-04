import { Request, Response } from "express";
import fs = require('fs');

export let index = (req: Request, res: Response) => {
    try {

        fs.readdir('/l/disk0/alribeiro/uploads', (err, files) => {
            res.json({
                files: files
            });
        });
      
    } catch (error) {
        console.log('Error: ' + error);
    }

}
