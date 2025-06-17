import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  checked: ['0', '1', '2'],
};

const stopsSlice = createSlice({
  name: 'stops',
  initialState,
  reducers: {
    toggleStop(state, action) {
      const value = action.payload;

      if (value === 'all') {
        const allValues = ['0', '1', '2', '3'];
        state.checked = state.checked.length === allValues.length
          ? []
          : allValues;
      } else {
        if (state.checked.includes(value)) {
          state.checked = state.checked.filter((v) => v !== value);
        } else {
          state.checked.push(value);
        }
      }
    },
  },
});

export const { toggleStop } = stopsSlice.actions;
export default stopsSlice.reducer;