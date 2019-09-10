import { FETCH_DADOS } from '../types';

const initialState = { loja: null };

export default (state = initialState, action) => {
    switch(action.type){
        case FETCH_DADOS:
            return { 
                ...state,
                loja: action.payload.loja
            };
        default:
            return state;
    }
}