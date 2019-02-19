import { Message } from "./Message";
import { FullMessage } from "./FullMessage";

export class MongoMessage extends Message {
  public static instance(fullMessage: FullMessage) {
    const message = new MongoMessage();
    message.setSendTime(fullMessage.deviceTime);
    message.setGetTime(fullMessage.mongoTime);
    message.setSendOrder(fullMessage.sendOrder);
    message.setTotalSentMessages(fullMessage.total);

    return message;
  }
}
