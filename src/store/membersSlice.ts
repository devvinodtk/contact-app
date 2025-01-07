import { createSelector, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Members } from "../types/Users";
import { fetchMembers } from "../utils/Utility_Functions";
import { RootState } from "./store";

interface MembersState {
    members: Members[],
    status: 'idle' | 'loading' | 'succeeded' | 'failed',
    error?: string | null 
}
const initialState: MembersState = {
    members: [],
    status: "idle",
    error: null
};

const membersSlice = createSlice({
    name: 'members',
    initialState,
    reducers: {
        addMember: (state, action: PayloadAction<Members>) =>{
            state.members.push(action.payload);
        },
        updateMember: (state, action: PayloadAction<Members>) => {
            const updatedMember = action.payload;
            const index = state.members.findIndex((member)=> member.memberId === updatedMember.memberId);
            if(index >= 0) {
                state.members[index] = updatedMember;
            }
        }
    }, extraReducers: (builder) => {
        builder
        .addCase(fetchMembers.pending, state => {
            state.status = 'loading'
        })
        .addCase(fetchMembers.fulfilled, (state, action) => {
            state.status= 'succeeded';
            if(action.payload){
                state.members = Object.values(action.payload)
            }
        })
        .addCase(fetchMembers.rejected, (state, action) => {
            state.status= 'failed';
            state.error = action.error.message;
        })
    }
});

export const selectMemberById = (memberId: string | undefined) => 
    createSelector(
        (state: RootState) => state.members.members,
        (members)=> members.find((member)=>member.memberId === memberId)
    );


export const { addMember, updateMember } = membersSlice.actions;
export default membersSlice.reducer;