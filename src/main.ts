import { getStoryTemplate } from './template';
import { findRootDir } from './utils';
import * as vs from 'vscode';
import * as path from 'path';
import * as fs from 'fs';

const removeFileName = (file: string): string => {
  return file.split('.')[0];
};

const isFileNameIndex = (name: string): boolean => {
  if (removeFileName(name) === 'index') {
    return true;
  }
};

const getStoryDirPath = (dir: string): string => {
  const dirNames = dir.split(path.sep);
  const storyPath = dirNames
    .slice(0, dirNames.indexOf(findRootDir()) + 1)
    .join(path.sep);
  return `${storyPath}${path.sep}stories`;
};

const getLastDirName = (dir: string): string => {
  const dirNames = dir.split(path.sep);
  return dirNames[dirNames.length - 1];
};

const createStoryFile = (filePath: string, code: string) => {
  fs.writeFileSync(filePath, code);
  console.log('Create ');
};

export async function createStory(uri: vs.Uri) {
  console.log(`URi : ${uri}`);
  const dirname = path.dirname(uri.fsPath);
  const fileName = path.basename(uri.fsPath);
  const storybookDirPath = getStoryDirPath(dirname);
  const propTypes = new Map();
  let storybookFileCode = '';
  let baseName: string;

  if (isFileNameIndex(fileName)) {
    baseName = getLastDirName(dirname);
  } else {
    baseName = fileName;
  }

  const regex = new RegExp(
    `(${removeFileName(baseName)}.propTypes)\\s{0,}=\\s{0,}{.*}`
  );

  const storyName = `${removeFileName(baseName)}.stories.jsx`;

  const data = fs.readFileSync(`${dirname}${path.sep}${fileName}`, 'utf-8');

  try {
    const rowString = data.split('\n').join('');
    console.log(regex);
    if (rowString.match(regex)) {
      const tmpProps = rowString.match(regex)[0];
      const types = ['string', 'number', 'bool'];
      const props = tmpProps
        .split('{')[1]
        .split(',')
        .map((e) => e.trim())
        .filter((e) => e !== '}');

      props
        .map((prop) => prop.split(':'))
        .map((item) => {
          const [prop, type] = [item[0], item[1].trim().split('.')[1]];
          console.log(prop, type);
          if (type !== 'node') {
            propTypes.set(prop, type);
          }
        });
    }
  } catch (error) {
    console.log(error);
  } finally {
    storybookFileCode = getStoryTemplate(dirname, baseName, propTypes);
  }

  createStoryFile(
    `${storybookDirPath}${path.sep}${storyName}`,
    storybookFileCode
  );

  const focusUri = vs.Uri.parse(path.join(storybookDirPath, storyName));
  const document = await vs.workspace.openTextDocument(focusUri);
  await vs.window.showTextDocument(document);
}
