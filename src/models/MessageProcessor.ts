import { File } from "./File";
import { FullMessage } from "./FullMessage";
import { MONGODB_URI } from "../util/secrets";
import mongoose from "mongoose";
import mongooseMessage from "./MongooseMessage";
import { MongoMessageDAO } from "../daos/MongoMessageDAO";
import { DBMessageDAO } from "../daos/DBMessageDAO";

export class MessageProcessor {
  private _messages: FullMessage[] = [];
  private _MessageModel: mongoose.Model<mongoose.Document>;
  private _mongoMessageDAO: MongoMessageDAO;
  private _dbMessageDAO: DBMessageDAO;

  private constructor(mongoMessageDAO: MongoMessageDAO, dbMessageDAO: DBMessageDAO){
    this._mongoMessageDAO = mongoMessageDAO;
    this._dbMessageDAO = dbMessageDAO;
  }

  process(data: any, tenant: string, device: string) {
    const fullMessage = FullMessage.instance(data);
    this._messages.push(fullMessage);

    if (fullMessage.isTheLastOne) {
      
      this._mongoMessageDAO.allBy(this._messages, tenant, device).then( (fromMongo: FullMessage[]) => {
        this._dbMessageDAO.saveAll(fromMongo).then( (fromDB: FullMessage[]) => {
          console.log(fromDB);
        });
      });
    //   const waitingTime = 2000 + this._lines.length * 0.5;
    //   console.log(
    //     `waiting ${waitingTime / 1000} seconds for mongodb saving data`
    //   );
    //   setTimeout(() => {
    //     mongoose
    //       .connect(MONGODB_URI, { useMongoClient: true, poolSize: 1 })
    //       .then(() => {
    //         this._MessageModel = mongooseMessage(`${tenant}_${device}`);
    //         const deviceTimes = this._lines.map(line => line.deviceTime);

    //         this._MessageModel
    //           .where("value")
    //           .in(deviceTimes)
    //           .then((docs: any[]) => {
    //             console.log("Appending mongo results to file...");
    //             let nResults = 0;
    //             const instance = File.instance;
    //             this._lines.forEach(line => {
    //               nResults++;
    //               if (nResults % 500 == 0) {
    //                 console.log(`${nResults} were appended.`);
    //               }
    //               const doc = docs.find(doc => doc.value == line.deviceTime);
    //               line.mongoTime = doc.saved_ts;
    //               instance.appendLine(line);
    //             });
    //             instance.flush(true);
    //             console.log(`${nResults} were appended.`);
    //             console.log("... results were appened.");
    //             mongoose.disconnect();
    //           });
    //       })
    //       .catch(err => {
    //         mongoose.disconnect();
    //         console.log(
    //           "MongoDB connection error. Please make sure MongoDB is running. " +
    //             err
    //         );
    //       });
    //   }, waitingTime);
    }
  }

  public static instance(mongoDAO: MongoMessageDAO, dbDAO: DBMessageDAO){
    return new MessageProcessor(mongoDAO, dbDAO);
  }
}
