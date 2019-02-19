import { Request, Response } from "express";
import { FullTest } from "../models/FullTest";
import { DBTestDAO } from "../daos/DBTestDAO";
import { Client } from "pg";
import { ResultFile } from "../models/ResultFile";

export let index = (req: Request, res: Response) => {
  const client = new Client();
  client.connect();
  const testDAO = new DBTestDAO(client);

  try {
    testDAO.all().then((tests: FullTest[]) => {
      client.end();

      const data = tests.map(t => {
        const result = new ResultFile(t.name);
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
    console.log("Error: " + error);
  }
};
