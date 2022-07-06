import * as vscode from 'vscode';
import * as path from 'path';
import { makePath } from '../filesAndDirectorys';

import {
  getComponentTemplate,
  getStyledTemplate,
  getStoryTempOfIndex,
  getStoryTempOfIndexTs,
  getCompTsTemplate,
  getIndexTemplate,
} from '../template';
import { getGenFileNameObj } from './utils';

export const getLastDirName = (dir: string): string => {
  const dirNames = dir.split(path.sep);
  return dirNames[dirNames.length - 1];
};

//story타입에 따라서 스토리북 파일을 만들던가 안만듬
// style타입에 따라서 스타일 파일 네임 변경 또는 안만듬
//index파일을 어떻게? 흠
//

export const genFiles = async (
  destPath: string,
  storybookFilePath: string,
  isStorybookFile: boolean,
  styleFileType: string,
  frameworkType: string,
  componentName: string,
  isTs = true
) => {
  const fileList = getGenFileNameObj(styleFileType, componentName, true);

  const isStyleFile = styleFileType.trim() !== '' ? true : false;
  console.log(isStyleFile);
  if (isTs) {
    await vscode.workspace.fs.writeFile(
      vscode.Uri.parse(makePath(destPath, fileList['comp'])),
      Buffer.from(getCompTsTemplate(componentName, isStyleFile))
    );
  } else {
    await vscode.workspace.fs.writeFile(
      vscode.Uri.parse(makePath(destPath, fileList['comp'])),
      Buffer.from(getComponentTemplate(componentName, isStyleFile))
    );
  }

  await vscode.workspace.fs.writeFile(
    vscode.Uri.parse(makePath(destPath, fileList['index'])),
    Buffer.from(getIndexTemplate(componentName))
  );

  if (isStorybookFile) {
    await vscode.workspace.fs.writeFile(
      vscode.Uri.parse(makePath(destPath, fileList['story'])),
      Buffer.from(getStoryTempOfIndexTs(componentName, storybookFilePath))
    );
  }

  if (styleFileType.trim() !== '') {
    console.log('object');
    await vscode.workspace.fs.writeFile(
      vscode.Uri.parse(makePath(destPath, fileList['style'])),
      Buffer.from(getStyledTemplate(styleFileType))
    );
  }
};
