import * as _ from "lodash";

export class Message {
  private _sendTime: Date;
  private _getTime: Date;
  private _totalSentMessages: number;


  setSendTime(data: string) {
    try {
      this._sendTime = this._convertDate(data);
    } catch (error) {
      throw new TypeError("Device time is not valid");
    }
  }

  setGetTime(data: string) {
    try {
      this._getTime = this._convertDate(data);
    } catch (error) {
      throw new TypeError("Mosca time is not valid");
    }
  }

  setTotalSentMessages(data: string) {
    this._totalSentMessages = _.toNumber(data);
    if (!_.isNumber(this._totalSentMessages) || _.isEmpty(data)) {
      throw new TypeError("Order is not valid");
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

  get delay() {
    return this.getTimestamp - this.sendTimestamp;
  }

  private _convertDate(data: string): Date {
    const timestamp = _.toNumber(data);
    if (_.isNaN(timestamp) || _.isEmpty(data)) {
      throw new TypeError("date is not valid");
    }
    const date = new Date(timestamp);
    if (!_.isDate(date)) {
      throw new TypeError("date time is not valid");
    }
    return date;
  }

  public static instance(data: String) {
    if (data == undefined || data.length == 0) {
      throw new TypeError("Data can't be empty");
    }
    const row = data.split(";");
    if (row.length < 4) {
      throw new TypeError("Message doens't have enough data");
    }
    const message = new Message();
    message.setSendTime(row[0]);
    message.setGetTime(row[2]);
    message.setTotalSentMessages(row[4]);

    return message;
  }
}

