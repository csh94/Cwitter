import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
//import Potato from "./Potato";

ReactDOM.render(
    <App />, document.getElementById('potato')
);
/* #2.0
<App /> 은 Component, HTML를 반환하는 함수.
react는 component를 사용해서 HTML처럼 작성하려는 경우 필요
이러한 javascript와 HTML 사이의 조합을 jsx라 부름.
jsx는 오직 react에서만 사용하는 것임.딴데서 사용 x
즉 jsx는 javascript안의 HTML이야. Component를 만들고 어떻게 사용하는지에 대한 것

그리고 기억해야할 것은 react application은 
한번에 하나의 component만 rendering 할수 있다는 것.
그래서 Potato를 여기서 import 하는 것이 아닌 App안에서 하는것.
여러 컴포넌트를 App내부에 쓰는거야 잊지마!
*/
