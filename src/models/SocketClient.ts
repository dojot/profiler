import { SocketIoClient } from "./SocketioClient";
import { MessageProcessor } from "./MessageProcessor";

export class SocketClient {
  private _token: string;
  private _server: string;

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
      processor.processMessage(data);
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
