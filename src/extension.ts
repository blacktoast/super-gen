// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import {
  createCompDirToParentWoStory,
  createComponentDirToCurrentDirTs,
} from './commands';
import { createComponentDirToCurrentDir, createStory } from './main';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed

export function activate(context: vscode.ExtensionContext) {
  // Use the console to output diagnostic information (console.log) and errors (console.error)
  // This line of code will only be executed once when your extension is activated
  // The command has been defined in the package.json file
  // Now provide the implementation of the command with registerCommand
  // The commandId parameter must match the command field in package.json
  const isStorybookFile: boolean =
    vscode.workspace.getConfiguration('StoryBookGen').get('storybookFile') ===
    'true'
      ? true
      : false;

  const typeStyleFile: string = vscode.workspace
    .getConfiguration('StoryBookGen')
    .get('styleFileOption');

  const frameWorkType: string = vscode.workspace
    .getConfiguration('StoryBookGen')
    .get('frameworkType');

  let disposable = vscode.commands.registerCommand(
    'storybook-gen.createStoryBook',
    () => {
      // The code you place here will be executed every time your command is executed
      // Display a message box to the user
      const componentUri = vscode.window.activeTextEditor?.document.uri;
      vscode.window.showInformationMessage(`create storyBook file`);
      if (componentUri) {
        createStory(componentUri);
      }
    }
  );

  const createComponentDirToCurrentTs = vscode.commands.registerCommand(
    'storybook-gen.createComponentDirToCurrentTs',
    async () => {
      const componentUri = vscode.window.activeTextEditor?.document.uri;
      console.log(componentUri);
      const folder = await vscode.window.showInputBox({
        title: '저장할 컴포넌트 이름을 입력해주세요',
        value: '',
      });

      if (componentUri) {
        createComponentDirToCurrentDirTs(
          folder,
          componentUri,
          false,
          isStorybookFile,
          typeStyleFile,
          frameWorkType
        );
      } else {
        vscode.window.showInformationMessage(
          '현재 열려있는 파일이 없습니다, 열려있는 파일이 있는 디렉토리를 기준으로 생성합니다 '
        );
      }
    }
  );

  const createComponentDirToCurrent = vscode.commands.registerCommand(
    'storybook-gen.createComponentDirToCurrent',
    async () => {
      const componentUri = vscode.window.activeTextEditor?.document.uri;
      const folder = await vscode.window.showInputBox({
        title: '저장할 컴포넌트 이름을 입력해주세요',
        value: '',
      });
      if (componentUri) {
        createComponentDirToCurrentDir(folder, componentUri);
      } else {
        vscode.window.showInformationMessage(
          '현재 열려있는 파일이 없습니다, 열려있는 파일이 있는 디렉토리를 기준으로 생성합니다 '
        );
      }
    }
  );

  const createComponentDirInThis = vscode.commands.registerCommand(
    'storybook-gen.createComponentDirIn',
    async () => {
      const componentUri = vscode.window.activeTextEditor?.document.uri;
      const folder = await vscode.window.showInputBox({
        title: '저장할 컴포넌트 이름을 입력해주세요',
        value: '',
      });

      if (componentUri) {
        createComponentDirToCurrentDir(folder, componentUri, true);
      } else {
        vscode.window.showInformationMessage(
          '현재 열려있는 파일이 없습니다, 열려있는 파일이 있는 디렉토리를 기준으로 생성합니다 '
        );
      }
    }
  );

  const createComponentDirInParentWoStory = vscode.commands.registerCommand(
    'storybook-gen.createComponentDirInWoStory',
    async () => {
      const componentUri = vscode.window.activeTextEditor?.document.uri;
      const folder = await vscode.window.showInputBox({
        title: '저장할 컴포넌트 이름을 입력해주세요',
        value: '',
      });

      if (componentUri) {
        createComponentDirToCurrentDir(folder, componentUri);
      } else {
        vscode.window.showInformationMessage(
          '현재 열려있는 파일이 없습니다, 열려있는 파일이 있는 디렉토리를 기준으로 생성합니다 '
        );
      }
    }
  );

  const commands = [
    disposable,
    createComponentDirToCurrent,
    createComponentDirToCurrentTs,
    createComponentDirInThis,
    createComponentDirInParentWoStory,
  ];

  context.subscriptions.push(...commands);
}

// this method is called when your extension is deactivated
export function deactivate() {}
