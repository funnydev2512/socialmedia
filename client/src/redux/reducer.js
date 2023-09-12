import { combineReducers } from "@reduxjs/toolkit";

import userSlice from "./postSlice";
import themeSlice from "./theme";
import postSlice from "./postSlice";

//combine all reducers and reason to combine is to create a store and the store is 
// the reducer is a function to change state in redux store
//redux store is a global state
const rootReducer = combineReducers({
    user : userSlice,
    theme: themeSlice,
    posts: postSlice,
});

export { rootReducer };
