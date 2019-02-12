import { File } from "./File";
import { FileLine } from "./FileLine";
import { MONGODB_URI } from "../util/secrets";
import mongoose from "mongoose";

export class MessageProcessor {
  private _lines: any[] = [];
  process(data: any, tenant: string, device: string) {
    const fileLine = FileLine.instance(data);
    this._lines.push(fileLine);

    if (fileLine.last) {
      console.log("waiting 2 seconds for mongodb saving data");
      setTimeout(() => {
        mongoose
          .connect(MONGODB_URI, { useMongoClient: true, poolSize: 1 })
          .then(() => {
            const MessageModel = mongoose.model(
              `${tenant}_${device}`,
              new mongoose.Schema({
                _id: mongoose.Schema.Types.ObjectId,
                value: Number
              })
            );
            const deviceTimes = this._lines.map(line => line.deviceTime);
            MessageModel.where("value")
              .in(deviceTimes)
              .then((docs: any[]) => {
                this._lines.forEach(line => {
                  const doc = docs.find(doc => doc.value == line.deviceTime);
                  line.mongoTime = mongoose.Types.ObjectId(doc._id)
                    .getTimestamp()
                    .getTime();
                  File.instance.appendLine(line);
                });
              });
          })
          .catch(err => {
            console.log(
              "MongoDB connection error. Please make sure MongoDB is running. " +
                err
            );
          });
      }, 2000);
    }
  }
}
