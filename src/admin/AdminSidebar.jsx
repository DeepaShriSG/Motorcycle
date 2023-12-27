import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

function AdminSidebar() {
  const location = useLocation();
  const isActive = location.pathname;

  const navigate = useNavigate();

  const logout = () => {
    sessionStorage.clear();
    navigate("/");
  };

  return (
    <div
      className="left-nav p-0 bg-white p-0 offcanvas offcanvas-start"
      data-bs-backdrop="static"
      tabIndex="-1"
      id="staticBackdrop"
      aria-labelledby="staticBackdropLabel"
    >
      <div className="offcanvas-header d-flex justify-content-between ">
        <a className=" navbar-brand sidebarlogo py-3">DS Services</a>
        <button
          type="button"
          className="btn-close my-4 mx-2 d-block d-sm-none d-md-none"
          data-bs-dismiss="offcanvas"
          aria-label="Close"
        ></button>
      </div>
      <div className="offcanvas-body">
        <ul className="nav flex-column mb-auto">
          <li className={`nav-item ${isActive ? "active" : ""}`}>
            <div
              className="nav-link"
              data-toggle="collapse"
              data-target="#collapseOne"
              aria-expanded="true"
              aria-controls="collapseTwo"
            >
              <Link to={"/admin/admindashboard"}>
                <i className="fa-solid fa-border-all"></i>
                <span>Dashboard</span>
              </Link>
            </div>
          </li>

          <li className={`nav-item ${isActive ? "active" : ""}`}>
            <div
              className="nav-link collapsed"
              data-bs-toggle="collapse"
              data-target="#collapseThree"
              aria-expanded="true"
              aria-controls="collapseUtilities"
            >
              <Link to={"/admin/servicerequests"}>
                <i className="fa-regular fa-calendar"></i>
                <span>Service Requests</span>
              </Link>
            </div>
          </li>


          <li className={`nav-item ${isActive ? "active" : ""}`}>
            <div
              className="nav-link collapsed"
              data-bs-toggle="collapse"
              data-target="#collapseFive"
              aria-expanded="true"
              aria-controls="collapseUtilities"
            >
              <Link to={"/admin/allusers"}>
                <i className="fa-solid fa-users"></i>
                <span> All Users</span>
              </Link>
            </div>
          </li>

          <li className={`nav-item ${isActive ? "active" : ""}`}>
            <div
              className="nav-link collapsed"
              data-bs-toggle="collapse"
              data-target="#collapsesix"
              aria-expanded="true"
              aria-controls="collapseUtilities"
            >
              <Link to={"/admin/allengineers"}>
                <i className="fa-solid fa-screwdriver-wrench"></i>
                <span> All Engineers</span>
              </Link>
            </div>
          </li>

          <li className={`nav-item ${isActive ? "active" : ""}`}>
            <div
              className="nav-link collapsed"
              data-bs-toggle="collapse"
              data-target="#collapseseven"
              aria-expanded="true"
              aria-controls="collapseUtilities"
            >
              <Link to={"/admin/addengineers"}>
                <i className="fa-regular fa-address-card"></i>
                <span> Add Engineers</span>
              </Link>
            </div>
          </li>

          

          <li className={`nav-item ${isActive ? "active" : ""}`}>
            <div
              className="nav-link collapsed"
              data-bs-toggle="collapse"
              data-target="#collapseTwo"
              aria-expanded="true"
              aria-controls="collapseUtilities"
            >
              <Link to={"/admin/adminprofile/:id"}>
                <i className="fa-solid fa-user"></i>
                <span>Profile</span>
              </Link>
            </div>
          </li>

          <li className={`nav-item ${isActive ? "active" : ""}`}>
            <div
              className="nav-link collapsed"
              data-bs-toggle="collapse"
              data-target="#collapseSeven"
              aria-expanded="true"
              aria-controls="collapseUtilities"
            >
              <Link to={"/admin/reset-password"}>
                <i className="fa-solid fa-key"></i>
                <span>Reset Password</span>
              </Link>
            </div>
          </li>

          <button
            className="d-none d-sm-inline-block btn btn-sm btn-primary shadow-sm"
            onClick={logout}
            
          >
            Logout
          </button>
        </ul>
      </div>
    </div>
  );
}

export default AdminSidebar;
