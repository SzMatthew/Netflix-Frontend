import './GlobalStyle.scss';
import Header from './Components/Header/Header';
import MovieListContainer from './Components/MovieListContainer/MovieListContainer';
import {CategoryProvider} from './Contexts/category-context';

const App = () => {
  return (
    <div>
      <CategoryProvider>
        <Header />
        <MovieListContainer />
      </CategoryProvider>
    </div>
  );
}

export default App;
