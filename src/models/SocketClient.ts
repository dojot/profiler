import { SocketIoClient } from "./SocketioClient";
import { MessageProcessor } from "./MessageProcessor";
import { FullTest } from "./FullTest";

export class SocketClient {
  private _token: string;
  private _test: FullTest;
  private _client: SocketIoClient;

  forTest(test: FullTest){
    this._test = test;
    return this;
  }

  usingToken(token: string) {
    this._token = token;
    return this;
  }

  private get server(): string {
    return this._test.host;
  }

  public createClient() {
    this._client = new SocketIoClient(
      `http://${this.server}:8000`,
      1000,
      this._token.trim()
    );
    return this;
  }

  public processMessageWith(processor: MessageProcessor, resolve: Resolve) {
    this._client.onMessage((data: any) => {
      processor.process(data, resolve);
    });
    this._client.start();
    return this;
  }

  close() {
    this._client.close();
    return this;
  }
}

interface Resolve {
  (): void;
}