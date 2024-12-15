import { createSlice } from "@reduxjs/toolkit";
import { Address, AddressType } from "../types/Users";


export type AddressState = {
    address_type: AddressType,
    address: Address
}

const initialState: AddressState[] = [];

const membersAddressSlice = createSlice({
    name: 'address_details',
    initialState,
    reducers: {
        addAddress: (state, action) =>{
            state.push({address_type: action.payload.address_type, address: action.payload.address})
        },
        updateAddress:(state, action) => {
            const addressDetails = state.find((address: AddressState)=> address.address_type === action.payload.address_type);
            if(addressDetails) {
                Object.assign(addressDetails, action.payload);
            }
        }
    }
});

export const { addAddress, updateAddress } = membersAddressSlice.actions;
export default membersAddressSlice.reducer;