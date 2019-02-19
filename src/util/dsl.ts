import { TestBuilder } from "../models/TestBuilder";
import { MessageProcessor } from "../models/MessageProcessor";
import { DojotClient } from "../models/DojotClient";
import { SocketClient } from "../models/SocketClient";
import { BeamerClient } from "../models/BeamerClient";

export const test = () => {
  return new TestBuilder();
};

export const messageProcessor = () => {
  return new MessageProcessor();
};

export const dojotClient = () => {
  return new DojotClient();
};

export const socketClient = () => {
  return new SocketClient();
};

export const beamerClient = () => {
  return new BeamerClient();
};
