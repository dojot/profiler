import { File } from "./File";
import { FileLine } from "./FileLine";
import fs = require("fs");
import logger from "../util/logger";
import util = require("util");

export class MessageProcessor{
    processMessage(data: any){
        const file = File.instance;
        const message = FileLine.instance(data);

        fs.appendFile(file.path, message.content, err => {
        if (err)
            logger.debug(`Error writing message: ${util.inspect(data)}`);

        if (message.last) {
            logger.debug(`Last message: ${util.inspect(data)}`);

            fs.rename(file.path, file.newPath, err => {
            if (err) console.log("Error: " + err);
            });
        }
        });

    }
}
