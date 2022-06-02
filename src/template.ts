import * as vscode from 'vscode';
import { getRelativePathOfComponent } from './utils';
export const getStoryTemplate = (
  dirName: string,
  file: string,
  isIndexFile: boolean
) => {
  const relativePath = getRelativePathOfComponent(dirName);
  const componentName = file.split('.')[0];
  let template;

  if (isIndexFile) {
    template = `import React from 'react'
    import ${componentName} from '../${relativePath}'
    
    export default {
    title: 'Components/${componentName}',
    component: ${componentName},
    argTypes: {
        },
      };
    export const Default = (args) => {
    return <${componentName} {...args}></${componentName}>; };
      `;
  } else {
    template = `import React from 'react'
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
  }

  return template;
};
