import { SET_CURRENT_USER, CONFIRM_REGISTRATION } from '../actions/types';
import isEmpty from '../validation/is-empty';

const initialState = {
    isAuthenticated: false,
    user: {}
}

export default function(state = initialState, action ) {
    switch(action.type) {
        case SET_CURRENT_USER:
            return {
                ...state,
                isAuthenticated: !isEmpty(action.payload),
                user: action.payload
            }
        case CONFIRM_REGISTRATION:
            return {
                ...state,
                isAuthenticated: !isEmpty(action.payload),
            }
        default: 
            return state;
    }
}