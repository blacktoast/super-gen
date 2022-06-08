import * as vs from 'vscode';
import * as path from 'path';
import * as fs from 'fs';

export const getPrevDirList = (dir: string) => {
  const dirName = dir.split(path.sep);
  console.log(dirName);
  return path.join(dirName.slice(0, dirName.length - 1).join(path.sep));
};

export const makePath = (dir: string, file: string) => {
  return path.join(dir, file);
};
