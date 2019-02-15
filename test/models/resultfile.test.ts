import { ResultFile } from "../../src/models/ResultFile";
import { expect } from 'chai';

describe("Test class", () => {

  let file: ResultFile;
  let MessageMock: any;

  beforeEach(() => {
    file = new ResultFile('1_1_2019_9_25_5.csv');
  });
  
  it("should format the name", () => {
    let formated = file.formattedName;
    expect(formated).to.equal('01/01/2019 09:25:05');
  });

});