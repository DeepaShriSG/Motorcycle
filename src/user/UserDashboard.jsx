import React, { useEffect } from "react";

import { useNavigate } from "react-router-dom";
import {  Button } from "react-bootstrap"; 
import Sidebar from "./Sidebar";

function UserDashboard() {
  let navigate = useNavigate()
  return (
    <>
      <div className="w-100">
        <Sidebar />
        <div className=" m-0 p-0">
          <div id="carouselExampleCaptions" className="carousel slide">
            <div className="carousel-indicators">
              <button
                type="button"
                data-bs-target="#carouselExampleCaptions"
                data-bs-slide-to="0"
                className="active"
                aria-current="true"
                aria-label="Slide 1"
              ></button>
              <button
                type="button"
                data-bs-target="#carouselExampleCaptions"
                data-bs-slide-to="1"
                aria-label="Slide 2"
              ></button>
              <button
                type="button"
                data-bs-target="#carouselExampleCaptions"
                data-bs-slide-to="2"
                aria-label="Slide 3"
              ></button>
            </div>
            <div className="carousel-inner">
              <div className="carousel-item active">
                <img
                  src="/Images/UserDashboard.jpg"
                  className="d-block w-100"
                  alt="..."
                />
                <div className="carousel-caption d-flex flex-column h-100 align-items-center justify-content-center bottom-0">
                  <h2 className="bg-dark bg-opacity-50 py-2 px-4">
                  Need a Motorcycle Service Mechanic?
                  </h2>
                  <p className="bg-dark bg-opacity-50 py-2 px-4">
                  Professional Repair services for all your Motorcycle Brands and Model. Please fill the form bellow to reach you.
                  </p>
                <Button className="btn btn-outline-light px-4 py-2 rounded-0" 
                onClick={() => {
                         navigate("/user/bookservice")
                        }}
                style={{border:"2px solid #a3a4a0"}}
                        >Book Service</Button>
                </div>
              </div>
              <div className="carousel-item">
                <img
                  src="/Images/Userdashboard1.jpg"
                  className="d-block w-100"
                  alt="..."
                />
                <div className="carousel-caption d-flex flex-column h-100 align-items-center justify-content-center bottom-0 ">
                  <h2 className="bg-dark bg-opacity-50 py-2 px-4">
                    Home Visit
                  </h2>
                  <p className="bg-dark bg-opacity-50 py-2 px-4">
                    Schedule Visit as per your Convenience
                  </p>
                  <Button className="btn btn-outline-light px-4 py-2 rounded-0" 
                   onClick={() => {
                         navigate("/user/bookservice")
                        }}
                        style={{border:"2px solid #a3a4a0"}}
                        >Book Service</Button>
                </div>
              </div>
              <div className="carousel-item">
              <img
                  src="/Images/Userdashboard2.jpg"
                  className="d-block w-100"
                  alt="..."
                />
                <div className="carousel-caption d-flex flex-column h-100 align-items-center justify-content-center bottom-0">
                  <h2 className="bg-dark bg-opacity-50 py-2 px-4">
                    Discover Our Services
                  </h2>
                  <p className="bg-dark bg-opacity-50 py-2 px-4">
                    Professional service for all your Motorcycle needs 
                  </p>
                  <Button className="btn btn-outline-light px-4 py-2 rounded-0" 
                       onClick={() => {
                         navigate("/user/bookservice")
                        }}
                        style={{border:"2px solid #a3a4a0"}}
                        >Book Service</Button>
                </div>
              </div>
            </div>
            <button
              className="carousel-control-prev"
              type="button"
              data-bs-target="#carouselExampleCaptions"
              data-bs-slide="prev"
            >
              <span
                className="carousel-control-prev-icon"
                aria-hidden="true"
              ></span>
              <span className="visually-hidden">Previous</span>
            </button>
            <button
              className="carousel-control-next"
              type="button"
              data-bs-target="#carouselExampleCaptions"
              data-bs-slide="next"
            >
              <span
                className="carousel-control-next-icon"
                aria-hidden="true"
              ></span>
              <span className="visually-hidden">Next</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default UserDashboard;
