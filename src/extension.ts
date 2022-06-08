// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import { createComponentDirToCurrentDir, createStory } from './main';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed

export function activate(context: vscode.ExtensionContext) {
  // Use the console to output diagnostic information (console.log) and errors (console.error)
  // This line of code will only be executed once when your extension is activated

  // The command has been defined in the package.json file
  // Now provide the implementation of the command with registerCommand
  // The commandId parameter must match the command field in package.json

  let disposable = vscode.commands.registerCommand(
    'storybook-gen.createStoryBook',
    () => {
      // The code you place here will be executed every time your command is executed
      // Display a message box to the user
      const componentUri = vscode.window.activeTextEditor?.document.uri;
      vscode.window.showInformationMessage(`create storyBooddrk file`);
      if (componentUri) {
        createStory(componentUri);
      }
    }
  );
  let test: any = null;

  const createStorybookToMain1 = vscode.commands.registerCommand(
    'storybook-gen.createStoryBookToMain1',
    async () => {
      const componentUri = vscode.window.activeTextEditor?.document.uri;

      const folder = await vscode.window.showInputBox({
        title: '저장할 컴포넌트 이름을 입력해주세요',
        value: '',
      });
      if (componentUri) {
        createComponentDirToCurrentDir(folder, componentUri);
      } else {
        console.log('현재 열려있는 파일이 없습니다');
      }
    }
  );
  const commands = [disposable, createStorybookToMain1];
  context.subscriptions.push(...commands);
}

// this method is called when your extension is deactivated
export function deactivate() {}
