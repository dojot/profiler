export class FullMessage {
  private _id: number;
  private _total: number;
  private _last: boolean = false;
  private _deviceTime: number;
  private _moscaTime: number;
  private _mongoTime: number;
  private _socketTime: number;

  constructor(
    deviceTime: number,
    moscaTime: number,
    socketTime: number,
    total: number,
    last: boolean,
    mongoTime?: number,
    id?: number
  ) {
    this._deviceTime = deviceTime;
    this._moscaTime = moscaTime;
    this._socketTime = socketTime;
    this._last = last;
    this._total = total;
    this._mongoTime = mongoTime;
    this._id = id;
  }

  get content(): string {
    return `${this._deviceTime};${this._moscaTime};${this._socketTime};${
      this._mongoTime
    };${this._total};${this.isTheLastOne}\n`;
  }

  get isTheLastOne(): boolean {
    return this._last;
  }

  get deviceTime(): number {
    return this._deviceTime;
  }

  get moscaTime(): number {
    return this._moscaTime;
  }

  get mongoTime(): number {
    return this._mongoTime;
  }

  get socketTime(): number {
    return this._socketTime;
  }

  get total(): number {
    return this._total;
  }

  get last(): boolean{
    return this._last;
  }

  get id(): number{
    return this._id;
  }

  set mongoTime(mongoTime: number) {
    this._mongoTime = mongoTime;
  }

  set id(id: number) {
    this._id = id;
  }

  public static instance(data: any): FullMessage {
    const socketTime = new Date().getTime();
    return new FullMessage(
      Number(data.attrs.perf),
      Number(data.metadata.timestamp),
      socketTime,
      data.attrs.total_messages,
      data.attrs.last_message
    );
  }
}