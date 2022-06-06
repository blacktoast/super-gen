import * as vscode from 'vscode';
import { getRelativePathOfComponent } from './utils';
export const getStoryTemplate = (
  dirName: string,
  file: string,
  propTypes: Map<string, string> | null = null,
  isIndexFile = false
) => {
  const relativePath = getRelativePathOfComponent(dirName);
  const componentName = file.split('.')[0];
  let propTypeTemplate = ``;
  let template;
  if (propTypes) {
    for (let [prop, type] of propTypes.entries()) {
      if (type === 'bool') {
        type = 'boolean';
      }

      propTypeTemplate += `    ${prop}: { control: "${type}" },\n`;
    }
  }
  if (isIndexFile) {
    template = `import React from 'react';
  import ${componentName} from '../${relativePath}';
  
  export default {
    title: 'Components/${componentName}',
    component: ${componentName},
    argTypes: {
  ${propTypeTemplate}
    },
  };
  
  export const Default = (args) => {
    return <${componentName} {...args}></${componentName}>; 
  };
    `;
  } else {
    template = `import React from 'react';
import ${componentName} from '../${relativePath}/${componentName}';

export default {
  title: 'Components/${componentName}',
  component: ${componentName},
  argTypes: {
${propTypeTemplate}
  },
};

export const Default = (args) => {
  return <${componentName} {...args}></${componentName}>; 
};
  `;
  }
  return template;
};
