import { Request, Response } from "express";
import { Directory } from "../models/Directory";

export let index = (req: Request, res: Response) => {
  try {
    Directory.listFiles((files) => {
      res.json({
        files: files
      });
    });
  } catch (error) {
    console.log("Error: " + error);
  }
};
