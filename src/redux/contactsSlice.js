import { createSelector, createSlice } from "@reduxjs/toolkit";
import { addContact, deleteContact, fetchContacts } from "./contactsOps";
import { selectContacts, selectFilterName } from "./selectors";


const handleLoading = state => {
    state.loading = true
}

const handleReject = (state,action) => {
    state.loading = false;
    state.error = action.payload
};

export const selectFilteredContacts = createSelector([selectContacts, selectFilterName],
    (contacts, filterName) => {
      return   contacts.filter(contact => contact.name.toLowerCase().includes(filterName.toLowerCase()) || contact.number.includes(filterName))
    }
)



const contactsSlice = createSlice({
  name: "contacts",
  initialState: {
    items: [],
    loading: false,
    error: null,
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchContacts.pending, handleLoading)
            .addCase(fetchContacts.fulfilled, (state, action) => {
                state.loading = false;
                state.error = false;
                state.items = action.payload;
            })
            .addCase(fetchContacts.rejected, handleReject)
            .addCase(addContact.pending, handleLoading)
            .addCase(addContact.fulfilled, (state, action) => {
                state.loading = false;
                state.error = false;
                state.items.push(action.payload);
            })
            .addCase(addContact.rejected, handleReject)
            .addCase(deleteContact.pending, handleLoading)
            .addCase(deleteContact.fulfilled, (state, action) => { 
                state.loading = false;
                state.error = false;
                const index = state.items.findIndex((contact) => contact.id === action.payload.id);
                state.items.splice(index, 1);
            })
            .addCase(deleteContact.rejected,handleReject)
  }
});

export const contactsReducer = contactsSlice.reducer;
