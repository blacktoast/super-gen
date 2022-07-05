import * as vscode from 'vscode';
import * as path from 'path';

export const getLastDirName = (dir: string): string => {
  const dirNames = dir.split(path.sep);
  return dirNames[dirNames.length - 1];
};
