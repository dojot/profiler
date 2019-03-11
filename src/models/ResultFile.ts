import * as _ from "lodash";
import { FullTest } from "./FullTest";
class ResultFile {
  
  private _test: FullTest;

  public constructor(test: FullTest) {
    this._test = test;
  }

  public get name(): string {
    return this._test.name.trim();
  }

  public get formattedName(): string {
    const data = this.name
      .split(".")[0]
      .split("_")
      .map(n => this.formatNumber(_.toInteger(n)));
    return `${data[0]}/${data[1]}/${data[2]} ${data[3]}:${data[4]}:${data[5]}`;
  }

  private formatNumber(number: number): string {
    if (number < 10) {
      return `0${number}`;
    } else {
      return `${number}`;
    }
  }
}

export { ResultFile };
