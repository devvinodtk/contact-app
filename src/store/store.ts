import { configureStore } from "@reduxjs/toolkit";
import membersReducer from './MembersSlice';
import familyMembersReducer from './FamilyMembersSlice'
import addressDetailsReduer from './AddressDetailsSlice';

const store =configureStore({
    reducer: {
        members: membersReducer,
        fmaily_members: familyMembersReducer,
        address_details:addressDetailsReduer
    }
})

export default store;