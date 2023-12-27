import React, { useState, useEffect, useContext, } from "react";
import { toast } from 'react-toastify'
import { Table, Button } from "react-bootstrap"; 
import AxiosService from "../common/ApiService";
import { useNavigate,useParams } from 'react-router-dom';

import Engineersidebar from "./Engineersidebar";




function AssignedUsers() { 


  
  const [data,setData] = useState([])
  const params = useParams();

 
  let navigate = useNavigate()
  

  const getData = async()=>{
  
    try {
      let res = await AxiosService.get("/engineer/assignedusers")
      console.log(res)

      if(res.status===200){
        
        setData(res.data.AssignedUsers)
        
      }
      
    }  catch (error) {
      toast.error(
        error.response.data.message ||
          "Error Occoured!"
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
    <div className="dashboard">
      <div className="left-nav m-0 p-0">
        <Engineersidebar/>
      </div>
      <div className="right-content m-0 p-0">
        <div className="row my-5 mx-2">
          <h4>Assigned Users</h4>
          
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>#</th>
                <th>ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Phone Number</th>
                <th>Service ID</th>
                <th>Status</th>
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
                    <td>{e.service[0][0]._id}</td>
                    <td style={{color:"#013cc6"}}>{e.status?"Pending":"Completed"}</td>
                    
                    
                    <td>
                      
                      <Button
                        variant="primary"
                        params={e._id}
                        onClick={() => {
                          navigate(`/engineer/service/${e._id}`)
                          
                        }}
                       
                      >
                        Service
                      </Button>
                      
                    
                     
                       &nbsp;
                       &nbsp;
                       
                       <Button
                        variant="primary"
                        params={e._id}
                        onClick={() => {
                          navigate(`/engineer/update/${e._id}`);
                          
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

export default AssignedUsers