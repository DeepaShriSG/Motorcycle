import React from 'react'
import { Link,useLocation,useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

function Engineersidebar() {

    const location = useLocation();
    const isActive = location.pathname

    const navigate = useNavigate();

    const logout = () => {
        sessionStorage.clear();
        navigate('/engineer/engineerlogin');
      };

  return (
    <div className="left-nav bg-white p-0 offcanvas offcanvas-start" data-bs-backdrop="static" tabIndex="-1" id="staticBackdrop" aria-labelledby="staticBackdropLabel">
    <div className="offcanvas-header d-flex justify-content-between ">
        <a className=" navbar-brand sidebarlogo py-3">DS Services</a>
        <button type="button" className="btn-close my-4 mx-2 d-block d-sm-none d-md-none" data-bs-dismiss="offcanvas" aria-label="Close"></button>
  </div>
   <div className="offcanvas-body">
    
    <ul  className="nav flex-column mb-auto"> 
           
    <li className={`nav-item ${isActive ? 'active' : ''}`}>
        <div className="nav-link"  data-toggle="collapse" data-target="#collapseOne"
            aria-expanded="true" aria-controls="collapseTwo">
          <Link to={'/engineer/engineerdashboard'}>
            <i className="fa-solid fa-border-all"></i>
            <span>Dashboard</span>
          </Link>
        </div>
        
    </li>


   
    <li className={`nav-item ${isActive ? 'active' : ''}`}>
        <div className="nav-link collapsed" data-bs-toggle="collapse" data-target="#collapseThree"
            aria-expanded="true" aria-controls="collapseUtilities">
           <Link to={"/engineer/assignedusers"}>
           <i className="fa-solid fa-screwdriver-wrench"></i>  
            <span >Assigned Services</span>
           </Link>
        </div>
    </li>


    <li className={`nav-item ${isActive ? 'active' : ''}`}>
        <div className="nav-link collapsed" data-bs-toggle="collapse" data-target="#collapseFive"
            aria-expanded="true" aria-controls="collapseUtilities">
           <Link to={"/engineer/completedservices"}>
           <i className="fa-solid fa-square-check"></i>
            <span>Completed Services</span>
           </Link>
        </div>
    </li>


    <li className={`nav-item ${isActive ? 'active' : ''}`}>
        <div className="nav-link collapsed"  data-bs-toggle="collapse" data-target="#collapseSeven"
            aria-expanded="true" aria-controls="collapseUtilities">
          <Link to={"/engineer/engineerprofile/:id"}>
           <i className="fa-solid fa-user"></i>
            <span >Profile</span>
           </Link>
        </div>
    </li>

    <li className={`nav-item ${isActive ? 'active' : ''}`}>
        <div className="nav-link collapsed" data-bs-toggle="collapse" data-target="#collapseEight"
            aria-expanded="true" aria-controls="collapseUtilities">
           <Link to={"/engineer/passwordreset"}>
           <i className="fa-solid fa-key"></i>
            <span >Reset Password</span>
           </Link>
        </div>
    </li>
     
    <button className="d-none d-sm-inline-block btn btn-sm btn-primary shadow-sm"
        onClick={logout}>Logout</button>
      
    </ul>
    
  </div>
</div>
  )
}

export default Engineersidebar