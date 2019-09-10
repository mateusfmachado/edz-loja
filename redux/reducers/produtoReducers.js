import {
    FETCH_PRODUTOS,
    FETCH_PESQUISA,
    FETCH_PRODUTOS_PESQUISA,
    FETCH_PRODUTO,
    FETCH_PRODUTO_AVALIACOES,
    FETCH_PRODUTO_VARIACOES,
    NOVA_AVALIACAO
} from '../types';

const initialState = {
    produtos: null,
    termo: "",
    produtosPesquisa: null,
    produto: null
};

export default (state = initialState, action) => {
    switch(action.type){
        case FETCH_PRODUTOS:
            return {
                ...state,
                produtos: action.payload.produtos
            }
        case FETCH_PESQUISA:
            return {
                ...state,
                termo: action.termo
            }
        case FETCH_PRODUTOS_PESQUISA:
            return {
                ...state,
                produtosPesquisa: action.payload.produtos,
                termo: action.termo
            }
        case FETCH_PRODUTO:
            return {
                ...state,
                produto: action.payload.produto
            }
        case FETCH_PRODUTO_AVALIACOES:
            return {
                ...state,
                avaliacoes: action.payload.avaliacoes
            }
        case FETCH_PRODUTO_VARIACOES:
            return {
                ...state,
                variacoes: action.payload.variacoes
            }
        case NOVA_AVALIACAO:
            return {
                ...state,
                avaliacoes: state.avaliacoes.concat([action.payload.avaliacao])
            }
        default:
            return state;
    }
}