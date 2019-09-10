import {
    SET_CARRINHO,
    CLEAN_CARRINHO,
    FETCH_PRODUTO_CARRINHO,
    FETCH_VARIACAO_CARRINHO,
    FETCH_VALOR_ENTREGA,
    UPDATE_QTD_CART,
    UPDATE_FRETE_CART,
    REMOVE_PROD_CART,
    CLEAN_FRETES
} from '../types';

const initialState = { carrinho: null };

export default (state = initialState, action) => {
    switch(action.type){
        case SET_CARRINHO:
            return {
                ...state,
                carrinho: action.carrinho
            }
        case CLEAN_CARRINHO:
            return {
                ...state,
                carrinho: null,
                freteSelecionado: null,
                fretes: null,
                cep: null
            }
        case FETCH_PRODUTO_CARRINHO:
            if(!action.payload.produto) return state;
            return {
                ...state,
                carrinho: state.carrinho ? state.carrinho.map((item, index) => {
                    return ( action.idxCarrinho == index ) ?
                        { ...item, produto: action.payload.produto } :
                        item
                }) : []
            }
        case FETCH_VARIACAO_CARRINHO:
            if(!action.payload.variacao) return state;
            return {
                ...state,
                carrinho: state.carrinho ? state.carrinho.map((item, index) => {
                    return ( action.idxCarrinho == index ) ?
                        { ...item, variacao: action.payload.variacao } :
                        item
                }) : []
            }
        case FETCH_VALOR_ENTREGA:
            return {
                ...state,
                fretes: action.payload.resultados,
                freteSelecionado: action.payload.resultados[0],
                cep: action.cep
            }
        case UPDATE_QTD_CART:
            return {
                ...state,
                carrinho: state.carrinho ? state.carrinho.map((item, index) => {
                    return ( action.idxCarrinho == index ) ?
                        { 
                            ...item, 
                            quantidade: Number(item.quantidade) + Number(action.change)
                        } :
                        item
                }) : []
            }
        case REMOVE_PROD_CART:
            return {
                ...state,
                carrinho: state.carrinho.reduce(
                        (all, item, index) => 
                        index !== action.idxCarrinho ? all.concat([item]) : all, []
                    )
            }
        case UPDATE_FRETE_CART:
            return {
                ...state,
                freteSelecionado: action.freteSelecionado
            }
        case CLEAN_FRETES:
            return {
                ...state,
                freteSelecionado: null,
                fretes: null,
                cep: null
            }
        default:
            return state;
    }
}