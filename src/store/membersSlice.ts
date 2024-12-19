import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Members } from "../types/Users";

interface MembersState {
    members: Members[]
}
const initialState: MembersState = {
    members: []
};

const membersSlice = createSlice({
    name: 'members',
    initialState,
    reducers: {
        addMember: (state, action: PayloadAction<Members>) =>{
            state.members.push(action.payload);
        }
    }
});

export const { addMember } = membersSlice.actions;
export default membersSlice.reducer;