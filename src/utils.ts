import * as vscode from 'vscode';
import * as path from 'path';

export const findRootDir = (): any => {
  const root =
    vscode.workspace.getConfiguration('StoryBookGen').get('rootFolder') || '';

  return root;
};

export const getRelativePathOfComponent = (
  dirName: string,
  target = 'root'
) => {
  try {
    const rootDir = findRootDir();
    if (rootDir.length < 1) {
      throw new Error('익스텐션 환경설정을 확인해주세요 RootDir가 없습니다');
    }

    const dirNames = dirName.split(path.sep);
    const index = dirNames.indexOf(findRootDir());
    const test = dirNames.slice(index).join(path.sep);
    console.log(path.relative(findRootDir(), test));
    return path.relative(findRootDir(), test);
  } catch (e) {
    console.log(e);
  }
};

// root폴더 기준으로 폴더 정리하기
