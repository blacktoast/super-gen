import {
  compSetFileList,
  getPrevDirList,
  makePath,
  sepFileAndDirForURI,
} from './filesAndDirectorys';
import * as vs from 'vscode';
import * as path from 'path';
import {
  getComponentTemplate,
  getStyledTemplate,
  getStoryTempOfIndex,
  getCompTsTemplate,
} from './template';
import { genFiles, getLastDirName } from './utils/files';
import { getGenFileNameObj } from './utils/utils';

export async function createComponentDirToCurrentDirTs(
  componentName: string,
  uri: vs.Uri,
  isIn = false,
  isStorybook: boolean,
  styleFileType: string,
  frameworkType: string
) {
  let destPath;

  const dirname = path.dirname(uri.fsPath);
  const prevDirPath = getPrevDirList(dirname);
  let titlePath = getLastDirName(prevDirPath);

  if (isIn) {
    titlePath = makePath(titlePath, getLastDirName(dirname));
    destPath = makePath(dirname, componentName);
  } else {
    destPath = makePath(prevDirPath, componentName);
  }

  await vs.workspace.fs.createDirectory(vs.Uri.parse(destPath));

  await genFiles(
    destPath,
    titlePath,
    isStorybook,
    styleFileType,
    frameworkType,
    componentName,
    true
  );
  // await vs.workspace.fs.writeFile(
  //   vs.Uri.parse(makePath(destPath, fileList['index'])),
  //   Buffer.from(getComponentTemplate(componentName))
  // );

  // await vs.workspace.fs.writeFile(
  //   vs.Uri.parse(makePath(destPath, fileList['story'])),
  //   Buffer.from(getStoryTempOfIndex(componentName, titlePath))
  // );

  // await vs.workspace.fs.writeFile(
  //   vs.Uri.parse(makePath(destPath, fileList['style'])),
  //   Buffer.from(getStyledTemplate())
  // );

  const focusUri = vs.Uri.parse(makePath(destPath, `${componentName}.tsx`));
  const document = await vs.workspace.openTextDocument(focusUri);
  await vs.window.showTextDocument(document);
}

export async function createCompFile(
  uri: vs.Uri,
  componentName: string,
  frameworkType: string,
  isTS = true
) {
  const dirname = path.dirname(uri.fsPath);
  const madeFileName = isTS ? `${componentName}.tsx` : `${componentName}.jsx`;
  // destPath = makePath(prevDirPath, componentName);

  // await vs.workspace.fs.createDirectory(vs.Uri.parse(destPath));
  await vs.workspace.fs.writeFile(
    vs.Uri.parse(makePath(dirname, madeFileName)),
    Buffer.from(getCompTsTemplate(componentName, false, frameworkType))
  );

  const focusUri = vs.Uri.parse(makePath(dirname, madeFileName));
  const document = await vs.workspace.openTextDocument(focusUri);
  await vs.window.showTextDocument(document);
}
