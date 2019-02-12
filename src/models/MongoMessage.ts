import { Message } from "./Message";

export class MongoMessage extends Message {
  public static instance(data: String) {
    if (data == undefined || data.length == 0) {
      throw new TypeError("Data can't be empty");
    }
    const row = data.split(";");
    if (row.length < 4) {
      throw new TypeError("Message doens't have enough data");
    }
    const message = new MongoMessage();
    message.setSendTime(row[0]);
    message.setGetTime(row[3]);
    message.setTotalSentMessages(row[4]);

    return message;
  }
}
