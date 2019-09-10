import { combineReducers } from 'redux';

import authReducer from './authReducers';
import categoriaReducer from './categoriaReducers';
import lojaReducer from './lojaReducers';
import produtoReducer from './produtoReducers';
import carrinhoReducer from './carrinhoReducers';
import clienteReducer from './clienteReducers';
import checkoutReducer from './checkoutReducers';
import pedidoReducer from './pedidoReducers';

export default combineReducers({
    auth: authReducer,
    categoria: categoriaReducer,
    loja: lojaReducer,
    produto: produtoReducer,
    carrinho: carrinhoReducer,
    cliente: clienteReducer,
    checkout: checkoutReducer,
    pedido: pedidoReducer
});