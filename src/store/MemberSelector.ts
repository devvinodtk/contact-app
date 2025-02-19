import { createSelector } from '@reduxjs/toolkit';
import { RootState } from './store';

export const selectMemberById = (memberId?: string) => createSelector(
  [(state: RootState) => state.members.members],
  (members) => (memberId ? members.find((member) => member.memberId === memberId) : null),
);

export const selectActiveMembers = createSelector(
  [(state: RootState) => state.members.members], // Input selector(s)
  (members) => members.filter((member) => !member.isInactive)
    .sort((a, b) => a.personalDetails.name.localeCompare(b.personalDetails.name)), // Output transformation
);

export const selectInActiveMembers = createSelector(
  [(state: RootState) => state.members.members], // Input selector(s)
  (members) => members.filter((member) => member.isInactive)
    .sort((a, b) => a.personalDetails.name.localeCompare(b.personalDetails.name)), // Output transformation
);

export const selectMemberIDMobileMap = createSelector(
  [(state: RootState) => state.members.members],
  (members) => members.map((member) => ({
    [member.personalDetails.mobileNumber]: member.memberId,
  })),
);
