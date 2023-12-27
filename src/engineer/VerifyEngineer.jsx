import React, { useState } from "react";
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import AxiosService from "../common/ApiService";

function VerifyEngineer(props) {

    
    
    let [code, setcode] = useState({
       code: " ",
    });

    let navigate = useNavigate();

    let validate = async (e) => {
   
    try {
      let res = await AxiosService.get("/engineer/verify", {
          
          code

      });
      if (res.status === 200) {

       toast.success("Engineer Verified Successfully")
        navigate("/engineerdashboard");
      }
    } catch (error) {

      toast.error(
        error.response.data.message ||
          "Error Occoured!"
      );

        console.log(error)
        console.log("Error Occoured! Invalid data") 
      
    }
  };
  
       

  return (
    <Modal
    {...props}
    size="lg"
    aria-labelledby="contained-modal-title-vcenter"
    centered
  >
    <Modal.Header closeButton>
      <Modal.Title id="contained-modal-title-vcenter">
      <h3 className="Verify-heading mb-4"> Engineer Verification</h3>
      <p> <b>Please check your registered email for Verification Code</b></p>
      </Modal.Title>
    </Modal.Header>
    <Modal.Body>
      
      <div className='row'>
      <form>
              
              <div className="form-floating mb-3">
                <input
                  type="password"
                  className="form-control"
                  id="floatingPassword"
                  placeholder="Password"
                  onChange={(e) => setcode(e.target.value)}
                />
                <label htmlFor="floatingPassword">Verification Code</label>
              </div>

              <div className="d-grid">
                <button className="btn btn-lg btn-primary btn-login text-uppercase fw-bold mb-2" 
                onClick={(e) => validate(e)}>
                 Submit 
                </button>
               
              </div>
            </form>
   </div>
    </Modal.Body>
    
  </Modal>
  )
}

export default VerifyEngineer