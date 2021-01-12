import './GlobalStyle.scss';
import Header from './Components/Header/Header';
import MovieListContainer from './Components/MovieListContainer/MovieListContainer';

const App = () => {
  return (
    <div>
      <Header />
      <MovieListContainer/>
    </div>
  );
}

export default App;
