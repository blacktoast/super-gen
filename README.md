# storybook-gen README

## 사용방법

스토리북 파일을 만들고 싶은 컴포넌트 파일에서
맥은 `cmd + shift + p`

윈도우는 `ctrl + shift + p` 키로 명령 팔레트를 킨뒤

### `Create storybook` 명령어를 실행 시키면 됩니다

그러면 `/src/stories` 폴더 아래에 해당컴포넌트 파일 이름으로 스토리북 파일이 생성됩니다
만약 파일제목이 index.js 일때 `/Text/index.js` 같은 경우라면
해당 폴더의 이름 `Text` 으로 스토리북파일이 생성됩니다
![stt](https://user-images.githubusercontent.com/10705018/171661796-c6cca8f1-03a3-4600-993d-c74aa9bfc1b4.gif)

### args 연동

```
import React from 'react';
import PropTypes from 'prop-types';

const Test = ({ children, text, num }) => {
  return <div></div>;
};

Test.propTypes = {
  children: PropTypes.node,
  text: PropTypes.string,
  num: PropTypes.number,
  test: PropTypes.bool,
  tt: PropTypes.oneOfType(),
};
export default Test;
```

스토리북을 만들고자 하는 컴포넌트에서 propTypes를 지정해준 경우 해당하는 타입으로
자동으로 스토리북 args 들어갑니다

```
import React from 'react';
import Test from '../Components/Test';

export default {
  title: 'Components/Test',
  component: Test,
  argTypes: {
    text: { control: string },
    num: { control: number },
    test: { control: bool },
    tt: { control: oneOfType() },
  },
};

export const Default = (args) => {
  return <Test {...args}></Test>;
};
```

## 주의사항

기본적으로 rootFolder는 src 이름으로 되어있고
src 폴더 아래에 stories 폴더가 있다는 가정하에 개발이 되었습니다.
참고해 주세요

## Extension Settings

`rootFolder` 상대 경로를 추적하기 위해서 루트 폴더명을 설정할 수 있습니다
해당 폴더 바로아래에 stories 폴더가 존재해야 합니다

## Release Notes

### 0.0.1

초기 개발 구현

### 1.0.0

## LoadMap

- [x] js 파일경우 propType에 따라 인자값 할당하기
- [] ts 지원예정
