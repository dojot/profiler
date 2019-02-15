import { Message } from "./Message";
import * as _ from "lodash";

export class Test {
  private _messages: Message[] = [];

  constructor(messages: Message[] = []) {
    this._messages = messages;
  }

  public addMessage(message: Message) {
    this._messages.push(message);
  }

  public get totalMessages() {
    return this._messages.length;
  }

  public get messages() {
    return this._messages;
  }

  public get delayAvarage(): number {
    if (this.messages.length == 0) {
      throw new TypeError("There are not messages to calculate delay avarage");
    }
    return _.round(
      this.messages.map(m => m.delay).reduce((a, b) => a + b) /
        this.totalMessages,
      2
    );
  }

  public get standardDerivation(): number {
    const avarage = this.delayAvarage;
    let derivationSum = 0;
    this.messages.forEach(m => {
      const distance = m.delay - avarage;
      const derivation = distance * distance;
      derivationSum += derivation;
    });
    const derivationAvarage = derivationSum / this.totalMessages;

    return _.round(Math.sqrt(derivationAvarage), 2);
  }

  get outOfOrderMessages() {
    let total = 0;
    const devicesTime = this.messages.map(m => m.sendTimestamp);
    const devicesTimeOrdered = this.messages.map(m => m.sendTimestamp).sort();

    this.messages.forEach(message => {
      const deviceTimeIndex = devicesTime.indexOf(message.sendTimestamp);
      const deviceTimeOrderedIndex = devicesTimeOrdered.indexOf(
        message.sendTimestamp
      );

      if (deviceTimeIndex != deviceTimeOrderedIndex) {
        total += 1;
      }
    });

    return total;
  }

  get totalSentMessages(): number {
    return this.messages[0].totalSentMessages;
  }

  get json() {
    return {
      device_ids: this.messages.map(message => message.sendTime.toString()),
      delays: this.messages.map(message => message.delay),
      delay_avarage: this.delayAvarage,
      standard_derivation: this.standardDerivation,
      out_of_order_messages: this.outOfOrderMessages,
      total_received_messages: this.totalMessages,
      total_sent_messages: this.totalSentMessages
    };
  }
}
