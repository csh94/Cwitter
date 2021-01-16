import React from 'react';
import axios from "axios";
import Movie from "./Movie";
import "./App.css";

class App extends React.Component{
    state = {
        isLoading: true,
        movies: []
    };
    getMovies = async () => {
    const {
        data: {
            data: {
                movies
            }
        }
    } = await axios.get(
        "https://yts-proxy.now.sh/list_movies.json?sort_by=rating"
    );
    this.setState({movies: movies, isLoading: false});
}
    componentDidMount() {
        this.getMovies();
    }

    render() {
       const {isLoading, movies} = this.state;
       return (
        <section className="container">
           {isLoading ? (
                <div className="loader">
                    <span className="loader_text">loading...</span>
                </div>
           ) : (
            <div className="movies">
                {movies.map(movie => (
                    <Movie 
                    key={movie.id}
                    id={movie.id}
                    year={movie.year}
                    title={movie.title}
                    summary={movie.summary}
                    poster={movie.medium_cover_image} 
                    genres={movie.genres}
                    />
                ))}
            </div>
           )}
        </section>
       );
    }
}

export default App;

/* #4.0
axios는 땅콩(fetch)을 둘러싼 초콜릿 같은 존재
axios로부터의 데이터를 잡을 필요가 있음.
axios.get 은 항상 빠르지 않고 느림. 그래서
componentDidMount 함수가 끝날때까지 약간 시간이 걸릴 수 있다고 말해야해.
그리고 그걸 기다려야 하지!
그를 위해 async 와 await를 사용. 
async 는 이 함수가 비동기라고 한 거야. 이 말은 "너는 이걸 기다려야 해" 인거고,
await 은 함수 내부에서 "내가 뭘 기다리길 바래? axios?" 라는 거지.
async와 await는 쌍이야. 같이 써야하는 거지.
*/