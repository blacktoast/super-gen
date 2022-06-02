import * as vscode from 'vscode';
import * as path from 'path';

export const findRootDir = (): any => {
  const root = vscode.workspace
    .getConfiguration('StoryBookGen')
    .get('rootFolder');

  return root;
};

export const getRelativePathOfComponent = (dirName: string) => {
  const dirNames = dirName.split(path.sep);
  const index = dirNames.indexOf(findRootDir());
  const test = dirNames.slice(index).join(path.sep);
  console.log(path.relative(findRootDir(), test));
};

// root폴더 기준으로 폴더 정리하기
