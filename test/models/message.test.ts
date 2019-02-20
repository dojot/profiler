import { Message } from "../../src/models/Message";
import { FullMessage } from "../../src/models/FullMessage";
import { MongoMessage } from "../../src/models/MongoMessage";
import { expect } from 'chai';

const chai = require("chai");
const expect = chai.expect;

describe("Message class", () => {

  it("should calculate delay", () => {
    const fullMessage = new FullMessage(1548872097132, 1548872097133, 1548872098267, 1548872098255, true, 10, 1548872098255);
    let message = MongoMessage.instance(fullMessage);
    expect(message.delay).to.equal(1123);
  });

});