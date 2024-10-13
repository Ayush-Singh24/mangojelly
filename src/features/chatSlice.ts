import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ChatState, Message } from "../types/types";

const initialState: ChatState = {
  messages: [],
  currentUser: { id: 1, name: "John Doe" },
  isLoading: false,
  error: null,
};

export const sendMessage = createAsyncThunk<
  Message,
  string,
  { state: { chat: ChatState } }
>("chat/sendMessage", async (message, { getState }) => {
  const { currentUser } = getState().chat;

  //Simulate API call
  await new Promise((resolve) => setTimeout(resolve, 500));
  return { id: Date.now(), text: message, user: currentUser };
});

export const receiveMessage = createAsyncThunk<Message>(
  "chat/receiveMessage",
  async () => {
    //Simulate receiving message
    await new Promise((resolve) => setTimeout(resolve, 1000));
    return {
      id: Date.now(),
      text: "This is a mock received message",
      user: { id: 2, name: "Bot" },
    };
  },
);

const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {},
  extraReducers(build) {
    build
      .addCase(sendMessage.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(sendMessage.fulfilled, (state, action) => {
        state.isLoading = false;
        state.messages.push(action.payload);
      })
      .addCase(sendMessage.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || null;
      })
      .addCase(receiveMessage.fulfilled, (state, action) => {
        state.messages.push(action.payload);
      });
  },
});

export default chatSlice.reducer;
