import {Message} from "../../src/models/Message";
import { expect } from 'chai';

const chai = require("chai");
const expect = chai.expect;

describe("Message class", () => {

  it("should instantiate when data is empty", () => {
    expect(() => Message.instance("")).to.throw(TypeError);
  });

  it("should instantiate when data is invalid", () => {
    expect(() => Message.instance("xxx")).to.throw(TypeError);
  });

  it("should calculate delay", () => {
    let message = Message.instance("1548872097132;1548872097133;1548872098267;1");
    expect(message.delay).to.equal(1135);
  });

});