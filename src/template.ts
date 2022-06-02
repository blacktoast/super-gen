import * as vscode from 'vscode';
import { getRelativePathOfComponent } from './utils';
export const getStoryTemplate = (dirName: string, file: string) => {
  const relativePath = getRelativePathOfComponent(dirName);
  const componentName = file.split('.')[0];

  const tmp = `import React from 'react'
import ${componentName} from '../${relativePath}/${componentName}'

  export default {
  title: 'Components/${componentName}',
  component: ${componentName},
  argTypes: {
    },
  };
  export const Default = (args) => {
  return <${componentName} {...args}></${componentName}>; };
  `;

  console.log(tmp);

  return tmp;
};
