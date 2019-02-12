import { SocketIoClient } from "./SocketioClient";
import { MessageProcessor } from "./MessageProcessor";

export class SocketClient {
  private _token: string;
  private _server: string;
  private _tenant: string;
  private _device: string;
  private _client: SocketIoClient;

  private constructor() {}

  withServer(server: string) {
    this._server = server;
    return this;
  }

  andToken(token: string) {
    this._token = token;
    return this;
  }

  andTenant(tenant: string) {
    this._tenant = tenant;
    return this;
  }

  andDevice(device: string) {
    this._device = device;
    return this;
  }

  static build() {
    return new SocketClient();
  }

  createClient() {
    this._client = new SocketIoClient(
      `http://${this._server}:8000`,
      1000,
      this._token.trim()
    );
    return this;
  }

  andProcessMessageWith(processor: MessageProcessor) {
    this._client.onMessage((data: any) => {
      processor.process(data, this._tenant, this._device);
    });
    return this;
  }

  start() {
    this._client.start();
    return this;
  }

  close() {
    this._client.close();
    return this;
  }
}
