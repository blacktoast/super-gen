import * as vs from "vscode";
import * as path from "path";
import * as fs from "fs";

export const compSetFileList = {
  index: "index.jsx",
  story: "index.stories.jsx",
  style: "style.jsx",
};

export const getPrevDirList = (dir: string) => {
  const dirName = dir.split(path.sep);
  console.log(dirName);
  return path.join(dirName.slice(0, dirName.length - 1).join(path.sep));
};

export const makePath = (dir: string, file: string) => {
  return path.join(dir, file);
};

export const sepFileAndDirForURI = (uri: vs.Uri) => {
  const dirname = path.dirname(uri.fsPath);
  const fileName = path.basename(uri.fsPath);
  return [dirname, fileName];
};
