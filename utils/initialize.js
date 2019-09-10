import Router from 'next/router';
import actions from '../redux/actions';
import { getCookie } from './cookie';

export default function(ctx){
    if(ctx.isServer){
        ctx.store.dispatch(actions.reauthenticate(getCookie("token", ctx.req)));
    } else if(ctx.store){
        const token = ctx.store.getState().auth.token;
        if(!token && (
            ctx.pathname.includes("/area-cliente/pedido") ||
            ctx.pathname.includes("/area-cliente/dados") || 
            ctx.pathname.includes("/area-cliente/alterar-senha")
        )) Router.push("/area-cliente");
    }
}