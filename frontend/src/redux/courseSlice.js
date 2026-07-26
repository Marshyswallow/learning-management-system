import { createSlice } from "@reduxjs/toolkit";

const courseSlice = createSlice({
  name: "course",

  initialState: {
    creatorCourseData: [],
    courseData: [],
    selectedCourse: null,
  },

  reducers: {
    setCreatorCourseData: (state, action) => {
      state.creatorCourseData = action.payload;
    },

    setCourseData: (state, action) => {
      state.courseData = action.payload;
    },
    updateCourse: (state, action) => {
      const updatedCourse = action.payload;
      const courseIndex = state.courseData.findIndex(
        (course) => course._id === updatedCourse._id
      );

      if (!updatedCourse.published) {
        state.courseData = state.courseData.filter(
          (course) => course._id !== updatedCourse._id
        );
      } else if (courseIndex === -1) {
        state.courseData.unshift(updatedCourse);
      } else {
        state.courseData[courseIndex] = updatedCourse;
      }

    },
    setSelectedCourse:(state,action)=>{
      state.selectedCourse=action.payload
    },
    removeCourse: (state, action) => {

      state.courseData = state.courseData.filter(

        (course) => course._id !== action.payload

      );

    },
  },
});

export const {
  setSelectedCourse,

  setCreatorCourseData,

  setCourseData,

  updateCourse,

  removeCourse,

} = courseSlice.actions;

export default courseSlice.reducer;
