import React from 'react';
//import PropTypes from "prop-types";

class App extends React.Component{
    state = {
        count: 0
    }
    add = () => {
        this.setState(current => ({count: current.count + 1}));
    }
    minus = () => {
        this.setState({count: this.state.count - 1});
    }
    componentDidMount(){
        console.log("Component rendered");
    }
    componentDidUpdate(){
        console.log("I just updated");
    }
    componentWillUnmount(){
        console.log("Goodbye, world")
    }
    render(){
        console.log("I'm rendering");
        return (
            <div>
                <h1>The number is {this.state.count}</h1>
                <button onClick={this.add}>Add</button>
                <button onClick={this.minus}>Minus</button>
            </div>
        );
    }
}

export default App;

/* #3.0
보다시피 class component와 function component는 차이가 존재해.
function 은 무언가를 return 해, 그리고 screen에 표시돼.
class 는 class야, 하지만 react component 로부터 확장되고, screen에 표시돼.
너는 그걸 render method 안에 넣어야만 해!
react는 자동적으로 모든 class component의 render method를 실행하고자해.
자동으로!

function 이 쉬웠는데 class 를 사용하는 것은
class component가 가진 state 라 불리는 녀석을 원해서야.
state는 object이고 component의 data를 넣을 공간이 있고, 이 데이터는 변해.
*/

/* #3.1
state의 상태를 변경할 때 너는 react가 render function을 호출해서
바꿔주길 원해. 예를 들어 state.count = 20이라고 하면 다시 호출되길 바래, 20으로.
이걸 어떻게 할 수 있을까?

그 방법이 setState function 을 호출하는거야. 이것을 호출하면,
react는 매우 똑똑해서 우리가 언제 setState를 호출할 지를 알고 또한 
내가 view를 refresh 하기를 원하는 걸 알고 render function을 refresh 하길 원하는 걸 알아.
setState는 새로운 State를 취해야해, 새로운 state를 주는거야.
아까도 말했지만 state는 객체이고 새로운 객체를 받는거지.

*/


/* #3.2
이전까지 react component 에서 사용한 유일한 function은 render function이야.
그런데 react class component 는 단순히 render 말고 더 많은 걸 가지고 있어.
이들은 life cycle method 를 가지는데, 이건 기본적으로 react가 component를 생성하고 없애는 방법이야.
 component가 생성될때, render 전과 후에 호출되는 몇가지 function 이 있어.
 그 전부를 보지는 않을 꺼야. 가장 필요한 것만, 사용하는 것만 알려줄게.

 mounting 컴포넌트 생성
    constructor() -> render() -> componentDidMount()
 updating 컴포넌트 갱신
    getDerivedStateFromProps() -> render() -> componentDidUpdate()
 unmounting 컴포넌트 죽음(다른 페이지로 갈때 같은?)
    componentWillUnmount()
*/