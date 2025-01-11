import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "./store";

export const selectMemberById = (memberId: string) => 
    createSelector(
        [(state: RootState) => state.members.members],
        (members)=> members.find((member)=>member.memberId === memberId) || null
    );

export const selectActiveMembers = createSelector(
        [(state: RootState) => state.members.members], // Input selector(s)
        (members) => members.filter((member)=> !member.isInactive)
        .sort((a, b) =>a.personalDetails.name.localeCompare(b.personalDetails.name)) // Output transformation
      );