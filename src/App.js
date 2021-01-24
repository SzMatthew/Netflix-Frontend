import './GlobalStyle.scss';
import Header from './Components/Header/Header';
import MovieListContainer from './Components/MovieListContainer/MovieListContainer';
import {CategoryProvider} from './Contexts/category-context';
import {OrderByProvider} from './Contexts/order-by-context';
import {SearchProvider} from './Contexts/search-context';

import { Switch, Route, Redirect } from 'react-router-dom';

const App = () => {
  return (
      <CategoryProvider style={{height: "100%"}}>
        <OrderByProvider>
          <SearchProvider>
            <Switch>
              <Route exact path="/">
                <Redirect to="/movies?category=all" />
              </Route>
              <Route path="/movies">
                <Header />
                <MovieListContainer />
              </Route>
              <Route>
                <div>
                  <h1>404 | Not Found</h1>
                </div>
              </Route>
            </Switch>
          </SearchProvider>
        </OrderByProvider>
      </CategoryProvider>
  );
}

export default App;
