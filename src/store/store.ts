import { configureStore } from "@reduxjs/toolkit";
import membersReducer from './MembersSlice';
import familyMembersReducer from './FamilyMembersSlice'

const store =configureStore({
    reducer: {
        members: membersReducer,
        fmaily_members: familyMembersReducer
    }
})

export default store;