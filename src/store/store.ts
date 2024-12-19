import { configureStore } from "@reduxjs/toolkit";
import membersReducer from './MembersSlice';

const store =configureStore({
    reducer: {
        members: membersReducer
    }
})

export default store;