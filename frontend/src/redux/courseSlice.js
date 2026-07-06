import { createSlice } from "@reduxjs/toolkit";

const courseSlice = createSlice({
  name: "course",

  initialState: {
    creatorCourseData: [],
    courseData: null,
  },

  reducers: {
    setCreatorCourseData: (state, action) => {
      state.creatorCourseData = action.payload;
    },

    setCourseData: (state, action) => {
      state.courseData = action.payload;
    },
    updateCourse: (state, action) => {

      state.courseData = state.courseData.map((course) =>

        course._id === action.payload._id ? action.payload : course

      );

    },

    removeCourse: (state, action) => {

      state.courseData = state.courseData.filter(

        (course) => course._id !== action.payload

      );

    },
  },
});

export const {

  setCreatorCourseData,

  setCourseData,

  updateCourse,

  removeCourse,

} = courseSlice.actions;

export default courseSlice.reducer;