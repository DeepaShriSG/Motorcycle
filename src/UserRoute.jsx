import React from "react";
import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "./common/ProtectedRoute";

import ErrorProvider,{ErrorContext} from "./context/ErrorProvider";
import ProfileContext,{ProfileData} from "./context/ProfileContext";
import ServiceContext,{serviceData} from "./context/ServiceContext";

import Login from "./user/Login";
import Signup from "./user/Signup";
import ForgetPassword from "./user/ForgetPassword";
import UserDashboard from "./user/UserDashboard";

import BookService from "./user/BookService";
import UserService from "./user/UserService"
import UserProfile from "./user/UserProfile";
import Password from "./user/Password";

function UserRoute() {
  return (
    <Routes>
            <Route path="/userdashboard" element={  <ProtectedRoute> <UserDashboard/> </ProtectedRoute>}/>
            <Route path="/bookservice" element={<ProtectedRoute> <ErrorProvider><BookService /> </ErrorProvider></ProtectedRoute>} />
            <Route path="/userprofile/:id" element={
            <ProtectedRoute> 
              <ProfileContext>
              <UserProfile /> 
              </ProfileContext>
              </ProtectedRoute>
            } />
            <Route path="/userservice" element={
            <ProtectedRoute> 
              <ServiceContext>
              <UserService/> 
              </ServiceContext> 
              </ProtectedRoute>}/>
            <Route path="/resetpassword" element={<ProtectedRoute> <ErrorProvider><Password/></ErrorProvider> </ProtectedRoute>}/>
            
            <Route path="/signup" element={<ErrorProvider><Signup /></ErrorProvider>} />
            <Route path="/forget-password" element={<ForgetPassword />} /> 
            <Route path="/userlogin" element={<Login />} />
    </Routes>
  )
}

export default UserRoute