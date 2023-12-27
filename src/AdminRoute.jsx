import React from "react";
import { Routes, Route } from "react-router-dom";

import ProtectedRoute from "./common/ProtectedRoute";
import ErrorProvider,{ ErrorContext } from "./context/ErrorProvider";
import ProfileContext,{ProfileData} from "./context/ProfileContext";
import ServiceContext,{serviceData} from "./context/ServiceContext";
import UpdateContext,{Updatedata} from "./context/UpdateContext";

import AdminDashboard from "./admin/AdminDashboard";
import ServiceRequests from "./admin/ServiceRequests";
import AdminLogin from "./admin/AdminLogin";
import AdminProfile from "./admin/AdminProfile";
import AssignService from "./admin/AssignService";
import Allusers from "./admin/Allusers";
import AdminSidebar from "./admin/AdminSidebar";

import AllEngineers from "./admin/AllEngineers";
import UpdateAction from "./admin/UpdateAction";
import ResetPassword from "./admin/ResetPassword";
import AdminForgetPassword from "./admin/AdminForgetPassword";
import Service from "./admin/Service";
import AddNewEngineer from "./admin/AddNewEngineer";

function AdminRoute() {
  return (
   
  
      <Routes>
        
        <Route path="/admindashboard" element={ <ProtectedRoute> <AdminDashboard/> </ProtectedRoute> }  />
        <Route path="/adminprofile/:id" element={
        <ProtectedRoute><ProfileContext>
          <AdminProfile />
          </ProfileContext> </ProtectedRoute>} />
        <Route path="/servicerequests" element={<ProtectedRoute><ServiceRequests /></ProtectedRoute>} />
        <Route path="/assignuser/:id" element={<><ProtectedRoute><ErrorProvider><AssignService /></ErrorProvider></ProtectedRoute></>} />
        <Route path="/service/:id" element={
        <ProtectedRoute>  <ServiceContext>
          <Service/>
          </ServiceContext> </ProtectedRoute>}/>
        <Route path="/allusers" element={<ProtectedRoute><Allusers/></ProtectedRoute>} />
        <Route path="/allengineers" element={<ProtectedRoute><AllEngineers /></ProtectedRoute>} />
        <Route path="/addengineers" element={<ProtectedRoute><AddNewEngineer/></ProtectedRoute>}/>
        <Route path="/updateaction/:id" element={<>
        <ProtectedRoute><ErrorProvider> <UpdateContext>
          <UpdateAction />
          </UpdateContext> </ErrorProvider></ProtectedRoute></>} />
        <Route path="/reset-password" element={<><ProtectedRoute><ErrorProvider><ResetPassword /></ErrorProvider></ProtectedRoute></>} />
        

        <Route path="/forgetpassword" element={<AdminForgetPassword />} />
        <Route path="/adminlogin" element={<><ErrorProvider><AdminLogin /></ErrorProvider></>} />
       
      </Routes>
    
        
   
  );
}

export default AdminRoute;
