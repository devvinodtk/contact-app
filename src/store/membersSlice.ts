import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Members } from '../types/Users.ts';
import {
  db,
  ref,
  get as getDoc,
} from '../firebase/firebase.ts';

interface MembersState {
    members: Members[],
    status: 'idle' | 'loading' | 'succeeded' | 'failed',
    error?: string | null
}
const initialState: MembersState = {
  members: [],
  status: 'idle',
  error: null,
};

export const fetchActiveMemberById = createAsyncThunk(
  'kalakairali/members/fetchActiveMemberById',
  async (memberId: string, { rejectWithValue }) => {
    try {
      const getDocRef = ref(db, `kalakairali/members/${memberId}`);
      const snapshot = await getDoc(getDocRef);
      if (snapshot.exists()) {
        return snapshot.val();
      }
      return rejectWithValue('Member not found');
    } catch (err: any) {
      return rejectWithValue(err.message);
    }
  },
);

export const fetchMembers = createAsyncThunk('kalakairali/members', async () => {
  try {
    const getDocRef = ref(db, 'kalakairali/members');
    const snapshot = await getDoc(getDocRef);
    if (snapshot.exists()) {
      return snapshot.val();
    }
    return null;
  } catch (err: any) {
    throw Error(err.message);
  }
});

const membersSlice = createSlice({
  name: 'members',
  initialState,
  reducers: {
    resetMember: () => initialState,
    addMember: (state, action: PayloadAction<Members>) => {
      state.members.push(action.payload);
    },
    updateMember: (state, action: PayloadAction<Members>) => {
      const updatedMember = action.payload;
      const index = state.members.findIndex((member) => member.memberId === updatedMember.memberId);
      if (index >= 0) {
        state.members[index] = updatedMember;
      }
    },
    deleteMember: (state, action: PayloadAction<string>) => {
      state.members = state.members.filter((member) => member.memberId !== action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMembers.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchMembers.fulfilled, (state, action) => {
        state.status = 'succeeded';
        if (action.payload) {
          state.members = Object.values(action.payload);
        }
      })
      .addCase(fetchMembers.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });

    builder
      .addCase(fetchActiveMemberById.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchActiveMemberById.fulfilled, (state, action) => {
        state.status = 'succeeded';
        if (action.payload) {
          state.members[0] = action.payload;
        }
      })
      .addCase(fetchActiveMemberById.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const {
  addMember, updateMember, resetMember, deleteMember,
} = membersSlice.actions;
export default membersSlice.reducer;
