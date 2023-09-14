import { createSlice } from '@reduxjs/toolkit';

//manager theme with redux

const initialState = {
    // default is light theme if not have theme in local storage
    theme: JSON.parse(window?.localStorage.getItem('theme')) ?? "light",
}

// slice is a part of redux store and it has a reducer and actions
const themeSlice = createSlice({
    name: 'theme',
    initialState,
    reducers: {
        setTheme(state, action) {
            //state.theme is a value of theme in redux store and action.payload is a value of theme in local storage
            state.theme = action.payload;
            //save theme in local storage
            localStorage.setItem('theme', JSON.stringify(action.payload));
        }
    }
})

export default themeSlice.reducer;

export function setTheme(value) {
    //dispatch is a function to call action
    return (dispatch) => {
        dispatch(themeSlice.actions.setTheme(value));
    }
}