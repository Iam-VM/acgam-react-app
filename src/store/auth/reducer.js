const initialState = {
    uid: null,
}

const reducer = (state=initialState, action) => {
    switch (action.type) {
        case 'SET_UID':
            return {
                ...state,
                uid: action.uid,
            }
        default:
            return {
                ...state
            }
    }
}

export default reducer;
