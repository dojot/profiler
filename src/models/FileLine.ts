class FileLine {
  private _total: number;
  private _last: boolean = false;
  private _deviceTime: string;
  private _moscaTime: string;
  private _mongoTime: number;
  private _socketTime: number;

  private constructor(
    deviceTime: string,
    moscaTime: string,
    socketTime: number,
    total: number,
    last: boolean
  ) {
    this._deviceTime = deviceTime;
    this._moscaTime = moscaTime;
    this._socketTime = socketTime;
    this._last = last;
    this._total = total;
  }

  get content(): string {
    return `${this._deviceTime};${this._moscaTime};${this._socketTime};${
      this._mongoTime
    };${this._total};${this.last}\n`;
  }

  get last(): boolean {
    return this._last;
  }

  get deviceTime(): string {
    return this._deviceTime;
  }

  set mongoTime(mongoTime: number) {
    this._mongoTime = mongoTime;
  }

  public static instance(data: any): FileLine {
    const socketTime = new Date().getTime();
    return new FileLine(
      data.attrs.perf,
      data.metadata.timestamp,
      socketTime,
      data.attrs.total_messages,
      data.attrs.last_message
    );
  }
}

export { FileLine };
