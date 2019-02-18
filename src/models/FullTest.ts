import { FullMessage } from "./FullMessage";

export class FullTest {
  private _id: number;
  private _name: string;
  private _host: string;
  private _tenant: string;
  private _username: string;
  private _password: string;
  private _device: string;
  private _perSecond: number;
  private _totalMessages: number;
  private _messages: FullMessage[] = [];

  constructor(
    name: string,
    host: string,
    tenant: string,
    username: string,
    password: string,
    device: string,
    perSecond: number,
    totalMessages: number
  ) {
    this._name = name;
    this._host = host;
    this._tenant = tenant;
    this._username = username;
    this._password = password;
    this._device = device;
    this._perSecond = perSecond;
    this._totalMessages = totalMessages;
  }

  set id(id: number) {
    this._id = id;
  }

  get id(): number {
    return this._id;
  }

  get name(): string {
    return this._name;
  }

  get host(): string {
    return this._host;
  }

  get tenant(): string {
    return this._tenant;
  }

  get username(): string {
    return this._username;
  }

  get password(): string {
    return this._password;
  }

  get device(): string {
    return this._device;
  }

  get perSecond(): number {
    return this._perSecond;
  }

  get totalMessages(): number {
    return this._totalMessages;
  }

  public addMessage(message: FullMessage) {
    this._messages.push(message);
  }
}
