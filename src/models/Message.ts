import * as _ from "lodash";

export abstract class Message {
  private _sendTime: Date;
  private _getTime: Date;
  private _sendOrder: number;
  private _totalSentMessages: number;


  setSendTime(data: number) {
    try {
      this._sendTime = this._convertDate(data);
    } catch (error) {
      throw new TypeError("Device time is not valid");
    }
  }

  setGetTime(data: number) {
    try {
      this._getTime = this._convertDate(data);
    } catch (error) {
      throw new TypeError("Mosca time is not valid");
    }
  }

  setSendOrder(data: number) {
    this._sendOrder = data;
  }

  setTotalSentMessages(data: number) {
    this._totalSentMessages = data;
    if (_.isNull(data)) {
      throw new TypeError("Total messages is not valid");
    }
  }

  get sendTime(): Date {
    return this._sendTime;
  }

  get sendTimestamp(): number {
    return this._sendTime.getTime();
  }

  get getTime(): Date {
    return this._getTime;
  }

  get getTimestamp(): number {
    return this._getTime.getTime();
  }

  get totalSentMessages(): number {
    return this._totalSentMessages;
  }

  get sendOrder() {
    return this._sendOrder;
  }

  get delay() {
    return this.getTimestamp - this.sendTimestamp;
  }

  private _convertDate(data: number): Date {
    const date = new Date(data);
    if (!_.isDate(date)) {
      throw new TypeError("date time is not valid");
    }
    return date;
  }

}

