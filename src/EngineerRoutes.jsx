import React from 'react'
import { Routes, Route } from 'react-router-dom';
import ProtectedRoute from './common/ProtectedRoute';
import EngineerDashboard from './engineer/EngineerDashboard'
import EngineerLogin from './engineer/EngineerLogin';
import AssignedUsers from './engineer/AssignedUsers';
import CompletedUsers from './engineer/CompletedUsers';
import EngineerProfile from './engineer/EngineerProfile';
import PasswordReset from './engineer/PasswordReset';
import ServiceDetails from './engineer/ServiceDetails';

import ErrorProvider,{ ErrorContext } from './context/ErrorProvider';
import ProfileContext,{ProfileData} from "./context/ProfileContext";
import ServiceContext,{serviceData} from "./context/ServiceContext";
import UpdateContext,{Updatedata} from './context/UpdateContext';

import Update from './engineer/Update';
import ForgetPassword from './engineer/ForgetPassword';


function EngineerRoutes() {
  return (
    
    
    <Routes>

    <Route path="/engineerdashboard" element={<ProtectedRoute> <EngineerDashboard /> </ProtectedRoute>} />    
    <Route path='/assignedusers' element={ <ProtectedRoute> <ErrorProvider><AssignedUsers/></ErrorProvider></ProtectedRoute>}/>
    <Route path='/service/:id' element={ 
    <ProtectedRoute><ServiceContext>
      <ServiceDetails/>
      </ServiceContext></ProtectedRoute>  }/>
    <Route path='/update/:id' element={
    <ProtectedRoute><ErrorProvider>
             <UpdateContext> <Update/> </UpdateContext>
      </ErrorProvider> </ProtectedRoute>}/>
    <Route path='/completedservices' element={ <ProtectedRoute><CompletedUsers/> </ProtectedRoute>}/>
    <Route path='/engineerprofile/:id' element={ 
                            <ProtectedRoute> <ProfileContext>
                                  <EngineerProfile/>
                                    </ProfileContext> </ProtectedRoute>}   />
    <Route path='/forgetpassword' element={<ForgetPassword/>}/>                              
    <Route path='/passwordreset' element={<> <ProtectedRoute> <ErrorProvider><PasswordReset/></ErrorProvider></ProtectedRoute></>}/>
    <Route path="/engineerlogin" element={<><ErrorProvider><EngineerLogin/></ErrorProvider></>} />
  
  </Routes>
  
 
  )
}

export default EngineerRoutes