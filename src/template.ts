export const getStoryTemplate = (dirName: string, fileName: string) => {
  const tmp = `
  import React from 'react'
  import ${fileName} from '../components/${fileName}'

  export default {
  title: '${dirName}/${fileName}',
  component: ${fileName},
  argTypes: {
    },
  };
  export const Default = (args) => {
  return <${fileName} {...args}></${fileName}>; };
  `;

  return tmp;
};
