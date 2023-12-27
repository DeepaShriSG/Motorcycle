import React, { useContext, useState, useEffect } from "react";
import { toast } from "react-toastify";
import { Formik } from 'formik';
import * as Yup from 'yup';
import { useNavigate, useParams } from "react-router-dom";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import AxiosService from "../common/ApiService";
import ErrorProvider, { ErrorContext } from "../context/ErrorProvider";
import UpdateContext,{Updatedata} from "../context/UpdateContext";
import Engineersidebar from "./Engineersidebar";

function Update() {
  const params = useParams();

  const { errorMessage, setErrorMessage } = useContext(ErrorContext);
  

  const {data, setdata} = useContext(Updatedata)

  const navigate = useNavigate();

  const statusschema = Yup.object().shape({
    userId:Yup.string().required('* Required'),
    update:Yup.boolean().required('* Required'),
    
  })
  

  const getData = async () => {
    try {
      let res = await AxiosService.get(`/engineer/getuser/${params.id}`);
      console.log(res);

      if (res.status === 200) {
        setdata({
          userId: res.data.user._id,
          update: res.data.user.status
          
        });
      } else {
        console.error("Unexpected response status:", res.status);
      }
    } catch (error) {
      toast.error("Error Occoured!");
      console.error("Error fetching data:", error);
    }
  };

  const userAction = async (values) => {
    try {
      
      const res = await AxiosService.post(`/engineer/updatestatus/${params.id}`, values)

      let updateStatus = JSON.parse(values.update) === "false" ? false : true
      console.log(updateStatus)


      if (res.status === 200) {
        
        toast.success("User action updated")
        navigate("/engineer/assignedusers");
        
      }
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        setErrorMessage(error.response.data.message);
      } else {
        setErrorMessage("An error occurred. Please try again.");
      }
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="w-100">
      <Engineersidebar />
      <div className="right-content ">
        <div className="d-block d-sm-none m-2">
          <span className="row justify-content-between align-items-center">
            <a className="sidebarlogo navbar-brand col-6 m-0" href="#">
              DS Services
            </a>
            <div className="col-6 text-end px-4">
              <i
                className="menuicon fa-solid fa-bars fa-xl"
                data-bs-toggle="offcanvas"
                data-bs-target="#staticBackdrop"
                aria-controls="staticBackdrop"
              ></i>
            </div>
          </span>
        </div>
        <div className="m-p p-0">
          <div className="row justify-content-center align-items-center m-5">
            <div className="card col-lg-6 mx-5 p-5">
              <h3 className="assign-heading text-center mb-4">
                Update User Status
              </h3>
              <div className="assign-page">
              <Formik
             initialValues={data}
             validationSchema={statusschema}
              enableReinitialize={true}
              onSubmit={(values)=>{
                userAction(values)
       }}
     >
       {({ values,errors,touched,handleSubmit,handleChange})=>(
       <Form onSubmit={handleSubmit}>
         <Form.Group className="mb-3">
             <Form.Label>User Id:</Form.Label>
             <Form.Control type="text" value = {values.userId} name='userId' placeholder="Enter userId"  onChange={handleChange}/>
             {errors.userId && touched.userId ? <div style={{color:"red"}}>{errors.userId}</div>:null}
           </Form.Group>
       
           <Form.Group className="mb-3">
              <Form.Label>Update:</Form.Label>
                  <Form.Control
                      as="select"
                      name="update"
                      value={values.update}
                      onChange={handleChange}
                    >
                   <option value="" disabled>
                               Status
                              </option>
                   <option value={false}>Completed</option>
                  <option value={true}>Pending</option> 
                  {console.log(values.update)}
                    </Form.Control>
                    {errors.update && touched.update ? <div style={{ color: "red" }}>{errors.update}</div> : null}
                  </Form.Group>

                  {errorMessage ? (
                    <div style={{ color: "red" }}>{errorMessage}</div>
                  ) : null}
      
               <div className="d-grid">
                   <Button type="submit">Submit</Button>
                        </div>
                  </Form> 
                  )}
             </Formik>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Update;

 