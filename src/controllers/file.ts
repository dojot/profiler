import { Request, Response } from "express";
import fs = require("fs");
import { ResultFile } from "../models/ResultFile";

export let index = (req: Request, res: Response) => {
  try {
    fs.readdir("/home/uploads", (err, files) => {
      if (err) {
        res.json({
          files: []
        });
      } else {
        const data = files.map(f => {
          const result = new ResultFile(f);
          return {
            name: result.name,
            formattedName: result.formattedName
          };
        });
        res.json({
          files: data
        });
      }
    });
  } catch (error) {
    console.log("Error: " + error);
  }
};
