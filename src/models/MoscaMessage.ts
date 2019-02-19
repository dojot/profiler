import { Message } from "./Message";
import { FullMessage } from "./FullMessage";

export class MoscaMessage extends Message {
  public static instance(fullMessage: FullMessage) {
    const message = new MoscaMessage();
    message.setSendTime(fullMessage.deviceTime);
    message.setGetTime(fullMessage.moscaTime);
    message.setSendOrder(fullMessage.sendOrder);
    message.setTotalSentMessages(fullMessage.total);

    return message;
  }
}
