import { FullMessage } from "../models/FullMessage";
import { MONGODB_URI } from "../util/secrets";
import mongoose from "mongoose";
import mongooseMessage from "../models/MongooseMessage";

export class MongoMessageDAO {
  allBy(messages: FullMessage[], host: string, tenant: string, device: string) {
    return new Promise((resolve, reject) => {
      const waitingTime = 2000 + messages.length * 0.5;
      console.log(
        `waiting ${waitingTime / 1000} seconds for mongodb saving data...`
      );
      setTimeout(() => {[]
        mongoose
          .connect(`mongodb://${host}:27017/device_history`, { useMongoClient: true, poolSize: 1 })
          .then(() => {
            const messageModel = mongooseMessage(`${tenant}_${device}`);
            const deviceTimes = messages.map(message => message.deviceTime);

            messageModel
              .where("value")
              .in(deviceTimes)
              .then((docs: any[]) => {
                console.log("Messages got from mongodb...");
                messages.forEach(message => {
                  const doc = docs.find(doc => doc.value == message.deviceTime);
                  message.mongoTime = doc.saved_ts;
                });
                
                resolve(messages);
                mongoose.disconnect();
              }).catch(err => {
                console.log(err.message);
                reject(err);
              })
          })
          .catch(err => {
            mongoose.disconnect();
            console.log(
              "MongoDB connection error. Please make sure MongoDB is running. " +
                err
            );
            reject(err);
          });
      }, waitingTime);
    });
  }
}
