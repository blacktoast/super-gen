import {
  compSetFileList,
  getPrevDirList,
  makePath,
  sepFileAndDirForURI,
} from "./filesAndDirectorys";
import * as vs from "vscode";
import * as path from "path";
import { getComponentTemplate, getStyledTemplate } from "./template";

export async function createCompDirToParentWoStory(
  uri: vs.Uri,
  componentName: string,
  isIn = false
) {
  const [fileName, dirName] = sepFileAndDirForURI(uri);
  let destPath;
  const dirname = path.dirname(uri.fsPath);
  const prevDirPath = getPrevDirList(dirname);

  if (isIn) {
    destPath = makePath(dirname, componentName);
  } else {
    destPath = makePath(prevDirPath, componentName);
  }

  await vs.workspace.fs.createDirectory(vs.Uri.parse(destPath));
  await vs.workspace.fs.writeFile(
    vs.Uri.parse(makePath(destPath, compSetFileList["index"])),
    Buffer.from(getComponentTemplate(componentName))
  );

  await vs.workspace.fs.writeFile(
    vs.Uri.parse(makePath(destPath, compSetFileList["style"])),
    Buffer.from(getStyledTemplate())
  );

  const focusUri = vs.Uri.parse(makePath(destPath, compSetFileList["index"]));
  const document = await vs.workspace.openTextDocument(focusUri);
  await vs.window.showTextDocument(document);
}
