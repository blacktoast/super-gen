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

## Create component of directory 명령어

폴더로 컴포넌트를 만드는 멍령어 입니다.

#### (dir) create component dir into parent folder of the current folder(w index.jsx, index.stories.jsx, style.jsx) 명령어

현재 에디터에 얼려있는 파일의 폴더가 있는 디렉토리에 컴포넌트 명으로 폴더를 생성합니다
컴포넌트명으로 폴더를 생성후 그 아래 index.jsx, index.stories.jsx, styled.jsx 파일을 생성

ex>
```
-feats 
  - User
    - index.js
```

index.js이 열려있는 상태에서 명령어를 사용시 feats 폴더 아래에 원하는 제목의 폴더를 생성합니다

#### (dir) create component dir into parent folder of the current folder (w/o story file)

위의 기존 `create component dir into parent folder of the current folder` 명령어와 같지만
story파일 없이 index.jsx, style.jsx 로만 구성 폴더를 생성합니다

#### (dir) create component dir in this folder (w index.jsx, index.stories.jsx, style.jsx) 명령어

![CreateComponent](https://user-images.githubusercontent.com/10705018/172584718-56a618bc-f4c9-46ef-a149-d94fb09b1950.gif)

현재 에디터에 얼려있는 파일의 폴더아래에 컴포넌트 명으로 폴더를 생성합니다.
컴포넌트명으로 폴더를 생성후 그 아래 index.jsx, index.stories.jsx, styled.jsx 파일을 생성

ex>
```
-feats 
  - User
    - index.js
```

index.js이 열려있는 상태에서 명령어를 사용시 User 폴더 아래에 원하는 이름의 폴더를 생성합니다

## Extension Settings

`rootFolder` 상대 경로를 추적하기 위해서 루트 폴더명을 설정할 수 있습니다
해당 폴더 바로아래에 stories 폴더가 존재해야 합니다

`styleFileOption` 해당 옵션은 컴포넌트 폴더를 만들떄
생성 되는 스타일 파일을 어떤 css 기반으로 만들지 설정하는 옵셥입니다
css in js 인 이모션, styledComponent와
css module, css 로 설정이 가능합니다

아래 `options` 에 자세 설명이 되어있습니다
fileName 은 생성되는 파일 이름
fileContent 는 생성되는 파일의 내용입니다

options :
styledEmotion

- fileName: style.jsx | style.tsx
- file content:
  import styled from '@emotion/styled'

styled

- fileName: style.jsx | style.tsx
- file content:
  import styled from 'styled-components'

cssModule

- fileName: style.module.css
- file content:
  none

css

- fileName: style.css
- file content:
  none

## Release Notes

### 0.0.1

초기 개발 구현

### 1.0.0

### 1.0.2

- storybook파일 import 경로 문제 수정

### 1.1.0

- 컴포넌트를 폴더로 생성하는 명령어 추가
  - create component directory to current folder
  - create component directory in this

### 1.1.1

changed the extension name story gen -> supergen
changed the commands, please review the read me file

bug fix/

## LoadMap

- [x] js 파일경우 propType에 따라 인자값 할당하기
- [] ts 지원예정
