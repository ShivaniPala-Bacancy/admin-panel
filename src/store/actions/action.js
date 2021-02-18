import * as actionTypes from './actionsTypes'


export const login = (id) => {
    return{
        type: actionTypes.LOGIN,
        id: id
    }
}

export const logout = () => {
    return{
        type: actionTypes.LOGOUT
    }
}