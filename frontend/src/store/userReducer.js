const RECEIVE_USER = 'users/RECEIVE_USER';
const REMOVE_USER = 'users/REMOVE_USER';


export const receive = (user) => ({
    type: RECEIVE_USER,
    user

})

export const remove = (id) => ({
    type: REMOVE_USER,
    id
})

function userReducer(state = {}, action) {
    const newState = { ...Object.freeze(state) };
    switch (action.type) {
        case RECEIVE_USER:
            return {
              ...state,
                [action.user.id]: action.user
            }
        case REMOVE_USER:
            return {
              ...state,
                [action.id]: null
            }
        default:
            return state;
    }
}

export default userReducer;
