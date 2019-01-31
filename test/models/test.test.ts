import { Test } from "../../src/models/Test";
import { Message } from "../../src/models/Message";
import { expect } from 'chai';
import { delay } from "bluebird";

const chai = require("chai");
const expect = chai.expect;

describe("Test class", () => {

  let test: Test;
  let MessageMock: any;

  beforeAll(() => {
    MessageMock = jest.fn<Message>((value) => ({
      delay: value,
    }));
  });

  beforeEach(() => {
    test = new Test();
  });
  

  it("should calculate the avarage", () => {
    test.addMessage(new MessageMock(6));
    test.addMessage(new MessageMock(2));
    test.addMessage(new MessageMock(3));
    test.addMessage(new MessageMock(2));

    expect(test.delayAvarage).to.equal(3.25);
  });

  it("should calculate the avarage when there are not messages", () => {
    expect(() => test.delayAvarage).to.throw(TypeError);    
  });

  it("should calculate the avarage when there are messages with zero delay", () => {
    test.addMessage(new MessageMock(0));
    test.addMessage(new MessageMock(0));
    test.addMessage(new MessageMock(0));
    test.addMessage(new MessageMock(0));

    expect(test.delayAvarage).to.equal(0);
  });

  it("should calculate the standard derivation", () => {
    test.addMessage(new MessageMock(6));
    test.addMessage(new MessageMock(2));
    test.addMessage(new MessageMock(3));
    test.addMessage(new MessageMock(1));

    expect(test.standardDerivation).to.equal(1.87);
  });

  it("should calculate the standard derivation when there are messages with zero delay", () => {
    test.addMessage(new MessageMock(0));
    test.addMessage(new MessageMock(0));
    test.addMessage(new MessageMock(0));
    test.addMessage(new MessageMock(0));

    expect(test.standardDerivation).to.equal(0);
  });

  it("should calculate the standard derivation when there are not messages", () => {
    expect(() => test.standardDerivation).to.throw(TypeError); 
  });

});