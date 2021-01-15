import './GlobalStyle.scss';
import Header from './Components/Header/Header';
import MovieListContainer from './Components/MovieListContainer/MovieListContainer';
import {CategoryProvider} from './Contexts/category-context';
import {OrderByProvider} from './Contexts/order-by-context';
import {SearchProvider} from './Contexts/search-context';

const App = () => {
  return (
    <div style={{height: "100%"}}>
      <CategoryProvider>
        <OrderByProvider>
          <SearchProvider>
            <Header />
            <MovieListContainer />
          </SearchProvider>
        </OrderByProvider>
      </CategoryProvider>
    </div>
  );
}

export default App;
