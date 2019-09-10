import actions from '../redux/actions';
import { fetchData } from './fetch';

export default function(calls = [], ctx){
    return Promise.all([
        fetchData(actions.fetchCategorias, ctx),
        fetchData(actions.fetchDadosLoja, ctx),
        ...calls.map((action) => fetchData(action, ctx))
    ]);
}