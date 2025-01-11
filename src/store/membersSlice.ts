import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Members } from "../types/Users";
import { fetchMembers } from "../utils/Utility_Functions";

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
        resetMember: ()=> initialState,
        addMember: (state, action: PayloadAction<Members>) =>{
            state.members.push(action.payload);
        },
        updateMember: (state, action: PayloadAction<Members>) => {
            const updatedMember = action.payload;
            const index = state.members.findIndex((member)=> member.memberId === updatedMember.memberId);
            if(index >= 0) {
                state.members[index] = updatedMember;
            }
        },
        deleteMember: (state, action: PayloadAction<string>) => {
            state.members = state.members.filter((member) => member.memberId !== action.payload)
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

export const { addMember, updateMember, resetMember, deleteMember } = membersSlice.actions;
export default membersSlice.reducer;