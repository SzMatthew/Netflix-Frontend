import React, { useContext, useMemo, useReducer, createContext  } from 'react';

const OrderByContext = createContext();

const orderByReducer = (state, action) => {
    switch (action.type)
    {
        case 'SET_ORDERBY': { 
            return {orderBy: action.payload}
        }
        default: { 
            throw new Error(`Unsupported action type: ${action.type}`);
        }
     }
}
 
const OrderByProvider = (props) => {
    const [state, dispatch] = useReducer(orderByReducer, {orderBy: 'release_date'});
    const value = useMemo(() => [state, dispatch], [state]);
    return <OrderByContext.Provider value={value} {...props}/>
}
 
const useOrderBy = () => { 
    const context = useContext(OrderByContext);
    if (!context){
        throw new Error('useOrderBy must be used within a OrderByProvider');
    }

    const [state, dispatch] = context;

    const setOrderBy = (orderBy) => {
        if (state.ordeyBy !== orderBy)
        {
            dispatch({type: 'SET_ORDERBY', payload: orderBy});
        }
    }

    return {
        state,
        dispatch,
        setOrderBy
    }
}

export { useOrderBy, OrderByProvider}