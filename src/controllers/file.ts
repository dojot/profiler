import { Request, Response } from "express";
import fs = require('fs');
import { ResultFile } from "../models/ResultFile";

export let index = (req: Request, res: Response) => {
    try {

        fs.readdir('/l/disk0/alribeiro/uploads', (err, files) => {
            let data = files.map(f => {
                let result = new ResultFile(f);
                return {
                    name: result.name,
                    formattedName: result.formattedName
                };
            });
            res.json({
                files: data
            });
        });
      
    } catch (error) {
        console.log('Error: ' + error);
    }

}
