import { FullMessage } from "../../src/models/FullMessage";
import { MongoMessage } from "../../src/models/MongoMessage";
import { expect } from 'chai';

const chai = require("chai");
const expect = chai.expect;

describe("MongoMessage class", () => {
  let MessageMock: any;

  beforeAll(() => {
    MessageMock = jest.fn<FullMessage>((deviceTime, mongoTime) => ({
      deviceTime: deviceTime,
      mongoTime: mongoTime
    }));
  });

  it("should calculate delay", () => {
    const message = MongoMessage.instance(new MessageMock(20, 30));
    expect(message.delay).to.equal(10);
  });

});