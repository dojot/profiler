import { Message } from "./Message";
import * as _ from "lodash";
import { FullTest } from "./FullTest";

export class Test {
  private _messages: Message[] = [];
  private _fullTest: FullTest;
  private _name: string;
  private _id: number;

  constructor(messages: Message[] = [], fullTest?: FullTest) {
    this._messages = messages;
    this._fullTest = fullTest;
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
    const sendOrder = this.messages.map(m => m.sendOrder);
    const sendOrdered = this.messages.map(m => m.sendOrder).sort((a, b) => a - b);

    this.messages.forEach(message => {
      const sendOrderIndex = sendOrder.indexOf(message.sendOrder);
      const sendOrderedIndex = sendOrdered.indexOf(message.sendOrder);

      if (sendOrderIndex != sendOrderedIndex) {
        total += 1;
      }
    });

    return total;
  }

  get totalSentMessages(): number {
    return this.messages[0].totalSentMessages;
  }

  get averageReceivedRate(): number {
    return _.round((this.totalMessages / this.totalReceivedTime) * 1000, 2);
  }

  get totalReceivedTime(): number {
    const firstTime = this.messages[0].getTimestamp;
    const lastTime = this.messages[this.messages.length - 1].getTimestamp;
    return lastTime - firstTime;
  }

  get totalSentPerSecond(): number {
    return this._fullTest.perSecond;
  }

  get json() {
    return {
      device_ids: this.messages.map(message => `${message.sendOrder} (${message.getTime})`),
      delays: this.messages.map(message => message.delay),
      delay_avarage: this.delayAvarage,
      avarage_received_rate: this.averageReceivedRate,
      total_sent_per_second: this.totalSentPerSecond,
      standard_derivation: this.standardDerivation,
      out_of_order_messages: this.outOfOrderMessages,
      total_received_messages: this.totalMessages,
      total_sent_messages: this.totalSentMessages
    };
  }
}
