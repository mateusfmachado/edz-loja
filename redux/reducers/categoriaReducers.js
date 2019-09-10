import {
    FETCH_CATEGORIAS,
    FETCH_CATEGORIA_PRODUTOS,
    FETCH_CATEGORIA
} from '../types';

const initialState = { categorias: null };
export default ( state = initialState, action ) => {
    switch(action.type){
        case FETCH_CATEGORIAS:
            return {
                ...state,
                categorias: action.payload.categorias
            }
        case FETCH_CATEGORIA:
            return {
                ...state,
                categoria: action.payload.categoria
            }
        case FETCH_CATEGORIA_PRODUTOS:
            return {
                ...state,
                produtosCategoria: action.payload.produtos
            }
        default:
            return state;
    }
}