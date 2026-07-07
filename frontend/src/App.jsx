import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Profile from './pages/Profile';
import Home from './pages/Home';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import ForgetPass from './pages/ForgetPass';
import { ToastContainer } from 'react-toastify';

import useGetCurrentUser from './customHooks/getCurrentUser';
import useGetCreatorCourse from './customHooks/getCreatorCourse';
import { useSelector } from 'react-redux';
import EditProfile from './pages/EditProfile';
import Courses from './pages/Educator/Courses';
import Dashboard from './pages/Educator/Dashboard'
import CreateCourses from './pages/Educator/CreateCourse'
import EditCourse from './pages/Educator/EditCourse'
import useGetPublishedCourse from './customHooks/getPublishedCourse';
import AllCourses from './pages/AllCourses';

export const serverUrl = "https://learning-management-system-ygyb.onrender.com";

function App() {

  useGetCurrentUser();   
  useGetCreatorCourse()
  useGetPublishedCourse()

  const { userData, loading } = useSelector((state) => state.user);

  if (loading) {

    return (

      <div className="min-h-screen flex items-center justify-center">

        Loading...

      </div>

    );

  }
  return (
    <>
      <ToastContainer />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/signup' element={!userData?<SignUp/>:<Navigate to={"/"}/>} />
        <Route path='/login' element={<Login />} />
        <Route path='/profile' element={userData?<Profile/>:<Navigate to={"/signup"}/>}/>
        <Route path='/forget' element={<ForgetPass/>}/>
        <Route path='/edit-profile' element={<EditProfile/>}></Route>
        <Route path='/dashboard' element={userData?.role==="educator" ? <Dashboard/>:<Navigate to={"/signup"}/>}></Route>
        <Route path='/courses' element={userData?.role==="educator" ? <Courses/>:<Navigate to={"/signup"}/>}></Route>
        <Route path='/createcourses' element={userData?.role==="educator" ? <CreateCourses/>:<Navigate to={"/signup"}/>}></Route>
        <Route path='/editcourse/:courseId' element={userData?.role==="educator" ? <EditCourse/>:<Navigate to={"/signup"}/>}></Route>
        <Route path='/allcourses' element={userData?<AllCourses/>:<Navigate to="/login" />}></Route>
      </Routes>
    </>
  );
}

export default App;
