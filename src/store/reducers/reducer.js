import * as actionTypes from '../actions/actionsTypes'

const initialState= {
    loggedIn: false,
    loggedInId: null
}

const reducer = (state= initialState, action) => {
    if(action.type === actionTypes.LOGIN){
        return{
            ...state,
            loggedIn: true,
            loggedInId: action.id
        }
    }
    if(action.type === actionTypes.LOGOUT){
        return{
            ...state,
            loggedInId: null,
            loggedIn: false
        }
    }
    return state;
}

export default reducer;