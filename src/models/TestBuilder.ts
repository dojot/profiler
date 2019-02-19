import { FullTest } from "./FullTest";
import { DBTestDAO } from "../daos/DBTestDAO";

export class TestBuilder {
  private _id: number;
  private _host: string;
  private _tenant: string;
  private _username: string;
  private _password: string;
  private _device: string;
  private _perSecond: number;
  private _totalMessages: number;

  public withHost(host: string) {
    this._host = host;
    return this;
  }

  public andTenant(tenant: string) {
    this._tenant = tenant;
    return this;
  }

  public andUsername(username: string) {
    this._username = username;
    return this;
  }

  public andPassword(password: string) {
    this._password = password;
    return this;
  }

  public andDevice(device: string) {
    this._device = device;
    return this;
  }

  public andTotalMessagesOf(totalMessages: number) {
    this._totalMessages = totalMessages;
    return this;
  }

  public andTotalSendPerSecondOf(perSecond: number) {
    this._perSecond = perSecond;
    return this;
  }

  public persistWith(dao: DBTestDAO) {
    const newTest = new FullTest(
      this.newName(),
      this._host,
      this._tenant,
      this._username,
      this._password,
      this._device,
      this._perSecond,
      this._totalMessages
    );

    return dao.save(newTest);
  }

  private newName(): string {
    const date = new Date();
    const day = date.getDate();
    const month = date.getMonth();
    const year = date.getFullYear();
    const hour = date.getHours();
    const minute = date.getMinutes();
    const seconds = date.getSeconds();
    const newName = `${day}_${month}_${year}_${hour}_${minute}_${seconds}`;
    return newName;
  }
}
