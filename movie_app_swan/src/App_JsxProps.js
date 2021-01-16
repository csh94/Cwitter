import React from 'react';
import PropTypes from "prop-types";

//{~~~} 는 객체 내의 요소의 표기
function Food({name, picture, rating}){
  return (
    <div>
      <h1>I like {name}</h1>
      <h4>{rating}/5.0</h4>
      <img src={picture} alt={name} />
    </div>
  );
}

Food.propTypes = {
  name: PropTypes.string.isRequired,
  picture: PropTypes.string.isRequired,
  //rating: PropTypes.string.isRequired
  rating: PropTypes.number
};
/* #2.1
jsx는 단지 HTML + JavaScript
그래서 우리 component는 대문자로 시작해야하고, 
우리의 component로 정보를 보낼 수 있어.
father[App] 이 어떻게 Children[food] 에게 prop-name을
사용해서 data를 보낼까? 
prop-name 별칭 props 는 뭐든지 component에 넣게되는 것들.
이 props가 argument로 가, Food의 첫번째 argument.
function Food(props){return return <h1>{props.fav</h1>}
이걸 좀 나이스하게 바꾼게 {fav} 인거야.
*/

const foodIList = [
  {
    id: 1,
    name: "kimchi",
    image: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.tY7yWP7-KjRrTilhGr6ZggHaE9%26pid%3DApi&f=1",
    rating: 5
  },
  {
    id: 2, 
    name: "ramen",
    image: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse3.mm.bing.net%2Fth%3Fid%3DOIP.sstrotND3jqpBbb0FuiGogHaE8%26pid%3DApi&f=1",
    rating: 4.9
  },
  {
    id: 3, 
    name: "rice",
    image: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse2.mm.bing.net%2Fth%3Fid%3DOIP.uWD1c-Q43lUZNUWNOv4RPgHaE1%26pid%3DApi&f=1",
    rating: 4.8
  }
];
//react의 모든 element들은 다르게 보일 필요가 있음. 그래서 id 추가.

//key 속성이 없어서, 오류 났었던 이유와 해결방법임.
//이게 map과 props를 사용하는 기본적인 방법.
function App() {
  return (
    <div>
      {foodIList.map(dish => (
        <Food 
        key={dish.id} 
        name={dish.name} 
        picture={dish.image} 
        rating={dish.rating} />
      ))}
    </div>
  );
}
export default App;

/*
father component로부터 전달받은 props가 우리가 예상한 
props인지를 우리는 항상 점검할 필요가 있음.

그래서 이 경우에 list에 있는 각 요소에 "rating" 을 추가

그리고 나서 'props types' 라는 것을 설치할꺼야.
npm i prop-types, 얘가 할 일은 내가 전달받은 props가 
내가 원하는 props인지를 확인해주는거야.
설치완료하면 import PropTypes from "prop-types"
Food.propTypes = {
  name: PropTypes.string.isRequired,
  picture: PropTypes.string.isRequired,
  //rating: PropTypes.string.isRequired
  rating: PropTypes.number.isRequired
};

*/