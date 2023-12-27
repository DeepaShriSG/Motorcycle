import React, {  useState } from 'react'
import { toast } from 'react-toastify'
import AxiosService from "../common/ApiService";
import { useNavigate } from "react-router-dom";


function ForgetPassword() {

   

    let [email, setEmail] = useState("");
    let [code, setverificationCode] = useState("");

    let navigate = useNavigate();

    let validatePassword = async (e) => {
    e.preventDefault();
    try {
      let res = await AxiosService.post("/admin/forget-password", {
          email,
          code
      });
      if (res.status === 200) {

        
        toast.success("Code Verified Successfully")
        
        sessionStorage.setItem("token", res.data.token);
        navigate("/admin/admindashboard");
      }
    } catch (error) {
      toast.error(
        error.response.data.message ||
          "Error Occoured! Try again"
      );
    }
  };
  return (
    <>
   <div className="w-100">
        <h2 className="logo mx-2">DS Services</h2>
        <div className="row justify-content-center m-0">
          <div className="col-lg-4 col-12 col-sm-6 p-0 card login-page">
          <div className="login-form w-75">
            <h3 className="login-heading mb-4">Forget Password</h3>
             <p> <b>Please check your registered email for Verification Code</b></p>

            {/* <!-- Sign In Form --> */}
            <form>
              <div className="form-floating mb-3">
                <input
                  type="email"
                  className="form-control"
                  id="floatingInput"
                  placeholder="name@example.com"
                  onChange={(e) => setEmail(e.target.value)}
                />
                <label htmlFor="floatingInput">Enter your Email address</label>
              </div>

              <div className="form-floating mb-3">
                <input
                  type="password"
                  className="form-control"
                  id="floatingPassword"
                  placeholder="Password"
                  onChange={(e) => setverificationCode(e.target.value)}
                />
                <label htmlFor="floatingPassword">Verification Code</label>
              </div>

              <div className="d-grid">
                <button className="btn btn-lg btn-primary btn-login text-uppercase fw-bold mb-2" 
                onClick={(e) => validatePassword(e)}>
                 Submit 
                </button>
               
              </div>
            </form>
            </div>
          </div>
          <div className="right-side col-lg-8 p-0">
            <img
              src="/Images/forgot-password.jpg"
              alt=""
              srcset=""
              className="right-image w-100"
            />
          </div>
        </div>
      </div>
    


    </>
  )
}

export default ForgetPassword