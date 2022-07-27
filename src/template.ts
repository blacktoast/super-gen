import * as vscode from 'vscode';
import { getRelativePathOfComponent } from './utils/utils';
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

export const getStoryTempOfIndex = (name: string, titlePath: string) => {
  return `import React from 'react';
import {${name}} from '.';

export default {
  title: '${titlePath}/${name}',
  component: ${name},
  argTypes: {},
};

export function Default(args) {
  return <${name} {...args} />;
}

 `;
};

export const getStoryTempOfIndexTs = (name: string, titlePath: string) => {
  return `import { ComponentStory, ComponentMeta } from '@storybook/react';
import {${name}} from '.';

export default {
  title: '${titlePath}/${name}',
  component: ${name},
} as ComponentMeta<typeof ${name}>;

const Template: ComponentStory<typeof ${name}> = (args) => (
  <${name} {...args} />
);

export const Default = Template.bind({});
Default.args = { };
 `;
};

export const getComponentTemplate = (name: string, isStyle = true): string => {
  const template = `import React from 'react';
${isStyle ? "import * as S from './style';" : ''}

import PropTypes from 'prop-types';

export const ${name} = () =>{ 
  return (
    <div></div>
  )
};

${name}.propTypes = {};

`;

  return template;
};

export const getCompTsTemplate = (
  name: string,
  isStyle = true,
  type = 'react'
): string => {
  interface Type {
    [key: string]: string;
  }

  const template: Type = {
    react: `${isStyle ? "import * as S from './style';" : ''}
    
interface ${name}Props{}
    
export const ${name} = ({} : ${name}Props) =>{ 
  return (
    <div></div>
  )
};
`,

    preact: `/** @jsx h */
import { h } from 'preact';
${isStyle ? "import * as S from './style';" : ''}
    
interface ${name}Props {}
    
export const ${name} = ({} : ${name}Props) =>{ 
    return (
      <div></div>
    )
  };
`,

    fresh: `/** @jsx h */
import { h } from 'preact';
import { tw } from '@twind';

interface ${name}Props {}
    
export const ${name} = ({} : ${name}Props) =>{ 
 return (
    <div></div>
  ) 
};
    `,
  };

  return template[type];
};

export const getIndexTemplate = (compName: string) => {
  return `export { ${compName} } from './${compName}';`;
};

export const getStyledTemplate = (option = 'styledEmotion'): any => {
  interface OptionType {
    [key: string]: string;
  }
  const o = option;

  const template: OptionType = {
    styledEmotion: `import styled from '@emotion/styled';
    `,
    styled: `import styled from 'styled-components';
    `,
    css: ``,
    cssModule: ``,
  };

  return template[option];
};
