import { SET_CURRENT_USER, CONFIRM_REGISTRATION, CONFIRM_PASSWORD_RESET } from '../actions/types';
import isEmpty from '../validation/is-empty';

const initialState = {
    isAuthenticated: false,
    user: {},
    loading: true,
}

export default function(state = initialState, action ) {
    switch(action.type) {
        case SET_CURRENT_USER:
            return {
                ...state,
                isAuthenticated: !isEmpty(action.payload),
                user: action.payload,
                loading: false,
            }
        case CONFIRM_REGISTRATION:
            return {
                ...state,
                isAuthenticated: false,
                loading: false,
            }
        case CONFIRM_PASSWORD_RESET:
            return {
                ...state,
                isAuthenticated: false,
                loading: false,
            }
        default: 
            return state;
    }
}