import React, { useState } from "react";
import { useContext } from "react";
import { toast } from 'react-toastify'
import Sidebar from './Sidebar';
import AxiosService from "../common/ApiService";

import ErrorProvider,{ ErrorContext } from "../context/ErrorProvider"

function Password() {

  

  const {errorMessage, setErrorMessage} = useContext(ErrorContext)

  let [ newpassword, setnewpassword ] = useState("");
  let [confirmpassword, setconfirmpassword ] = useState("");

  let SavePassword = async (e) => {
    e.preventDefault();
    try {
      let res = await AxiosService.post("/user/reset-password", {
        newpassword,
        confirmpassword,
      });

      console.log(res)

      if (res.status === 200) {

        toast.success("Password changed successfully")
        Navigate("/userdashboard");
      }
    } catch (error) {
      
      toast.error( error.response.data.message);
      
      setErrorMessage('An error occurred. Please try again.');
      console.log("Error Occoured!");
    }
  };



  return <>
       
       <Sidebar />
    <div className="container"> 
    <div className="row justify-content-center mt-3">
      <div className="col-9 col-sm-6 col-lg-5 card py-3 px-4 my-3 me-2">
      <h3 className="login-heading mb-4">Reset Password</h3>

        <div className="row">
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
                  {errorMessage  ? (
                    <div style={{ color: "red" }}>{errorMessage}</div>
                  ) : null}

                  <div className="d-grid">
                    <button
                      className="btn btn-lg btn-primary btn-login text-uppercase fw-bold mb-2"
                      onClick={(e) => SavePassword(e)}
                    >
                      Submit
                    </button>
                  
                  </div>
                </form>
        </div>
      </div>
    </div>
    </div>


  
  </>
}

export default Password