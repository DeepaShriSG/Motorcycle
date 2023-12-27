import React, { useState, useEffect } from "react";
import { toast } from 'react-toastify'
import { Table, Button } from "react-bootstrap"; 
import AxiosService from "../common/ApiService";
import AdminSidebar from "./AdminSidebar";
import { useNavigate } from 'react-router-dom';


function Allusers() {
    
  let [data, setData] = useState([]);

    console.log(data)
   
    let navigate = useNavigate()
    

    const getData = async()=>{
    
      try {
        let res = await AxiosService.get("/user/allusers")
       
        if(res.status===200){
          setData(res.data.user)
          
        }
        
      }  catch (error) {

        toast.error(
          error.response.data.message ||
            "Error Occoured! Try again"
        );
        
        console.error('Error fetching data:', error);
        console.log('Invalid request');
      }
      
     }
    
      useEffect(()=>{
          getData()
      },[])

  return (
    <div className="w-100">
   
        <AdminSidebar/>
    
      <div className="right-content px-3">
      <div className="d-block d-sm-none m-2">
           <span className="row justify-content-between align-items-center">
            <a className="sidebarlogo navbar-brand col-6 m-0" href="#">
                DS Services
              </a>
              <div className="col-6 text-end px-4"> 
             <i className="menuicon fa-solid fa-bars fa-xl" data-bs-toggle="offcanvas" data-bs-target="#staticBackdrop" aria-controls="staticBackdrop"></i>
            </div>
            </span>
          </div>
          <div className="m-0 p-0">
        <div className="row my-5 mx-2">
          <h4>All Users</h4>
          
          <Table striped bordered hover responsive>
            <thead>
              <tr>
                <th>#</th>
                <th>ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Phone Number</th>
                <th>Service Id</th>
                <th>Service</th>
                <th>Service Engineer</th>
                <th>Service Action</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
           
            

              {data && data.map((e, i) => {
                return (
                  <tr key={i}>
                    <td>{i + 1}</td>
                    <td>{e._id}</td>
                    <td>{e.name}</td>
                    <td>{e.email}</td>
                    <td>{e.phonenumber}</td>
                    <td>{e.service && e.service[0] && e.service[0][0] && e.service[0][0]._id}</td>
                    <td>{e._id}</td>
                    <td style={{color:"#013cc6"}}>{e.serviceEngineer?"Assigned":"Unassigned"}</td>
                    <td style={{color:"#013cc6"}}>{e.action?"Pending":"Completed"}</td>
                    
                    <td>
                      
                  
                      <Button
                        variant="primary"
                        params={e._id}
                        onClick={() => {
                          navigate(`/admin/updateaction/${e._id}`);
                        }}
                      
                        
                      >
                        Update
                      </Button>

                    </td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        </div>
      </div>
      </div>
    </div>
  
  )
}

export default Allusers