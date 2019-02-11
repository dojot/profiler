import fs = require("fs");
import { ResultFile } from "../models/ResultFile";

export class Directory {
  private static _path: string = "/home/uploads";
  static listFiles(resolve: Resolve) {
    fs.readdir(this._path, (err, files) => {
      let data: any = [];
      if (err) {
        resolve(data);
      } else {
        data = files.map(f => {
          const result = new ResultFile(f);
          return {
            name: result.name,
            formattedName: result.formattedName
          };
        });
        resolve(data);
      }
    });
  }
}

interface Resolve {
  (data: string): void;
}
