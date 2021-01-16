import React, { useContext, useMemo, useReducer, createContext } from 'react';

const CategoryContext = createContext();

const categoryReducer = (state, action) => {
    switch (action.type)
    {
        case 'SET_CATEGORY': { 
            return {category: action.payload}
        }
        default: { 
            throw new Error(`Unsupported action type: ${action.type}`);
        }
     }
}
 
const CategoryProvider = (props) => { 
    const [state, dispatch] = useReducer(categoryReducer, {category: 'ALL'});
    const value = useMemo(() => [state, dispatch], [state]);
    return <CategoryContext.Provider value={value} {...props}/>
}

const useCategory = () => { 
    const context = useContext(CategoryContext);
    if (!context){
        throw new Error('useCategory must be used within a CategoryProvider');
    }
    const [state, dispatch] = context;

    const setCategory = (category) => { 
        if (state.category !== category){
            dispatch({type: 'SET_CATEGORY', payload: category});
        }
    }

    return {
        state,
        dispatch,
        setCategory
    }
}



export { useCategory, CategoryProvider}