// src/features/story/storySlice.ts

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { AuthAPI, endpoints } from "../Service/ApiConfig";

interface StoryState {
  stories: any[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: StoryState = {
  stories: [],
  status: "idle",
  error: null,
};
interface CreateStoryPayload {
  accessToken: string;
  formData: FormData;
}
export const createStoryThunk = createAsyncThunk(
  "story/createStory",
  async (
    { accessToken, formData }: CreateStoryPayload,
    { rejectWithValue }
  ) => {
    try {
      const response = await AuthAPI(accessToken).post(
        endpoints["upload_story"],
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      return response.data;
    } catch (error: any) {
      if (error) {
        return rejectWithValue(error.response.data);
      }
      return rejectWithValue(error.message);
    }
  }
);

const storySlice = createSlice({
  name: "story",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createStoryThunk.pending, (state) => {
        state.status = "loading";
      })
      .addCase(createStoryThunk.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.stories.push(action.payload);
      })
      .addCase(createStoryThunk.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload as string;
      });
  },
});

export default storySlice.reducer;
