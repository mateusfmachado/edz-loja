import {
    SET_FORM,
    CLEAN_FORM,
    SET_TIPO_PAGAMENTO,
    FETCH_SESSION_ID,
    FETCH_SENDER_HASH,
    NOVO_PEDIDO,
    PAGAR_PEDIDO
} from '../types';

const initialState = {
    form: { dadosCobranca: {} },
    tipoPagamentoSelecionado: "cartao"
};

export default (state = initialState, action) => {
    switch(action.type){
        case SET_FORM:
            let form = { ...state.form };
            Object.keys(action.payload).forEach(item => {
                if(action.prefix) form[action.prefix][item] = action.payload[item];
                else form[item] = action.payload[item];
            });
            return { ...state, form };
        case CLEAN_FORM:
            return {
                ...state,
                ...initialState
            }
        case SET_TIPO_PAGAMENTO:
            return {
                ...state,
                tipoPagamentoSelecionado: action.tipoPagamentoSelecionado
            }
        case FETCH_SESSION_ID:
            return {
                ...state,
                sessionId: action.payload.sessionId
            }
        case FETCH_SENDER_HASH:
            return {
                ...state,
                senderHash: action.senderHash
            }
        case NOVO_PEDIDO:
            return {
                ...state,
                novoPedido: action.payload.pedido
            }
        case PAGAR_PEDIDO:
            return {
                ...state,
                novoPagamento: action.payload.pagamento
            }
        default:
            return state;
    }
}