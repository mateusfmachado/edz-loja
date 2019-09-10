import { 
    AUTENTICAR_TOKEN,
    AUTENTICAR,
    USER,
    DESAUTENTICAR
} from '../types';

const initialState = { token: null, usuario: null };
export default ( state = initialState, action) => {
    switch(action.type){
        case AUTENTICAR:
            return {
                ...state,
                token: action.payload.usuario ? action.payload.usuario.token : null,
                usuario: action.payload.usuario || null
            }
        case USER:
            return {
                ...state,
                usuario: action.payload,
                token: action.payload ? action.payload.token : null
            };
        case AUTENTICAR_TOKEN:
            return { ...state, token: action.payload }
        case DESAUTENTICAR:
            return initialState;
        default:
            return state;
    }
}