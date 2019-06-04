import { ResultFile } from "../models/ResultFile";
import { FullTest } from "../models/FullTest";

export const format = (tests: FullTest[]) => {
  const data = tests.map(t => {
    const result = new ResultFile(t);
    return {
      name: result.name,
      formattedName: result.formattedName
    };
  });
  return data;
};
