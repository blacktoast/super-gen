import * as vscode from 'vscode';
import { getRelativePathOfComponent } from './utils';
export const getStoryTemplate = (
  dirName: string,
  file: string,
  propTypes: Map<string, string> | null = null,
  isIndexFile = false
) => {
  const relativePath = getRelativePathOfComponent(dirName);
  console.log(relativePath);
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

export const getStoryTempOfIndex = (name: string) => {
  return `import React from 'react';
import ${name} from '.';

export default {
  title: 'Component/${name}',
  component: ${name},
  argTypes: {},
};

export function Default(args) {
  return <index {...args} />;
}

  `;
};

export const getComponentTemplate = (name: string): string => {
  const template = `import React from 'react';
import * as S from './style';
import PropTypes from 'prop-types';

const ${name} = () =>{ 
  return (
    <div></div>
  )
};

${name}.propTypes = {};

export default ${name};
  `;

  return template;
};

export const getStyledTemplate = () => {
  const template = `import styled from '@emotion/styled';
`;

  return template;
};
