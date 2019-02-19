import { Message } from "./Message";
import { FullMessage } from "./FullMessage";

export class SocketMessage extends Message {
  public static instance(fullMessage: FullMessage) {
    const message = new SocketMessage();
    message.setSendTime(fullMessage.deviceTime);
    message.setGetTime(fullMessage.socketTime);
    message.setSendOrder(fullMessage.sendOrder);
    message.setTotalSentMessages(fullMessage.total);

    return message;
  }
}
