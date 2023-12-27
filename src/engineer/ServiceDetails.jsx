import React, {  useEffect,useContext } from "react";
import ServiceContext,{serviceData} from "../context/ServiceContext";
import { toast } from 'react-toastify'
import Form from "react-bootstrap/Form";
import { Formik } from "formik";
import * as Yup from "yup";
import { useParams,useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";

import AxiosService from "../common/ApiService";
import Engineersidebar from "./Engineersidebar";

function ServiceDetails() {

  const params = useParams();

  let navigate = useNavigate()
  
  let {data, setData} = useContext(serviceData)
  

  const getData = async () => {
    try {
      let res = await AxiosService.get(`/engineer/getservice/${params.id}`);
      console.log(res)
      
  
      if (res.status === 200) {
        const serviceData = res.data.service[0][0];
        
        setData({
          id: serviceData._id,
          brand: serviceData.brand,
          model: serviceData.model,
          manufactureyear: serviceData.manufactureyear,
          servicetype: serviceData.servicetype,
        });
      } else {
        console.error("Unexpected response status:", res.status);
      }
    } catch (error) {
      toast.error(
        error.response.data.message ||
          "Error Occoured! Invalid Password"
      );
      console.error("Error fetching data:", error);
    }
  };
  

  

  useEffect(()=>{
    if(params.id)
    {
        getData()
    }
   
  },[])

 

  return (
   
    <div className="w-100">
    <div className="col-3 m-0 p-0">
        <Engineersidebar/>
     </div>
     <div className="right-content px-3 pt-3">
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
         <div className=" m-0 p-0">

           <div className="row justify-content-center align-items-center">
           <div className="card col-lg-6 col-sm-6 col-md-6 p-3 m-3">
           <h3 className="service-heading text-center mb-2">Service details</h3>
           <Form >
                <Form.Group className="mb-3">
                  <Form.Label>ID</Form.Label>
                  <Form.Control
                    type="text"
                    value={data.id}
                    name="id"
                    placeholder="Enter Id"  
                    readOnly
                  />
                  
                </Form.Group>
               
                <Form.Group className="mb-3">
                  <Form.Label>Brand</Form.Label>
                  <Form.Control
                    type="text"
                    value={data.brand}
                    name="brand"
                    placeholder="Enter brand" 
                    readOnly   
                  />
                  
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Model</Form.Label>
                  <Form.Control
                    type="text"
                    value={data.model}
                    name="model"
                    placeholder="Enter model"   
                    readOnly
                  />
                 
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Manufactureyear:</Form.Label>
                  <Form.Control
                    type="text"
                    value={data.manufactureyear}
                    name="manufactureyear"
                    placeholder="Enter manufactureyear" 
                    readOnly
                  />
                  
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Servicetype:</Form.Label>
                  <Form.Control
                    type="text"
                    value={data.servicetype}
                    name="servicetype"
                    placeholder="Enter servicetype" 
                    readOnly 
                  />
                  
                </Form.Group>
                <div className="d-flex justify-content-end">
                <Button variant="primary" onClick={() => navigate("/engineer/assignedusers")}>
                  Close
                </Button>
                </div>
               
              </Form>
          </div>
            </div>
            
           </div>
         </div>      
 
</div>

     
  );
}

export default ServiceDetails;
