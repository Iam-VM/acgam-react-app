export const setToLocalStorage = (state) => {
    try {
        const serializedState = JSON.stringify(state);
        localStorage.setItem('state', serializedState)
        return state;
    } catch (err) {
        // TODO: Handle this
    }
}

export const getFromLocalStorage = () => {
    try {
        const serializedState = localStorage.getItem('state');
        if (serializedState === null) return undefined;
        return JSON.parse(serializedState);
    } catch (err) {
        // TODO: Handle this
    }
}
