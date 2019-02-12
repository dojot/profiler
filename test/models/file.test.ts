import { File } from "../../src/models/File";
import { expect, should } from 'chai';

const chai = require("chai");
const should = chai.should();

describe("File class", () => {

  it("should instantiate without parameters", () => {
    const file = File.instance;
    should.exist(file);
    should.exist(file.path);
    should.exist(file.newPath);
  });

  it("should instantiate with parameters", () => {
    const path = "/uploads/file.txt";
    const file = File.from(path);
    should.exist(file);
    expect(file.path).to.equal(path);
    should.not.exist(file.newPath);
  });

  it("should read lines for a file", () => {
    const path = "/uploads/file.txt";
    const file = File.from(path);
  });

});