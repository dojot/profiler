import { SocketIoClient } from "./SocketioClient";
import { MessageProcessor } from "./MessageProcessor";
import { FullTest } from "./FullTest";

export class SocketClient {
  private _token: string;
  private _test: FullTest;
  private _client: SocketIoClient;

  forTest(test: FullTest) {
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

  private get tenant(): string {
    return this._test.tenant;
  }

  private get device(): string {
    return this._test.device;
  }

  createClient() {
    this._client = new SocketIoClient(
      `http://${this.server}:8000`,
      1000,
      this._token.trim()
    );
    return this;
  }

  andProcesstWith(processor: MessageProcessor, resolve: Resolve) {
    this._client.onMessage((data: any) => {
      console.log(`Executing on message with data ${data}`);
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