import React, { useState } from 'react'
import { toast } from 'react-toastify'
import {  useContext } from 'react'
import AxiosService from "../common/ApiService";
import Engineersidebar from './Engineersidebar';
import ErrorProvider,{ ErrorContext } from "../context/ErrorProvider"

function PasswordReset() {

  const {errorMessage, setErrorMessage} = useContext(ErrorContext)
    
    let [newpassword, setnewpassword] = useState("");
    let [confirmpassword, setconfirmpassword] = useState("");
    

   let SavePassword = async(e)=>{
    e.preventDefault();
    try {
      let res = await AxiosService.post("/engineer/resetpassword", {
        newpassword,
        confirmpassword
      });
      
      if (res.status === 200) {
          toast.success("Password changed successfully")
          Navigate("/engineerdashboard")
      }
    } catch (error) {
      
      toast.error(
        error.response.data.message ||
          "Error Occoured!"
      );

      if (error.response && error.response.data && error.response.data.message) {
        setErrorMessage(error.response.data.message);
      } else {

        setErrorMessage('An error occurred. Please try again.');
        console.error('Error:', error);
      }
      
    }
  };

  return (
    <div className="w-100">
        <div className="left-nav m-0 p-0">
         <Engineersidebar/>
        </div>

      <div className="right-content px-3">  
      <div className="d-block d-sm-none m-2">
           <span className="row justify-content-between align-items-center">
            <a className="sidebarlogo navbar-brand col-6 m-0" href="#">
                DS Services
              </a>
              <div className="col-6 text-end px-4"> 
             <i className=" fa-solid fa-bars fa-xl" data-bs-toggle="offcanvas" data-bs-target="#staticBackdrop" aria-controls="staticBackdrop"></i>
            </div>
            </span>
          </div>
        
          <div className=" m-0 p-0">
            
          <div className="row justify-content-center align-items-center">
          <div className="card col-lg-5 col-sm-6 col-md-6 p-3 m-5">
          <h3 className="login-heading mb-4">Reset Password</h3>
          <form>
              
              <div className="form-floating mb-3">
               <input
                 type="password"
                 className="form-control"
                 id="floatingPassword1"
                 placeholder="Password"
                 onChange={(e) => setnewpassword(e.target.value)}
               />
               <label htmlFor="floatingPassword">New password</label>
             </div>

             <div className="form-floating mb-3">
               <input
                 type="password"
                 className="form-control"
                 id="floatingPassword2"
                 placeholder="Password"
                 onChange={(e) => setconfirmpassword(e.target.value)}
               />
               <label htmlFor="floatingPassword">Confirm password</label>
             </div>

             
                  {errorMessage ? (
                    <div style={{ color: "red" }}>{errorMessage}</div>
                  ) : null}

             <div className="d-grid">
               <button className="btn btn-lg btn-primary btn-login text-uppercase fw-bold mb-2" 
               onClick={(e) => SavePassword(e)}>
                Submit 
               </button>
              
             </div>
           </form>
     </div>
          

        </div>
             
          
          </div>
      </div>
    
    </div>
  )
}

export default PasswordReset
