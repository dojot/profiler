import {Message} from "../src/models/Message";
import { expect } from 'chai';

const chai = require("chai");
const expect = chai.expect;

describe("Message class", () => {
  it("should calculate delay", () => {
    let message = new Message("1548872097132;1548872097133;1548872098267;");
    expect(message.delay).to.equal(1135);
  });
});