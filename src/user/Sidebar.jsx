import React from 'react'
import { Link,useLocation,useNavigate } from 'react-router-dom'
import { Button } from "react-bootstrap"; 
function Sidebar() {

  const location = useLocation();

  const isActive = location.pathname;

  const navigate = useNavigate();

  const logout = () => {
    sessionStorage.clear();
    navigate("/");
  };

  return <>

  <nav className=" usernav navbar navbar-expand-lg ">
  <div className="container-fluid d-flex justify-content-between align-items-center">
    
    <a className="navbar-brand sidebarlogo text-white" href="#" style={{color:"white"}}>DS Services</a>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" 
    aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation" style={{backgroundColor:"white"}}>
      <span className="navbar-toggler-icon"></span>
    </button>
    
    <div className="collapse navbar-collapse justify-content-end align-items-center" id="navbarSupportedContent">
      <ul className="navbar-nav me-0 mb-2 mb-lg-0">

           <li className={`nav-item ${isActive ? "active" : ""}`}>
            <div
              className="nav-link m-2"
              data-toggle="collapse"
              data-target="#collapseOne"
              aria-expanded="true"
              aria-controls="collapseTwo"
            >
              <Link to={"/user/userdashboard"}>
               
                <span className='text-white'>Home</span>
              </Link>
            </div>
          </li>

          <li className={`nav-item ${isActive ? "active" : ""}`}>
            <div
              className="nav-link collapsed m-2"
              data-bs-toggle="collapse"
              data-target="#collapseThree"
              aria-expanded="true"
              aria-controls="collapseUtilities"
            >
              <Link to={"/user/bookservice"}>
               
                <span className='text-white'>Book Service</span>
              </Link>
            </div>
          </li>

          <li className={`nav-item ${isActive ? "active" : ""}`}>
            <div
              className="nav-link collapsed m-2"
              data-bs-toggle="collapse"
              data-target="#collapseThree"
              aria-expanded="true"
              aria-controls="collapseUtilities"
            >
              <Link to={"/user/userservice"}>
                
                <span className='text-white'>Service Details</span>
              </Link>
            </div>
          </li>
              
          <li className={`nav-item ${isActive ? "active" : ""}`}>
            <div
              className="nav-link collapsed m-2"
              data-bs-toggle="collapse"
              data-target="#collapseFour"
              aria-expanded="true"
              aria-controls="collapseUtilities"
            >
              <Link to={"/user/userprofile/:id"}>
                
                <span className='text-white'>User Profile</span>
              </Link>
            </div>
          </li>

          <li className={`nav-item ${isActive ? "active" : ""}`}>
            <div
              className="nav-link collapsed m-2"
              data-bs-toggle="collapse"
              data-target="#collapseFive"
              aria-expanded="true"
              aria-controls="collapseUtilities"
            >
              <Link to={"/user/resetpassword"}>
               
                <span className='text-white'>Reset Password</span>
              </Link>
            </div>
          </li>
          
          
          <Button
            className="d-none d-sm-inline-block btn btn-sm btn-white shadow-sm"
            onClick={logout}
            style={{border:"2px solid #a3a4a0"}}
           
          >
            Logout
          </Button>

      </ul>

      
    
    </div>
   
  </div>
    </nav>
  

  </>
}

export default Sidebar