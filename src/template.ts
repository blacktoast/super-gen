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
import ${name} from '.';

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
  return `import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import ${name} from '.';

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

export const getIndexTsTemplate = (name: string): string => {
  const template = `import React from 'react';
import * as S from './style';

interface Props{

}

const ${name} = ({}:Props) =>{ 
  return (
    <div></div>
  )
};

export default ${name};`;

  return template;
};

export const getStyledTemplate = (option = 'emotionStyled'): any => {
  interface OptionType {
    [key: string]: string;
  }
  const o = option;

  const template: OptionType = {
    emotionStyled: `import styled from '@emotion/styled'`,
    styled: ``,
  };

  return template[option];
};
