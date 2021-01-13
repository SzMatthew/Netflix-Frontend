import React, {createContext, useContext, useMemo, useReducer} from 'react';

const SearchContext = createContext();

const searchReducer = (state, action) => {
    switch (action.type)
    {
        case 'SET_SEARCH_WORD': { 
            return {searchWord: action.payload}
        }
        default: { 
            throw new Error(`Unsupported action type: ${action.type}`);
        }
     }
}
 
const SearchProvider = (props) => { 
    const [state, dispatch] = useReducer(searchReducer, {searchWord: ''});
    const value = useMemo(() => [state, dispatch], [state]);
    return <SearchContext.Provider value={value} {...props} />;
}

const useSearch = () => { 
    const context = useContext(SearchContext);
    if (!context){
        throw new Error('useSearch must be used within a SearchProvider');
    }
    
    const [state, dispatch] = context;

    const setSearch = (searchWord) => { 
        dispatch({type: 'SET_SEARCH_WORD', payload: searchWord});
    }

    return {
        state,
        dispatch,
        setSearch
    }
}

export { useSearch, SearchProvider}