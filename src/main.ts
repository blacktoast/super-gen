import { findRootDir, getRelativePathOfComponent } from './utils';
import * as vs from 'vscode';
import * as path from 'path';
import * as fs from 'fs';

const removeFileName = (file: string) => {
  return file.split('.')[0];
};

const isFileNameIndex = (name: string) => {
  if (removeFileName(name) === 'index') {
    return true;
  }
};

const getStoryDirPath = (dir: string) => {
  const dirNames = dir.split(path.sep);
  const storyPath = dirNames
    .slice(0, dirNames.indexOf(findRootDir()) + 1)
    .join('/');
  return `${storyPath}${path.sep}stories`;
};

const getLastDirName = (dir: string) => {
  const dirNames = dir.split(path.sep);
  return dirNames[dirNames.length - 1];
};

export async function createStory(uri: vs.Uri) {
  console.log(`URi : ${uri}`);
  const dirname = path.dirname(uri.fsPath);
  const baseName = path.basename(uri.fsPath);
  const storybookDirPath = getStoryDirPath(dirname);
  let storyName;

  if (isFileNameIndex(baseName)) {
    storyName = `${getLastDirName(dirname)}.stories.jsx`;
  } else {
    storyName = `${removeFileName(baseName)}.stories.jsx`;
  }

  getRelativePathOfComponent(dirname);
  fs.writeFile(
    `${storybookDirPath}${path.sep}${storyName}`,
    'test',
    function (err) {
      if (err === null) {
        console.log('success');
      } else {
        console.log('fail');
      }
    }
  );

  const testUri = vs.Uri.parse(path.join(storybookDirPath, storyName));
  const document = await vs.workspace.openTextDocument(testUri);
  await vs.window.showTextDocument(document);
  console.log(document);
}
