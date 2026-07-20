import { createSlice } from "@reduxjs/toolkit";

const lectureSlice = createSlice({
  name: "lecture",

  initialState: {
    lectureData: [],
  },

  reducers: {
    // Set all lectures
    setLectureData: (state, action) => {
      state.lectureData = action.payload;
    },

    // Add newly created lecture
    addLecture: (state, action) => {
      state.lectureData.push(action.payload);
    },

    // Update lecture
    updateLecture: (state, action) => {
      state.lectureData = state.lectureData.map((lecture) =>
        lecture._id === action.payload._id ? action.payload : lecture
      );
    },

    // Remove lecture
    removeLecture: (state, action) => {
      state.lectureData = state.lectureData.filter(
        (lecture) => lecture._id !== action.payload
      );
    },
  },
});

export const {
  setLectureData,
  addLecture,
  updateLecture,
  removeLecture,
} = lectureSlice.actions;

export default lectureSlice.reducer;