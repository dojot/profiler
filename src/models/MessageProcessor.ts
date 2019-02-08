import { File } from "./File";
import { FileLine } from "./FileLine";

export class MessageProcessor {
  process(data: any) {
    const fileLine = FileLine.instance(data);
    File.instance.appendLine(fileLine);
  }
}
