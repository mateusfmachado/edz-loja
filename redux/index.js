import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import reducer from './reducers';

export const initStore = (initialState = {}) => 
                    createStore(reducer, initialState, applyMiddleware(thunk));