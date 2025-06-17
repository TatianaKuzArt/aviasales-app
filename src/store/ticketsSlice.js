import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const initialState = {
  tickets: [],
  loading: false
};

export const fetchTickets = createAsyncThunk(
  'ticket/fetchTickets',
  async function () {
    const searchId = await fetch('https://aviasales-test-api.kata.academy/search')
      .then(res => res.json())
      .then(res => res.searchId);

    let allTickets = [];
    let stop = false;

    while (!stop) {
      try {
        const response = await fetch(`https://aviasales-test-api.kata.academy/tickets?searchId=${searchId}`);

        if (!response.ok) {
          // когда сервер отдаёт 500 пробуем снова
          continue;
        }

        const data = await response.json();
        allTickets = allTickets.concat(data.tickets);
        stop = data.stop;
      } catch (error) {
        // щшибка сети или парсинга — пробуем снова
        console.warn('Ошибка при загрузке тикетов, пробуем снова...', error);
      }
    }

    return {
      tickets: allTickets,
      stop: stop,
    };
  }
);

const ticketsSlice = createSlice({
  name: 'tickets',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchTickets.fulfilled, (state, action) => {
      state.tickets = action.payload.tickets
      state.loading = action.payload.stop
    })
  }
});

export const {  } = ticketsSlice.actions;
export default ticketsSlice.reducer;