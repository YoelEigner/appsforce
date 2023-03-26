import { UserDataRequest } from "../Network/UserDataRequest"


export const onGetUsers = () => {
    return async (dispatch) => {
        try {
            const users = await UserDataRequest()
            let userArr = users.results
            await dispatch({ type: 'SET_USERS', userArr })
        } catch (err) {
            console.log('Cannot set users', err)
        }
    }
}
export const onEditUser = (updatedUser, idxToUpdate) => {
    return async (dispatch) => {
        try {
            updatedUser.index = idxToUpdate
            await dispatch({ type: 'UPDATE_USER', updatedUser })
        } catch (err) {
            console.log('Cannot Update users', err)
        }
    }
}
export const onAddUser = (newUser) => {
    return async (dispatch) => {
        try {
            await dispatch({ type: 'ADD_USER', newUser })
        } catch (err) {
            console.log('Cannot create user', err)
        }
    }
}
export const onDeleteUser = (delIndex) => {
    return async (dispatch) => {
        try {
            await dispatch({ type: 'DELETE_USER', delIndex })
        } catch (err) {
            console.log('Cannot Delete users', err)
        }
    }
}