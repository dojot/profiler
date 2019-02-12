import fs = require("fs");
import logger from "../util/logger";
import util = require("util");
import { FileLine } from "./FileLine";
import { Message } from "./Message";
import { SocketMessage } from "./SocketMessage";
import readline = require("readline");

export class File {
  private _path: string = "";
  private _newPath: string = "";

  private static DIRECTORY = "/home/uploads";

  private constructor(path: string, newPath?: string) {
    this._path = path;
    this._newPath = newPath;
  }

  get path(): string {
    return this._path;
  }

  get newPath(): string {
    return this._newPath;
  }

  public static get instance(): File {
    const date = new Date();
    const day = date.getDate();
    const month = date.getMonth();
    const year = date.getFullYear();
    const hour = date.getHours();
    const minute = date.getMinutes();
    const seconds = date.getSeconds();
    const newName = `${day}_${month}_${year}_${hour}_${minute}_${seconds}`;

    return new File(`${this.DIRECTORY}/result.csv`, `${this.DIRECTORY}/${newName}.csv`);
  }

  public static from(path: string): File {
    return new File(path);
  }

  public appendLine(fileLine: FileLine) {
    fs.appendFile(this._path, fileLine.content, err => {
      if (err) logger.debug(`Error writing message: ${util.inspect(fileLine)}`);

      if (fileLine.last) {
        logger.debug(`Last message: ${util.inspect(fileLine)}`);
        this.rename();
      }
    });
  }

  public getLines(factory: Factory) {
    const messages: Message[] = [];
    return new Promise( (resolve, reject) => {
      readline
      .createInterface({
        input: fs.createReadStream(`${File.DIRECTORY}/${this.path}`),
        output: process.stdout,
        terminal: false
      })
      .on("line", line => {
        messages.push(factory(line));
      })
      .on("close", () => {
        resolve(messages);
      });
    })
  }

  public rename() {
    fs.rename(this._path, this._newPath, err => {
      if (err) console.log("Error: " + err);
    });
  }
}

interface Resolve {
  (messages: Message[]): void;
}

interface Factory {
  (line: any): Message;
}
