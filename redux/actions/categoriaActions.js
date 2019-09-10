import {
    FETCH_CATEGORIAS,
    FETCH_CATEGORIA,
    FETCH_CATEGORIA_PRODUTOS
} from '../types';
import axios from 'axios';
import { API, versao, loja } from '../../config';

export const fetchCategorias = () => (dispatch) => {
    axios.get(`${API}/${versao}/api/categorias/disponiveis?loja=${loja}`)
    .then((response) => dispatch({ type: FETCH_CATEGORIAS, payload: response.data }))
    .catch(e => console.log(e));
}

export const fetchCategoria = (id) => dispatch => {
    axios.get(`${API}/${versao}/api/categorias/${id}?loja=${loja}`)
    .then(response => dispatch({ type: FETCH_CATEGORIA, payload: response.data }))
    .catch(e => console.log(e));
}

export const fetchProdutosCategoria = (id, atual = 0, limit = 20) => dispatch => {
    axios.get(`${API}/${versao}/api/categorias/${id}/produtos?loja=${loja}&offset=${atual}&limit=${limit}`)
    .then(response => dispatch({ type: FETCH_CATEGORIA_PRODUTOS, payload: response.data }))
    .catch(e => console.log(e));
}

export default {
    fetchCategorias,
    fetchCategoria,
    fetchProdutosCategoria
};