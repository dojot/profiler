import { MessageProcessor } from "../../src/models/MessageProcessor";
import { MongoMessageDAO } from "../../src/daos/MongoMessageDAO";
import { expect } from "chai";

let processor: MessageProcessor;
let mongoDAO: MongoMessageDAO;

describe("MessageProcessor class", () => {
  beforeEach(() => {
    // processor = MessageProcessor.instance(mongoDAO);
  });

  it("should process message", () => {
    processor.process("data", "admin", "ef859");

    // expect(() => Message.instance("")).to.throw(TypeError);
  });
});
